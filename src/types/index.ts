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
export interface BillingConcept {
  id: string;
  name: string;
  description?: string;
  amount: number;
  category: 'cuota' | 'taller' | 'material' | 'excursion' | 'viaje' | 'donacion' | 'otro';
  is_mandatory: boolean;
  target_type: 'all' | 'level' | 'course';
  target_id?: string; // ID del nivel o curso específico
}

export interface EducationalLevel {
  id: string;
  name: string; // Inicial, Primaria, etc.
  description?: string;
}

export interface Course {
  id: string;
  level_id: string;
  name: string; // 1er Año "A", etc.
  year: number;
  shift: 'mañana' | 'tarde' | 'noche' | 'jornada_completa';
  base_fee: number; // Cuota base para este curso
}

export interface SchoolUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'secretary' | 'treasurer';
  institution_id: string;
}

export interface Responsible {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  dni: string;
  relationship: 'padre' | 'madre' | 'tutor' | 'otro';
  cbu_cvu?: string;
  alias?: string;
}

export interface Student {
  id: string;
  institution_id: string;
  course_id: string;
  first_name: string;
  last_name: string;
  dni: string;
  status: 'active' | 'inactive' | 'graduated';
  responsible_id: string;
  second_responsible_id?: string;
  current_balance: number; // Saldo (negativo es deuda, positivo es crédito)
  total_credits: number; // Créditos a favor
}
