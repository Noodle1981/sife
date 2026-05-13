"use client";

import { useState } from "react";
import { 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Calendar,
  MoreVertical,
  Banknote,
  FileText
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";

export default function SchoolFinancesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'debt'>('overview');

  // Mock stats
  const stats = [
    { title: "Recaudación Mes", value: "$2.450.000", change: "+12.5%", icon: TrendingUp, color: "#10b981" },
    { title: "Morosidad Actual", value: "14.2%", change: "+2.1%", icon: AlertCircle, color: "#ef4444" },
    { title: "Pendiente Conciliar", value: "$185.000", change: "8 pagos", icon: Clock, color: "#f59e0b" },
    { title: "Créditos Familiares", value: "$45.600", change: "Saldo a favor", icon: Wallet, color: "#6366f1" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión Financiera Institucional</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Control de recaudación, morosidad y conciliación bancaria automática.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary">
            <FileText size={18} />
            Exportar Reporte
          </button>
          <button className="btn-primary">
            <Banknote size={18} />
            Registrar Cobro Manual
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={styles.statsGrid} style={{ marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statTitle}>{stat.title}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statChange} style={{ color: stat.color }}>
                {stat.change}
              </span>
            </div>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon size={24} color={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeTab === 'overview' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'overview' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          Vista General
        </button>
        <button 
          onClick={() => setActiveTab('payments')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeTab === 'payments' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'payments' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          Pagos y Conciliación
        </button>
        <button 
          onClick={() => setActiveTab('debt')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeTab === 'debt' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'debt' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          Monitor de Morosidad
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Recent Activity */}
          <div className={styles.sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Últimos Movimientos</h3>
              <button style={{ color: '#286DE1', fontSize: '0.815rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todos
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: "Familia Olivera", desc: "Cuota Junio - 1° Grado A", amount: "$65.000", type: 'in', date: "Hoy, 10:45", method: "Transferencia (Conciliado)" },
                { name: "Familia García", desc: "Taller Ajedrez", amount: "$8.000", type: 'in', date: "Hoy, 09:12", method: "Mercado Pago (Auto)" },
                { name: "Familia Rodríguez", desc: "Reserva Viaje de Estudios", amount: "$150.000", type: 'pending', date: "Ayer", method: "Transferencia (Pendiente)" },
                { name: "Ventanilla", desc: "Cobro Efectivo - Varios", amount: "$45.000", type: 'in', date: "Ayer", method: "Efectivo" },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ 
                    padding: '0.5rem', borderRadius: '10px', 
                    backgroundColor: item.type === 'in' ? '#f0fdf4' : '#fffbeb'
                  }}>
                    {item.type === 'in' ? <ArrowUpRight size={20} color="#10b981" /> : <Clock size={20} color="#f59e0b" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc} • <span style={{ fontWeight: 600 }}>{item.method}</span></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: item.type === 'in' ? '#1e293b' : '#f59e0b' }}>{item.amount}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projection / Quick Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.sectionCard} style={{ backgroundColor: '#286DE1', color: 'white' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Proyección Cierre</h3>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>$3.120.000</div>
              <p style={{ fontSize: '0.815rem', opacity: 0.9, lineHeight: 1.5 }}>
                Estimado basado en cuotas asignadas y tendencia de pago histórica del 85%.
              </p>
              <div style={{ marginTop: '1.5rem', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                <div style={{ width: '78%', height: '100%', backgroundColor: 'white', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                <span>78% Recaudado</span>
                <span>Objetivo: $4.0M</span>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: '#64748b', textTransform: 'uppercase' }}>Medios de Pago</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Transferencias</div>
                  <div style={{ fontSize: '0.875rem', color: '#1e293b', fontWeight: 700 }}>65%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Mercado Pago</div>
                  <div style={{ fontSize: '0.875rem', color: '#1e293b', fontWeight: 700 }}>20%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Efectivo</div>
                  <div style={{ fontSize: '0.875rem', color: '#1e293b', fontWeight: 700 }}>15%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
