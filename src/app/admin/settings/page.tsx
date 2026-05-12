"use client";

import { useState } from "react";
import { 
  Settings as SettingsIcon,
  Shield,
  Building2,
  Users,
  Bell,
  Lock,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  UserPlus,
  ChevronRight,
  Database
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'access' | 'global' | 'system'>('access');

  // Mock data for school admins
  const [admins, setAdmins] = useState([
    { id: '1', name: 'Carlos Ortega', email: 'carlos@sanmartin.edu.ar', institution: 'Colegio San Martín', role: 'Admin', status: 'activo' },
    { id: '2', name: 'Lucía Méndez', email: 'lucia@belgrano.edu.ar', institution: 'Instituto Belgrano', role: 'Admin', status: 'activo' },
    { id: '3', name: 'Marcos Ruiz', email: 'm.ruiz@it.edu.ar', institution: 'Instituto Tecnológico', role: 'Visor', status: 'inactivo' }
  ]);

  return (
    <>
      <header className={styles.header}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h1 className={styles.title}>Configuración del Sistema</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Gestiona permisos, accesos y parámetros globales de SIFE.</p>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0' }}>
        <button 
          onClick={() => setActiveTab('access')}
          style={{ 
            padding: '1rem 0.5rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'access' ? '2px solid #286DE1' : '2px solid transparent',
            color: activeTab === 'access' ? '#286DE1' : '#64748b',
            fontWeight: activeTab === 'access' ? 700 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Shield size={18} />
          Accesos Institucionales
        </button>
        <button 
          onClick={() => setActiveTab('global')}
          style={{ 
            padding: '1rem 0.5rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'global' ? '2px solid #286DE1' : '2px solid transparent',
            color: activeTab === 'global' ? '#286DE1' : '#64748b',
            fontWeight: activeTab === 'global' ? 700 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Building2 size={18} />
          Parámetros de Escuela
        </button>
        <button 
          onClick={() => setActiveTab('system')}
          style={{ 
            padding: '1rem 0.5rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'system' ? '2px solid #286DE1' : '2px solid transparent',
            color: activeTab === 'system' ? '#286DE1' : '#64748b',
            fontWeight: activeTab === 'system' ? 700 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Database size={18} />
          Sistema y Auditoría
        </button>
      </div>

      <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        {activeTab === 'access' && (
          <section className={styles.sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Administradores de Institución</h2>
                <p style={{ fontSize: '0.815rem', color: '#64748b' }}>Usuarios con permiso para gestionar su propio colegio.</p>
              </div>
              <button className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                <UserPlus size={18} />
                Nuevo Administrador
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Institución Asignada</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{admin.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{admin.email}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                          <Building2 size={14} color="#94a3b8" />
                          {admin.institution}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.815rem', background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                          {admin.role}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.815rem', color: admin.status === 'activo' ? '#10b981' : '#ef4444' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: admin.status === 'activo' ? '#10b981' : '#ef4444' }}></div>
                          {admin.status === 'activo' ? 'Habilitado' : 'Suspendido'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }} title="Editar">
                            <SettingsIcon size={18} />
                          </button>
                          <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Revocar Acceso">
                            <Lock size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'global' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <section className={styles.sectionCard}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={20} color="#286DE1" />
                Control de Funcionalidades
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: 'Conciliación Automática', desc: 'Permitir que las escuelas vean pagos validados por el bot.', default: true },
                  { title: 'Módulo de Matrícula', desc: 'Habilitar el cobro de matrículas anuales.', default: true },
                  { title: 'Chat Soporte Directo', desc: 'Habilitar burbuja de soporte SIFE en el panel escolar.', default: false },
                  { title: 'Exportación Masiva', desc: 'Permitir descarga de datos sensibles en CSV/PDF.', default: true }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ maxWidth: '75%' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                    {item.default ? <ToggleRight size={32} color="#286DE1" style={{ cursor: 'pointer' }} /> : <ToggleLeft size={32} color="#94a3b8" style={{ cursor: 'pointer' }} />}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sectionCard}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={20} color="#286DE1" />
                Notificaciones SIFE
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '0.815rem', fontWeight: 600, color: '#1e40af', marginBottom: '0.25rem' }}>Aviso Global a Escuelas</div>
                  <p style={{ fontSize: '0.75rem', color: '#1e40af', margin: 0 }}>Envía un mensaje que aparecerá en el dashboard de todos los directores.</p>
                  <textarea 
                    placeholder="Escribe el aviso aquí..." 
                    style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #bfdbfe', fontSize: '0.875rem' }}
                    rows={3}
                  ></textarea>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem' }}>Difundir Mensaje</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'system' && (
          <div style={{ maxWidth: '600px' }}>
            <section className={styles.sectionCard}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Parámetros Técnicos</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Comisión Base SIFE (%)</label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input type="number" defaultValue="1.0" className={styles.input} style={{ flex: 1 }} />
                    <button className="btn-secondary">Actualizar Global</button>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.4rem' }}>Afecta a todas las nuevas instituciones creadas.</p>
                </div>

                <div style={{ padding: '1rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: '0.815rem', fontWeight: 600, color: '#991b1b', marginBottom: '0.5rem' }}>Zona de Peligro</div>
                  <button className="btn-secondary" style={{ color: '#991b1b', borderColor: '#fecaca', width: '100%', justifyContent: 'center' }}>
                    <Trash2 size={16} />
                    Purgar Datos de Prueba
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
