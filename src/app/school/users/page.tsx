"use client";

import { useState } from "react";
import { 
  Users, 
  Plus, 
  Shield, 
  Mail, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  UserPlus
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";
import { SchoolUser } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<SchoolUser[]>([
    { id: "1", email: "admin@sanmartin.edu.ar", full_name: "Admin Principal", role: 'admin', institution_id: "inst1" },
    { id: "2", email: "secretaria@sanmartin.edu.ar", full_name: "María López", role: 'secretary', institution_id: "inst1" },
    { id: "3", email: "tesoreria@sanmartin.edu.ar", full_name: "Juan Pérez", role: 'treasurer', institution_id: "inst1" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRoleBadge = (role: SchoolUser['role']) => {
    switch (role) {
      case 'admin':
        return <span className={`${styles.badge} ${styles.badgeActive}`}><Shield size={12} /> Administrador</span>;
      case 'secretary':
        return <span className={`${styles.badge} ${styles.badgeDemo}`}><Users size={12} /> Secretaría</span>;
      case 'treasurer':
        return <span className={`${styles.badge} ${styles.badgeScheduled}`}><Shield size={12} /> Tesorería</span>;
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Accesos</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Administra los usuarios de la institución y sus permisos de acceso.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          Invitar Usuario
        </button>
      </header>

      <section className={styles.sectionCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol / Permisos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: 600 }}>{user.full_name}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgeActive}`}>
                      <CheckCircle2 size={12} /> Activo
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.4rem' }}>
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal - Placeholder for invitations */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '450px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Invitar Personal Administrativo</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Nombre Completo</label>
                <input type="text" className={styles.input} style={{ width: '100%' }} placeholder="Ej: Ana García" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Correo Electrónico</label>
                <input type="email" className={styles.input} style={{ width: '100%' }} placeholder="ana@colegio.edu.ar" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Rol asignado</label>
                <select className={styles.input} style={{ width: '100%' }}>
                  <option value="secretary">Secretaría (Carga de datos)</option>
                  <option value="treasurer">Tesorería (Gestión de cobros)</option>
                  <option value="admin">Administrador (Control total)</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }}>Enviar Invitación</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
