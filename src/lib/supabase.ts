import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detecta si estamos usando credenciales de prueba o si faltan las variables de entorno
const isPlaceholder = 
  !supabaseUrl || 
  !supabaseAnonKey || 
  supabaseUrl.includes('your-supabase-url') || 
  supabaseUrl.includes('placeholder-project') ||
  supabaseAnonKey.includes('your-supabase-anon-key') ||
  supabaseAnonKey.includes('placeholder-key');

// Clase para simular el constructor de consultas de Supabase de forma chainable y Thenable
class MockQueryBuilder {
  private table: string;
  private filters: Record<string, unknown> = {};
  private action: 'select' | 'insert' | 'update' = 'select';
  private dataToSave?: unknown;

  constructor(table: string) {
    this.table = table;
  }

  select() {
    this.action = 'select';
    return this;
  }

  insert(data: unknown) {
    this.action = 'insert';
    this.dataToSave = data;
    return this;
  }

  update(data: unknown) {
    this.action = 'update';
    this.dataToSave = data;
    return this;
  }

  eq(key: string, value: unknown) {
    this.filters[key] = value;
    return this;
  }

  order() {
    // Ignoramos el orden en mocks sencillos
    return this;
  }

  // Protocolo Thenable para poder usar 'await' directamente sobre la consulta
  then(
    onFulfilled?: (value: { data: unknown; error: unknown }) => unknown,
    onRejected?: (error: unknown) => unknown
  ): Promise<unknown> {
    const isClient = typeof window !== 'undefined';

    // Bypassear peticiones HTTP en el Servidor (SSR) leyendo directamente de sife-db.json
    if (!isClient) {
      const promise = Promise.all([
        import('fs'),
        import('path')
      ]).then(([fs, path]) => {
        const dbPath = path.join(process.cwd(), 'database', 'sife-db.json');
        
        let db: Record<string, Record<string, unknown>[]> = {};
        if (fs.existsSync(dbPath)) {
          db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        }
        
        let tableData = db[this.table] || [];
        if (this.action === 'select' && this.filters) {
          Object.keys(this.filters).forEach((key) => {
            tableData = tableData.filter((item: Record<string, unknown>) => String(item[key]) === String(this.filters[key]));
          });
        }
        
        return { data: tableData, error: null };
      }).catch((err) => {
        console.error('Server-side mock read error:', err);
        return { data: null, error: err };
      });

      return promise.then(onFulfilled, onRejected);
    }
    
    // URL base en el Cliente (el navegador resuelve absolutamente al host y puerto actual)
    const baseUrl = window.location.origin;
    
    const promise = fetch(`${baseUrl}/api/supabase-mock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: this.action,
        table: this.table,
        filters: this.filters,
        data: this.dataToSave
      })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(`Error executing mock query on table ${this.table}:`, err);
      return { data: null, error: err };
    });

    return promise.then(onFulfilled, onRejected);
  }
}

// Cliente Mock que emula la API pública de SupabaseClient
class MockSupabaseClient {
  auth = {
    signInWithPassword: async ({ email }: { email: string; password?: string }) => {
      const isClient = typeof window !== 'undefined';
      if (isClient) {
        // Guardamos cookies de sesión para el middleware
        document.cookie = 'sb-mock-token=true; path=/; max-age=86400';
        localStorage.setItem('sb-mock-user', JSON.stringify({ email }));
      }
      return { data: { user: { email } }, error: null };
    },
    signOut: async () => {
      const isClient = typeof window !== 'undefined';
      if (isClient) {
        // Borramos cookies y localStorage
        document.cookie = 'sb-mock-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        localStorage.removeItem('sb-mock-user');
      }
      return { error: null };
    },
    getUser: async () => {
      const isClient = typeof window !== 'undefined';
      if (isClient) {
        const user = localStorage.getItem('sb-mock-user');
        if (user) {
          return { data: { user: JSON.parse(user) }, error: null };
        }
      }
      return { data: { user: null }, error: null };
    }
  };

  from(table: string) {
    return new MockQueryBuilder(table);
  }
}

// Si es placeholder exportamos nuestro cliente mock, de lo contrario usamos Supabase real
export const supabase = isPlaceholder 
  ? (new MockSupabaseClient() as unknown as ReturnType<typeof createClient>) 
  : createClient(supabaseUrl, supabaseAnonKey);
