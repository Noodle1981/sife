"use client";

import { 
  Users, 
  GraduationCap, 
  Layers, 
  AlertCircle,
  TrendingUp,
  CreditCard,
  Calendar
} from "lucide-react";
import styles from "../admin/dashboard/dashboard.module.css";

export default function SchoolDashboard() {
  const stats = [
    { label: "Total Alumnos", value: "450", icon: Users, color: "#0ea5e9" },
    { label: "Cursos Activos", value: "18", icon: GraduationCap, color: "#10b981" },
    { label: "Niveles", value: "3", icon: Layers, color: "#8b5cf6" },
    { label: "Recaudación Mes", value: "$4.2M", icon: TrendingUp, color: "#f59e0b" },
  ];

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Institucional</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <Calendar size={18} color="#64748b" />
          <span style={{ fontWeight: 600, color: '#1e293b' }}>Mayo 2026</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={styles.statCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: `${stat.color}10`, padding: '0.75rem', borderRadius: '12px' }}>
                  <Icon size={24} color={stat.color} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, backgroundColor: '#10b98110', padding: '0.25rem 0.5rem', borderRadius: '999px' }}>
                  +2.5%
                </span>
              </div>
              <span className={styles.statLabel} style={{ marginTop: '1rem' }}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Próximos Vencimientos */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            <CreditCard size={20} color="#286DE1" />
            Resumen de Cobranza
          </h2>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifySelf: 'center', color: 'var(--text-muted)' }}>
            [Gráfico de Cobranza - Próximamente]
          </div>
        </section>

        {/* Alertas de Configuración */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            <AlertCircle size={20} color="#ef4444" />
            Configuración Pendiente
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', fontSize: '0.875rem' }}>
              <p style={{ fontWeight: 600, color: '#991b1b', marginBottom: '0.25rem' }}>Cursos sin cuota base</p>
              <p style={{ color: '#b91c1c' }}>3 cursos de Secundaria no tienen asignada una cuota para el ciclo 2026.</p>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', fontSize: '0.875rem' }}>
              <p style={{ fontWeight: 600, color: '#92400e', marginBottom: '0.25rem' }}>Alumnos sin tutor</p>
              <p style={{ color: '#b45309' }}>Hay 12 alumnos importados que no tienen un responsable económico asignado.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
