'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useParentData } from '../useParentData';
import styles from '../../admin/dashboard/dashboard.module.css';

export default function DashboardPage() {
  const { payments, loading } = useParentData();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #286DE1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cargando datos familiares SIFE...</span>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Cálculos financieros
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const totalDebt = pendingPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Resumen General Familiar</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Consolidado financiero y notificaciones de aranceles escolares de su cuenta.
          </p>
        </div>
      </header>

      {/* Grid de Estadísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {/* Tarjeta 1: Total Pendiente */}
        <div style={{ 
          backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', 
          border: '1px solid var(--border)', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Pendiente
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.02em', margin: '0.125rem 0' }}>
              ${totalDebt.toLocaleString('es-AR')}
            </span>
            <span style={{ 
              fontSize: '0.6875rem', fontWeight: 700, 
              color: totalDebt > 0 ? "#ef4444" : "#10b981",
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
            }}>
              {totalDebt > 0 ? 'Con Aranceles' : 'Al Día'}
            </span>
          </div>
          <div style={{ 
            backgroundColor: totalDebt > 0 ? '#ef444415' : '#10b98115', 
            padding: '0.75rem', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <AlertTriangle size={24} color={totalDebt > 0 ? "#ef4444" : "#10b981"} />
          </div>
        </div>

        {/* Tarjeta 2: Vencimiento Próximo */}
        <div style={{ 
          backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', 
          border: '1px solid var(--border)', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Próximo Vencimiento
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.02em', margin: '0.125rem 0' }}>
              {totalDebt > 0 ? '10 de Mayo' : 'Al Día'}
            </span>
            <span style={{ 
              fontSize: '0.6875rem', fontWeight: 700, 
              color: totalDebt > 0 ? "#2563eb" : "#64748b",
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
            }}>
              {totalDebt > 0 ? 'Próxima fecha' : 'Cuenta en Orden'}
            </span>
          </div>
          <div style={{ 
            backgroundColor: totalDebt > 0 ? '#2563eb15' : '#64748b15', 
            padding: '0.75rem', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Calendar size={24} color={totalDebt > 0 ? "#2563eb" : "#64748b"} />
          </div>
        </div>

        {/* Tarjeta 3: Estado de Cuenta */}
        <div style={{ 
          backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', 
          border: '1px solid var(--border)', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Auditoría SIFE
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.02em', margin: '0.125rem 0' }}>
              {totalDebt > 0 ? 'Pendiente' : 'Saneada'}
            </span>
            <span style={{ 
              fontSize: '0.6875rem', fontWeight: 700, 
              color: '#10b981',
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
            }}>
              Tomás y Matías
            </span>
          </div>
          <div style={{ 
            backgroundColor: '#10b98115', 
            padding: '0.75rem', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <ShieldCheck size={24} color="#10b981" />
          </div>
        </div>
      </div>

      {/* Alerta de Aumento de Precios en Argentina */}
      <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '1rem', padding: '1.25rem', display: 'flex', gap: '1rem', color: '#92400e' }}>
        <div style={{ marginTop: '0.125rem', flexShrink: 0 }}>
          <AlertTriangle size={24} color="#d97706" />
        </div>
        <div>
          <h4 style={{ fontWeight: 750, color: '#78350f', lineHeight: 1.25, marginBottom: '0.375rem', fontSize: '0.875rem' }}>Notificación de Readecuación Tarifaria Escolar</h4>
          <p style={{ fontSize: '0.75rem', color: '#92400e', lineHeight: 1.5 }}>
            El Ministerio de Educación autorizó una <strong>readecuación arancelaria del 10%</strong> aplicable a partir de <strong>Mayo 2026</strong>. 
            Dado que las cuotas mensuales de Tomás y Matías ya habían sido pagadas al valor anterior, este mes se factura <strong>únicamente la diferencia retroactiva del 10%</strong> para ellos. Para Sofía (Secundaria), cuyo arancel de Mayo no estaba abonado, se factura la cuota más el retroactivo de forma unificada. Las cuotas de Junio en adelante reflejarán el arancel actualizado de forma nativa.
          </p>
        </div>
      </div>

      {/* Acción de Acceso Rápido a Pagos */}
      {totalDebt > 0 && (
        <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--foreground)' }}>Tienes aranceles pendientes de pago</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Puedes saldarlos ahora mismo por Transferencia, Mercado Pago o Ventanilla.</p>
          </div>
          <Link href="/parent/payment" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.75rem 1.25rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>
              Ir a Pagos y Cuotas
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
