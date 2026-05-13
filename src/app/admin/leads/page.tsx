"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard/dashboard.module.css";
import { Lead } from "@/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setLeads(data || []);
      } catch (err) {
        console.warn("Using mock data for leads page");
        setLeads([
          {
            id: "1",
            created_at: new Date().toISOString(),
            school_name: "Colegio San Martín",
            contact_name: "Juan Pérez",
            email: "juan@sanmartin.edu.ar",
            phone: "264-4211111",
            status: "pending",
            message: "Interesados en automatizar primaria."
          },
          {
            id: "2",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            school_name: "Instituto Belgrano",
            contact_name: "Ana García",
            email: "admin@belgrano.edu.ar",
            phone: "261-4552222",
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

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className={`${styles.badge} ${styles.badgePending}`}>
            <Clock size={12} />
            Pendiente
          </span>
        );
      case 'contacted':
        return (
          <span className={`${styles.badge} ${styles.badgeContacted}`}>
            <CheckCircle2 size={12} />
            Contactado
          </span>
        );
      case 'demo_scheduled':
        return (
          <span className={`${styles.badge} ${styles.badgeScheduled}`}>
            <Calendar size={12} />
            Demo Agendada
          </span>
        );
      case 'converted':
        return (
          <span className={`${styles.badge} ${styles.badgeConverted}`}>
            <CheckCircle2 size={12} />
            Convertido
          </span>
        );
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Solicitudes de Demo (Leads)</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary">
            Descargar CSV
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className={styles.sectionCard} style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <Search className={styles.inputIcon} size={18} />
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Buscar por escuela, contacto o email..." 
            />
          </div>
          <button className="btn-secondary" style={{ padding: '0.75rem 1rem' }}>
            <Filter size={18} />
            Filtrar por Estado
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <section className={styles.sectionCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Institución / Contacto</th>
                <th>Comunicación</th>
                <th>Mensaje</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Cargando solicitudes...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay solicitudes pendientes.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString('es-AR') : 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {lead.created_at ? new Date(lead.created_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--foreground)' }}>{lead.school_name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={14} />
                        {lead.contact_name}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                          <Mail size={14} color="#94a3b8" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <Phone size={14} color="#94a3b8" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      {lead.message ? (
                        <div style={{ 
                          maxWidth: '200px', 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          fontSize: '0.875rem',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }} title={lead.message}>
                          <MessageSquare size={14} />
                          {lead.message}
                        </div>
                      ) : (
                        <span style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Sin mensaje</span>
                      )}
                    </td>
                    <td>
                      {getStatusBadge(lead.status)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '8px' }} title="Ver detalles">
                          <ExternalLink size={16} />
                        </button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
