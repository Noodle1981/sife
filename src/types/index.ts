export interface Lead {
  id: string;
  created_at: string;
  school_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'demo_scheduled' | 'converted';
}

export interface Institution {
  id: string;
  created_at: string;
  name: string;
  cuit: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  totalStudents: number;
  modalities: {
    name: string;
    students: number;
  }[];
  status: 'activo' | 'inactivo' | 'demo';
  settings?: any;
}

export interface Payment {
  id: string;
  created_at: string;
  institution_id: string;
  institution_name?: string;
  student_id: string;
  amount: number;
  payment_date: string;
  status: 'unconfirmed' | 'confirmed' | 'failed';
  type: 'cuota' | 'matrícula' | 'otro';
  verification_method: 'automatic' | 'manual';
}
