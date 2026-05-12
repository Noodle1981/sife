-- Esquema inicial para SIFE (Sistema Integral Financiero Educativo)

-- Tabla de leads para captura de interesados en la demo
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  school_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' -- pending, contacted, demo_scheduled, converted
);

-- Tabla de instituciones
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  cuit TEXT,
  address TEXT,
  city TEXT,
  settings JSONB DEFAULT '{}'::jsonb
);

-- Tabla de pagos/conciliación
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  institution_id UUID REFERENCES institutions(id),
  student_id TEXT NOT NULL, -- Referencia externa o interna
  amount DECIMAL(12,2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'unconfirmed', -- unconfirmed, confirmed, failed
  verification_method TEXT, -- automatic, manual
  receipt_url TEXT
);

-- Tabla de administradores de instituciones
CREATE TABLE institution_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- Referencia a auth.users (manejado por Supabase)
  institution_id UUID REFERENCES institutions(id),
  full_name TEXT,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- admin, viewer
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) - Ejemplo básico
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leads son insertables por cualquiera (formulario)" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Leads son visibles solo por admins" ON leads FOR SELECT USING (auth.role() = 'service_role');
