"use client";

import { useState, useEffect } from "react";
import { 
  Clock,
  CheckCircle2,
  Table as TableIcon,
  Building2,
  Users,
  Wallet,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";
import { Lead } from "@/types";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Datos financieros simulados para las tarjetas
  const stats = {
    totalRevenue: 374925, // Comisión total SIFE (1%)
    activeInstitutions: 3,
    totalStudents: 1315,
    pendingLeads: 3
  };

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setLeads(data || []);
      } catch (err) {
        setLeads([
          {
            id: "1",
            created_at: new Date().toISOString(),
            school_name: "Colegio San Martín",
            contact_name: "Juan Pérez",
            email: "juan@sanmartin.edu.ar",
            status: "pending"
          },
          {
            id: "2",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            school_name: "Instituto Belgrano",
            contact_name: "Ana García",
            email: "admin@belgrano.edu.ar",
            status: "contacted"
          },
          {
            id: "3",
            created_at: new Date(Date.now() - 172800000).toISOString(),
            school_name: "Escuela Sarmiento",
            contact_name: "Roberto Gómez",
            email: "roberto@sarmiento.edu.ar",
            status: "demo_scheduled"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h1 className={styles.title}>Resumen Ejecutivo</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Bienvenido al centro de control de SIFE.</p>
        </div>
        <div className={styles.badge} style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} />
          Sistema Operativo
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ borderTop: '4px solid #286DE1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div className={styles.statLabel}>Ganancia Total (SIFE 1%)</div>
            <div style={{ background: '#ecfdf5', color: '#10b981', padding: '0.25rem', borderRadius: '4px' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div className={styles.statValue}>${stats.totalRevenue.toLocaleString('es-AR')}</div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginTop: '0.25rem' }}>
            <ArrowUpRight size={14} style={{ display: 'inline', marginRight: '2px' }} />
            +12.5% este mes
          </div>
        </div>

        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div className={styles.statLabel}>Instituciones Activas</div>
            <Building2 size={20} color="#94a3b8" />
          </div>
          <div className={styles.statValue}>{stats.activeInstitutions} / 5</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            2 instituciones en modo Demo
          </div>
        </div>

        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div className={styles.statLabel}>Total Alumnos SIFE</div>
            <Users size={20} color="#94a3b8" />
          </div>
          <div className={styles.statValue}>{stats.totalStudents.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            Matrícula total gestionada
          </div>
        </div>

        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div className={styles.statLabel}>Leads Pendientes</div>
            <MessageSquare size={20} color="#f59e0b" />
          </div>
          <div className={styles.statValue} style={{ color: '#b45309' }}>{stats.pendingLeads}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            Esperando contacto comercial
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Recent Leads Section */}
        <section className={styles.sectionCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
              <TableIcon size={20} />
              Últimas Solicitudes
            </h2>
            <button style={{ color: '#286DE1', background: 'none', border: 'none', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
              Ver todas
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Institución</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td style={{ fontSize: '0.815rem' }}>
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{lead.school_name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.contact_name}</div>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${lead.status === 'pending' ? styles.badgePending : styles.badgeContacted}`} style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                          {lead.status === 'pending' ? 'Pendiente' : 'Contactado'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions / Integration Status */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={20} />
            Metas del Mes
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span>Recaudación Meta</span>
                <span style={{ fontWeight: 700 }}>75%</span>
              </div>
              <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '75%', background: '#286DE1' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span>Conversión de Leads</span>
                <span style={{ fontWeight: 700 }}>40%</span>
              </div>
              <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '40%', background: '#f59e0b' }}></div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '0.815rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Próximos Pasos</div>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Llamar a Colegio Santa Fe (Inactivo)</li>
                <li>Activar pasarela para Inst. Tecnológico</li>
                <li>Enviar reporte a San Martín</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
