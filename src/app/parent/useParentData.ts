'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  course_id: string;
  course_name: string;
  status: string;
  responsible_id?: string;
}

export interface Payment {
  id: string;
  student_id: string;
  concept_name: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'pending' | 'upcoming';
  category: 'inscripcion' | 'cuota' | 'retroactivo' | 'taller';
  created_at: string;
}

const fallbackStudents: Student[] = [
  {
    id: "stud_tomas",
    first_name: "Tomás",
    last_name: "Ortega",
    dni: "54.123.456",
    course_id: "course_inicial",
    course_name: "Sala de 5 - Inicial",
    responsible_id: "resp_carlos",
    status: "active"
  },
  {
    id: "stud_matias",
    first_name: "Matías",
    last_name: "Ortega",
    dni: "48.789.012",
    course_id: "course_primaria",
    course_name: "1° Grado 'A' - Primaria",
    responsible_id: "resp_carlos",
    status: "active"
  },
  {
    id: "stud_sofia",
    first_name: "Sofía",
    last_name: "Ortega",
    dni: "43.456.789",
    course_id: "course_secundaria",
    course_name: "1° Año - Secundaria",
    responsible_id: "resp_carlos",
    status: "active"
  }
];

const fallbackPayments: Payment[] = [
  {
    id: "pay_tomas_insc",
    student_id: "stud_tomas",
    concept_name: "Inscripción Ciclo Lectivo 2026",
    amount: 20000,
    due_date: "2026-03-05T23:59:59Z",
    status: "paid",
    category: "inscripcion",
    created_at: "2026-02-15T08:00:00Z"
  },
  {
    id: "pay_tomas_mar",
    student_id: "stud_tomas",
    concept_name: "Cuota Escolar Marzo 2026",
    amount: 45000,
    due_date: "2026-03-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: "pay_tomas_abr",
    student_id: "stud_tomas",
    concept_name: "Cuota Escolar Abril 2026",
    amount: 45000,
    due_date: "2026-04-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-04-01T08:00:00Z"
  },
  {
    id: "pay_tomas_may",
    student_id: "stud_tomas",
    concept_name: "Cuota Escolar Mayo 2026",
    amount: 45000,
    due_date: "2026-05-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-05-01T08:00:00Z"
  },
  {
    id: "pay_tomas_may_retro",
    student_id: "stud_tomas",
    concept_name: "Ajuste Retroactivo Mayo (Aumento 10% Autorizado)",
    amount: 4500,
    due_date: "2026-05-25T23:59:59Z",
    status: "pending",
    category: "retroactivo",
    created_at: "2026-05-15T08:00:00Z"
  },
  {
    id: "pay_tomas_jun",
    student_id: "stud_tomas",
    concept_name: "Cuota Escolar Junio 2026 (Valor Actualizado)",
    amount: 49500,
    due_date: "2026-06-10T23:59:59Z",
    status: "upcoming",
    category: "cuota",
    created_at: "2026-06-01T08:00:00Z"
  },
  {
    id: "pay_matias_insc",
    student_id: "stud_matias",
    concept_name: "Inscripción Ciclo Lectivo 2026",
    amount: 25000,
    due_date: "2026-03-05T23:59:59Z",
    status: "paid",
    category: "inscripcion",
    created_at: "2026-02-15T08:00:00Z"
  },
  {
    id: "pay_matias_mar",
    student_id: "stud_matias",
    concept_name: "Cuota Escolar Marzo 2026",
    amount: 65000,
    due_date: "2026-03-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: "pay_matias_abr",
    student_id: "stud_matias",
    concept_name: "Cuota Escolar Abril 2026",
    amount: 65000,
    due_date: "2026-04-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-04-01T08:00:00Z"
  },
  {
    id: "pay_matias_may",
    student_id: "stud_matias",
    concept_name: "Cuota Escolar Mayo 2026",
    amount: 65000,
    due_date: "2026-05-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-05-01T08:00:00Z"
  },
  {
    id: "pay_matias_may_retro",
    student_id: "stud_matias",
    concept_name: "Ajuste Retroactivo Mayo (Aumento 10% Autorizado)",
    amount: 6500,
    due_date: "2026-05-25T23:59:59Z",
    status: "pending",
    category: "retroactivo",
    created_at: "2026-05-15T08:00:00Z"
  },
  {
    id: "pay_matias_jun",
    student_id: "stud_matias",
    concept_name: "Cuota Escolar Junio 2026 (Valor Actualizado)",
    amount: 71500,
    due_date: "2026-06-10T23:59:59Z",
    status: "upcoming",
    category: "cuota",
    created_at: "2026-06-01T08:00:00Z"
  },
  {
    id: "pay_sofia_insc",
    student_id: "stud_sofia",
    concept_name: "Inscripción Ciclo Lectivo 2026",
    amount: 30000,
    due_date: "2026-03-05T23:59:59Z",
    status: "paid",
    category: "inscripcion",
    created_at: "2026-02-15T08:00:00Z"
  },
  {
    id: "pay_sofia_mar",
    student_id: "stud_sofia",
    concept_name: "Cuota Escolar Marzo 2026",
    amount: 85000,
    due_date: "2026-03-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: "pay_sofia_abr",
    student_id: "stud_sofia",
    concept_name: "Cuota Escolar Abril 2026",
    amount: 85000,
    due_date: "2026-04-10T23:59:59Z",
    status: "paid",
    category: "cuota",
    created_at: "2026-04-01T08:00:00Z"
  },
  {
    id: "pay_sofia_may",
    student_id: "stud_sofia",
    concept_name: "Cuota Escolar Mayo 2026 (Valor Base)",
    amount: 85000,
    due_date: "2026-05-10T23:59:59Z",
    status: "pending",
    category: "cuota",
    created_at: "2026-05-01T08:00:00Z"
  },
  {
    id: "pay_sofia_may_retro",
    student_id: "stud_sofia",
    concept_name: "Ajuste Retroactivo Mayo (Aumento 10% Autorizado)",
    amount: 8500,
    due_date: "2026-05-25T23:59:59Z",
    status: "pending",
    category: "retroactivo",
    created_at: "2026-05-15T08:00:00Z"
  },
  {
    id: "pay_sofia_jun",
    student_id: "stud_sofia",
    concept_name: "Cuota Escolar Junio 2026 (Valor Actualizado)",
    amount: 93500,
    due_date: "2026-06-10T23:59:59Z",
    status: "upcoming",
    category: "cuota",
    created_at: "2026-06-01T08:00:00Z"
  }
];

export function useParentData() {
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // 1. Obtener los alumnos asociados al responsable económico Carlos Ortega (resp_carlos)
      const { data: studentsData, error: sErr } = await supabase
        .from('students')
        .select('*')
        .eq('responsible_id', 'resp_carlos');

      if (sErr) throw sErr;
      setStudents(studentsData || []);

      // 2. Obtener todos los pagos correspondientes
      const { data: paymentsData, error: pErr } = await supabase
        .from('payments')
        .select('*');

      if (pErr) throw pErr;
      setPayments(paymentsData || []);
    } catch (error: unknown) {
      const err = error as { message?: string; stack?: string };
      console.warn('Network offline or mock disabled. Smoothly switching to offline fallback mode:', err.message || err);
      setStudents(fallbackStudents);
      setPayments(fallbackPayments);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      setLoading(true);
      // Imputar pago en Supabase Mock / disco JSON
      const { error } = await supabase
        .from('payments')
        .update({ status: 'paid' })
        .eq('id', paymentId);
      
      if (error) throw error;
      
      // Re-fetch para sincronizar con disco
      await fetchData();
    } catch (err) {
      console.error("Error updating payment status:", err);
      // Fallback local en memoria
      setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: 'paid' as const } : p));
      setLoading(false);
    }
  };

  return {
    students,
    payments,
    loading,
    refetch: fetchData,
    handlePaymentSuccess
  };
}
