import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database', 'sife-db.json');

// Función auxiliar para leer la base de datos local
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return {};
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local mock database:', error);
    return {};
  }
}

// Función auxiliar para escribir en la base de datos local
function writeDb(data: Record<string, unknown[]>) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to local mock database:', error);
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table');
  const filterKey = searchParams.get('filterKey');
  const filterValue = searchParams.get('filterValue');

  if (!table) {
    return NextResponse.json({ error: 'Table parameter is required' }, { status: 400 });
  }

  const db = readDb();
  let tableData = db[table] || [];

  // Aplicar filtros simples si vienen especificados
  if (filterKey && filterValue) {
    tableData = tableData.filter((item: Record<string, unknown>) => String(item[filterKey]) === String(filterValue));
  }

  return NextResponse.json({ data: tableData, error: null });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, table, filters, data } = body;

    if (!table) {
      return NextResponse.json({ error: 'Table is required' }, { status: 400 });
    }

    const db = readDb();
    if (!db[table]) {
      db[table] = [];
    }

    let resultData: unknown = null;

    if (action === 'select') {
      let filtered = db[table];
      if (filters) {
        Object.keys(filters).forEach((key) => {
          filtered = filtered.filter((item: Record<string, unknown>) => String(item[key]) === String(filters[key]));
        });
      }
      resultData = filtered;
    } 
    
    else if (action === 'insert') {
      const recordsToInsert = Array.isArray(data) ? data : [data];
      const newRecords = recordsToInsert.map((rec: Record<string, unknown>) => ({
        id: rec.id || `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        ...rec
      }));

      db[table].push(...newRecords);
      writeDb(db);
      resultData = Array.isArray(data) ? newRecords : newRecords[0];
    } 
    
    else if (action === 'update') {
      if (!filters) {
        return NextResponse.json({ error: 'Filters are required for update action' }, { status: 400 });
      }

      let updatedCount = 0;
      db[table] = db[table].map((item: Record<string, unknown>) => {
        let match = true;
        Object.keys(filters).forEach((key) => {
          if (String(item[key]) !== String(filters[key])) {
            match = false;
          }
        });

        if (match) {
          updatedCount++;
          return { ...item, ...data, updated_at: new Date().toISOString() };
        }
        return item;
      });

      writeDb(db);
      resultData = { updatedCount };
    }

    return NextResponse.json({ data: resultData, error: null });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Error in supabase-mock API:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
