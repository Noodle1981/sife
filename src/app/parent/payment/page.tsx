'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Copy,
  Check
} from 'lucide-react';
import { useParentData } from '../useParentData';
import PaymentModal from '@/components/payment-modal';
import styles from '../../admin/dashboard/dashboard.module.css';

export default function PaymentPage() {
  const { students, payments, loading, handlePaymentSuccess } = useParentData();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  
  // Estados para el Modal de Pago
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    id: string;
    concept_name: string;
    amount: number;
    student_name: string;
  } | null>(null);

  // Estado para alertas de copia
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Seleccionar primer hijo por defecto
  useEffect(() => {
    if (students.length > 0 && !selectedStudentId) {
      setSelectedStudentId(students[0].id);
    }
  }, [students, selectedStudentId]);

  if (loading && students.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #286DE1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cargando módulo de aranceles...</span>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const activeStudent = students.find(s => s.id === selectedStudentId);
  const activeStudentPayments = payments.filter(p => p.student_id === selectedStudentId);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'inscripcion': return 'Matrícula';
      case 'cuota': return 'Arancel Mensual';
      case 'retroactivo': return 'Retroactivo';
      default: return 'Otros';
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Gestión de Pagos y Cuotas</h2>
          <p className={styles.subtitle}>Consulta y liquida aranceles escolares, matrículas y ajustes de tu familia.</p>
        </div>
      </div>

      {/* Sección Selector de Hijos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Estado por Hijo</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Selecciona un estudiante</span>
        </div>

        {/* Botones de Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', paddingBottom: '0.25rem', overflowX: 'auto' }}>
          {students.map((student) => {
            const isSelected = student.id === selectedStudentId;
            const studentPending = pendingPayments.filter(p => p.student_id === student.id);
            const isInicial = student.course_name.includes('Inicial');
            const isPrimaria = student.course_name.includes('Primaria');

            return (
              <button
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                style={{ 
                  padding: '0.875rem 1.5rem', 
                  borderRadius: '1rem', 
                  border: isSelected ? '1px solid #286DE1' : '1px solid var(--border)', 
                  backgroundColor: isSelected ? '#eff6ff' : 'white',
                  textAlign: 'left',
                  flexShrink: 0,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 6px -1px rgba(40, 109, 225, 0.1)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '0.875rem' }}>{student.first_name} {student.last_name}</p>
                    <span style={{ 
                      display: 'inline-block', fontSize: '0.5625rem', padding: '0.125rem 0.375rem', borderRadius: '0.375rem', fontWeight: 700, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                      backgroundColor: isInicial ? '#fff7ed' : isPrimaria ? '#eff6ff' : '#eef2ff',
                      color: isInicial ? '#c2410c' : isPrimaria ? '#1d4ed8' : '#4338ca'
                    }}>
                      {student.course_name.split(' - ')[1]}
                    </span>
                  </div>
                  {studentPending.length > 0 && (
                    <span style={{ backgroundColor: '#ef4444', color: 'white', fontWeight: 900, fontSize: '0.5625rem', height: '1.25rem', width: '1.25rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '-0.375rem', right: '-0.375rem', animation: 'pulse 2s infinite' }}>
                      {studentPending.length}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Desglose Financiero del Alumno Activo */}
        {activeStudent && (
          <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
            {/* Header del Alumno */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', backgroundColor: 'var(--background)' }}>
              <div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Cobros del Alumno</span>
                <h4 style={{ fontWeight: 800, color: 'var(--foreground)', fontSize: '1rem' }}>{activeStudent.first_name} {activeStudent.last_name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>Curso: {activeStudent.course_name} | DNI: {activeStudent.dni}</p>
              </div>

              {/* Botón rápido si debe arancel completo */}
              {activeStudentPayments.some(p => p.status === 'pending') && (
                <span style={{ fontSize: '0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <AlertTriangle size={16} />
                  Tiene cuotas pendientes
                </span>
              )}
            </div>

            {/* Tabla de Aranceles */}
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Categoría</th>
                    <th>Vencimiento</th>
                    <th style={{ textAlign: 'right' }}>Importe</th>
                    <th style={{ textAlign: 'center' }}>Estado</th>
                    <th style={{ textAlign: 'center' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {activeStudentPayments.map((payment) => {
                    const isOverdue = new Date(payment.due_date).getTime() < Date.now() && payment.status === 'pending';
                    
                    return (
                      <tr key={payment.id}>
                        <td style={{ fontWeight: 700 }}>{payment.concept_name}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{getCategoryLabel(payment.category)}</td>
                        <td style={{ color: 'var(--text-muted)' }}>
                          {new Date(payment.due_date).toLocaleDateString('es-AR')}
                        </td>
                        <td style={{ fontWeight: 900, textAlign: 'right' }}>${payment.amount.toLocaleString('es-AR')}</td>
                        <td style={{ textAlign: 'center' }}>
                          {payment.status === 'paid' && <span className={styles.badgeActive}><CheckCircle2 size={12} /> Pagado</span>}
                          {payment.status === 'pending' && <span className={isOverdue ? styles.badgeInactive : styles.badgePending}><Clock size={12} /> {isOverdue ? 'Vencido' : 'Pendiente'}</span>}
                          {payment.status === 'upcoming' && <span className={styles.badgeDemo}>Planificado</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {payment.status === 'pending' ? (
                            <button
                              onClick={() => {
                                setSelectedPayment({
                                  id: payment.id,
                                  concept_name: payment.concept_name,
                                  amount: payment.amount,
                                  student_name: activeStudent.first_name
                                });
                                setIsPaymentModalOpen(true);
                              }}
                              style={{ padding: '0.375rem 0.75rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', fontSize: '0.625rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                              Pagar <ArrowRight size={12} />
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700 }}>-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Módulo de Medios de Pago e Instrucciones */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Panel Izquierdo: Cuentas Escolares */}
        <div className={styles.sectionCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Canales de Pago Autorizados</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Puedes pagar mediante transferencia directa usando los datos oficiales de abajo. Nuestro robot de conciliación SIFE asociará tu CBU de origen de forma pasiva y automática.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <div>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Banco Escolar</span>
                <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>Banco de la Nación Argentina</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <div>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>CBU Principal</span>
                <code style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--foreground)' }}>0000003100012345678901</code>
              </div>
              <button onClick={() => handleCopy('0000003100012345678901', 'cbu')} style={{ padding: '0.375rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {copiedField === 'cbu' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <div>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Alias Principal CBU</span>
                <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>colegio.sife.pagos</span>
              </div>
              <button onClick={() => handleCopy('colegio.sife.pagos', 'alias')} style={{ padding: '0.375rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {copiedField === 'alias' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <div>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>CVU (Mercado Pago Escolar)</span>
                <code style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--foreground)' }}>0000003100098765432109</code>
              </div>
              <button onClick={() => handleCopy('0000003100098765432109', 'cvu')} style={{ padding: '0.375rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {copiedField === 'cvu' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Cómo funciona SIFE */}
        <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '0.5625rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: '#60a5fa', backgroundColor: 'rgba(30, 58, 138, 0.4)', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #1e3a8a', alignSelf: 'flex-start' }}>
              Tecnología SIFE
            </span>
            <h3 style={{ fontWeight: 800, fontSize: '1.125rem' }}>¿Cómo funciona nuestra conciliación automática?</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: 700 }}>1.</span>
                <p>Transferes desde tu homebanking o billetera digital al CBU/Alias asignado.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: 700 }}>2.</span>
                <p>El bot SIFE escanea los movimientos de cuenta corriente del colegio cada 5 minutos por API.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: 700 }}>3.</span>
                <p>Al identificar el importe y DNI, imputa la cuota al instante, te envía el recibo oficial por mail y te marca como al día.</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <ShieldCheck size={20} />
            </div>
            <div style={{ fontSize: '0.6875rem', lineHeight: 1.25 }}>
              <p style={{ fontWeight: 700, color: 'white' }}>Transacciones 100% Auditadas</p>
              <p style={{ color: '#94a3b8', marginTop: '0.125rem' }}>Respaldado por el sistema de seguridad bancario COELSA.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pago SIFE */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payment={selectedPayment}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}} />
    </div>
  );
}
