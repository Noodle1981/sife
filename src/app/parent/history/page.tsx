'use client';

import React from 'react';
import { 
  FileText
} from 'lucide-react';
import { useParentData } from '../useParentData';
import styles from '../../admin/dashboard/dashboard.module.css';

export default function HistoryPage() {
  const { students, payments, loading } = useParentData();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #286DE1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cargando historial de recibos...</span>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const paidPayments = payments.filter(p => p.status === 'paid');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className={styles.header}>
         <div>
          <h2 className={styles.title}>Historial General de Recibos</h2>
          <p className={styles.subtitle}>Listado histórico de comprobantes y recibos oficiales liquidados en este ciclo.</p>
        </div>
      </div>

      {/* Historial General de Pagos Realizados */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {paidPayments.length > 0 ? (
          <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Fecha de Pago</th>
                    <th>Hijo / Alumno</th>
                    <th>Detalle de Cuota</th>
                    <th style={{ textAlign: 'right' }}>Importe Cobrado</th>
                    <th style={{ textAlign: 'center' }}>Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {paidPayments.map((payment) => {
                    const student = students.find(s => s.id === payment.student_id);
                    return (
                      <tr key={payment.id}>
                        <td style={{ color: 'var(--text-muted)' }}>
                          {new Date(payment.due_date).toLocaleDateString('es-AR')}
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--foreground)' }}>
                          {student ? `${student.first_name} ${student.last_name}` : 'Alumno SIFE'}
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{payment.concept_name}</td>
                        <td style={{ fontWeight: 900, color: 'var(--foreground)', textAlign: 'right' }}>${payment.amount.toLocaleString('es-AR')}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => alert(`Descargando Recibo Oficial SIFE para: ${payment.concept_name}`)}
                            style={{ padding: '0.375rem 0.75rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '0.375rem', fontSize: '0.625rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                          >
                            <FileText size={12} /> PDF Recibo
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={styles.sectionCard} style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No se registran recibos abonados en este ciclo.
          </div>
        )}
      </div>
    </div>
  );
}
