"use client";

import { useState } from "react";
import { 
  Shield, 
  Users, 
  Key, 
  Check, 
  X, 
  AlertTriangle,
  Lock,
  Eye,
  Edit3,
  CreditCard,
  Building,
  Save,
  CheckCircle2,
  UserPlus
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";

// Interface definitions
interface Permission {
  id: string;
  name: string;
  description: string;
  category: "students" | "finances" | "system";
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[]; // List of permission IDs
}

interface StaffUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "active" | "suspended";
}

export default function SchoolSettingsPage() {
  const [activeSubTab, setActiveSubTab] = useState<'permissions' | 'users' | 'security'>('permissions');

  // 1. Catálogo de Permisos
  const permissionsCatalog: Permission[] = [
    { id: "stud_view", name: "Ver Alumnos", description: "Acceso de lectura a fichas de alumnos y matrículas.", category: "students" },
    { id: "stud_edit", name: "Crear/Modificar Alumnos", description: "Capacidad para inscribir, dar de baja y editar datos familiares.", category: "students" },
    { id: "fin_view", name: "Ver Caja y Estadísticas", description: "Acceso a recaudación, morosidad y proyecciones de cierre.", category: "finances" },
    { id: "fin_register", name: "Registrar Cobros Manuales", description: "Permitir cobro por Ventanilla, Posnet y registrar comprobantes.", category: "finances" },
    { id: "fin_config", name: "Configurar Aranceles y Aumentos", description: "Modificar costos de cuota y aplicar aumentos retroactivos del 10%.", category: "finances" },
    { id: "sys_banks", name: "Configurar Cuentas Bancarias", description: "Administrar CBU/CVU de la institución y credenciales de Mercado Pago.", category: "system" },
    { id: "sys_roles", name: "Administrar Roles y Permisos", description: "Acceso total para cambiar roles del personal (Exclusivo Directivo).", category: "system" },
  ];

  // 2. Roles del Colegio
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: "director", 
      name: "Directivo / Propietario", 
      description: "Acceso total y configuración de seguridad de la institución.", 
      color: "#2563eb",
      permissions: ["stud_view", "stud_edit", "fin_view", "fin_register", "fin_config", "sys_banks", "sys_roles"]
    },
    { 
      id: "billing", 
      name: "Administrativo / Cobrador", 
      description: "Encargado de la facturación diaria, cobros y cuentas corrientes.", 
      color: "#10b981",
      permissions: ["stud_view", "stud_edit", "fin_view", "fin_register"]
    },
    { 
      id: "teacher", 
      name: "Preceptor / Docente", 
      description: "Seguimiento diario escolar sin acceso a métricas monetarias.", 
      color: "#f59e0b",
      permissions: ["stud_view"]
    },
    { 
      id: "auditor", 
      name: "Auditor Externo / Contable", 
      description: "Revisión tributaria de libros, reportes y exportación de planillas.", 
      color: "#6366f1",
      permissions: ["stud_view", "fin_view"]
    }
  ]);

  // 3. Personal Escolar
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([
    { id: "u1", name: "Carlos Ortega", email: "carlos.ortega@colegio.edu.ar", roleId: "director", status: "active" },
    { id: "u2", name: "Ana Milena Gómez", email: "ana.milena@colegio.edu.ar", roleId: "billing", status: "active" },
    { id: "u3", name: "Pedro López", email: "pedro.lopez@colegio.edu.ar", roleId: "teacher", status: "active" },
    { id: "u4", name: "Marta Rodríguez", email: "marta.r@estudiocontable.com", roleId: "auditor", status: "active" },
  ]);

  // Estados de feedback
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<string | null>(null);

  // Alternar permisos de manera reactiva e interactiva
  const handleTogglePermission = (roleId: string, permissionId: string) => {
    // El rol Directivo tiene protección especial, nunca pierde permisos de administrador
    if (roleId === "director") {
      alert("El rol Directivo / Propietario debe conservar siempre el 100% de los permisos del sistema por seguridad.");
      return;
    }

    setRoles(prevRoles => 
      prevRoles.map(role => {
        if (role.id !== roleId) return role;
        const exists = role.permissions.includes(permissionId);
        const newPermissions = exists 
          ? role.permissions.filter(p => p !== permissionId)
          : [...role.permissions, permissionId];
        return { ...role, permissions: newPermissions };
      })
    );
  };

  // Guardar configuración de roles con animación premium
  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Reasignar rol a personal
  const handleUserRoleChange = (userId: string, newRoleId: string) => {
    setStaffUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id !== userId) return user;
        return { ...user, roleId: newRoleId };
      })
    );
    setSelectedUserToEdit(null);
    handleSaveChanges();
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Configuración de Seguridad</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Control de accesos, definición de roles, asignación de personal y auditoría de permisos.
          </p>
        </div>
        <div>
          {saveSuccess && (
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              backgroundColor: '#ecfdf5', border: '1px solid #10b981', 
              color: '#065f46', padding: '0.625rem 1.25rem', borderRadius: '0.75rem',
              fontSize: '0.815rem', fontWeight: 700, animation: 'fadeIn 0.2s ease-out'
            }}>
              <CheckCircle2 size={16} color="#10b981" />
              ¡Cambios aplicados y guardados con éxito!
            </div>
          )}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(-5px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}} />
        </div>
      </header>

      {/* Selector de Sub-Tablas */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveSubTab('permissions')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeSubTab === 'permissions' ? '#286DE1' : 'var(--text-muted)',
            borderTop: 'none', borderLeft: 'none', borderRight: 'none',
            borderBottom: activeSubTab === 'permissions' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <Shield size={16} /> Roles y Permisos
        </button>
        <button 
          onClick={() => setActiveSubTab('users')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeSubTab === 'users' ? '#286DE1' : 'var(--text-muted)',
            borderTop: 'none', borderLeft: 'none', borderRight: 'none',
            borderBottom: activeSubTab === 'users' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <Users size={16} /> Personal Autorizado ({staffUsers.length})
        </button>
        <button 
          onClick={() => setActiveSubTab('security')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeSubTab === 'security' ? '#286DE1' : 'var(--text-muted)',
            borderTop: 'none', borderLeft: 'none', borderRight: 'none',
            borderBottom: activeSubTab === 'security' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <Key size={16} /> Políticas y Claves
        </button>
      </div>

      {/* SECCIÓN 1: ROLES Y PERMISOS INTERACTIVOS */}
      {activeSubTab === 'permissions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Alerta Directiva */}
          <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem', alignItems: 'flex-start' }}>
            <Shield size={20} color="#2563eb" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1e3a8a' }}>Auditoría de Roles Activa</h4>
              <p style={{ fontSize: '0.75rem', color: '#1e40af', lineHeight: 1.5, marginTop: '0.25rem' }}>
                Los directivos tienen plena facultad para delegar y recortar accesos. Los cambios en esta rejilla tienen impacto instantáneo en las pantallas de los usuarios correspondientes al refrescar su navegador.
              </p>
            </div>
          </div>

          <div className={styles.sectionCard} style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Módulo y Permiso</th>
                  {roles.map(r => (
                    <th key={r.id} style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>
                      <span style={{ 
                        fontSize: '0.6875rem', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: 800,
                        backgroundColor: `${r.color}15`, color: r.color, display: 'inline-block', whiteSpace: 'nowrap'
                      }}>
                        {r.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionsCatalog.map((perm) => (
                  <tr key={perm.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--foreground)' }}>{perm.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>{perm.description}</div>
                    </td>
                    {roles.map((role) => {
                      const hasPermission = role.permissions.includes(perm.id);
                      return (
                        <td key={role.id} style={{ padding: '1rem', textAlign: 'center' }}>
                          <button
                            onClick={() => handleTogglePermission(role.id, perm.id)}
                            disabled={role.id === "director"}
                            style={{
                              border: 'none',
                              background: 'none',
                              cursor: role.id === "director" ? 'not-allowed' : 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: hasPermission ? `${role.color}15` : '#f1f5f9',
                              color: hasPermission ? role.color : '#94a3b8',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {hasPermission ? <Check size={18} strokeWidth={3} /> : <X size={18} strokeWidth={3} />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Botón de Guardado General */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', padding: '0 1rem' }}>
              <button 
                onClick={handleSaveChanges}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', 
                  backgroundColor: '#0f172a', color: 'white', border: 'none',
                  padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', transition: 'background-color 0.2s'
                }}
              >
                <Save size={16} /> Guardar Directivas de Permisos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: PERSONAL AUTORIZADO */}
      {activeSubTab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>Miembros del Staff Escolar</h3>
            <button 
              onClick={() => alert("Simulando agregado de personal nuevo...")}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                backgroundColor: '#286DE1', color: 'white', border: 'none',
                padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.75rem',
                fontWeight: 700, cursor: 'pointer'
              }}
            >
              <UserPlus size={16} /> Invitar Personal
            </button>
          </div>

          <div className={styles.sectionCard}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {staffUsers.map(user => {
                const userRole = roles.find(r => r.id === user.roleId)!;
                const isEditing = selectedUserToEdit === user.id;

                return (
                  <div key={user.id} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${userRole.color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: userRole.color
                      }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '0.875rem' }}>{user.name}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      {/* Selección de Rol Reasignable */}
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <select 
                            defaultValue={user.roleId}
                            onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                            style={{
                              padding: '0.375rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)',
                              fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'white'
                            }}
                          >
                            {roles.map(r => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                          </select>
                          <button 
                            onClick={() => setSelectedUserToEdit(null)}
                            style={{ padding: '0.375rem', borderRadius: '0.5rem', backgroundColor: '#ef444415', color: '#ef4444', border: 'none', cursor: 'pointer' }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setSelectedUserToEdit(user.id)}
                          style={{
                            border: 'none', background: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                          }}
                        >
                          <span style={{ 
                            fontSize: '0.6875rem', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: 800,
                            backgroundColor: `${userRole.color}15`, color: userRole.color
                          }}>
                            {userRole.name}
                          </span>
                          <Edit3 size={14} color="var(--text-muted)" />
                        </button>
                      )}

                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                        Activo
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 3: POLÍTICAS Y CLAVES */}
      {activeSubTab === 'security' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className={styles.sectionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Lock size={20} color="#2563eb" />
              <h3 style={{ fontWeight: 800, fontSize: '0.9rem' }}>Políticas de Doble Factor (2FA)</h3>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Obliga a todos los administrativos con roles financieros a verificar su identidad mediante OTP (One-Time Password) al ingresar desde dispositivos desconocidos.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Activar 2FA obligatorio para Finanzas</span>
              <label style={{ 
                position: 'relative', display: 'inline-block', width: '40px', height: '20px', cursor: 'pointer' 
              }}>
                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ 
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: '#2563eb', borderRadius: '20px', transition: '0.2s'
                }}>
                  <span style={{ 
                    position: 'absolute', left: '22px', bottom: '2px', backgroundColor: 'white', 
                    width: '16px', height: '16px', borderRadius: '50%', transition: '0.2s' 
                  }}></span>
                </span>
              </label>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <AlertTriangle size={20} color="#f59e0b" />
              <h3 style={{ fontWeight: 800, fontSize: '0.9rem' }}>Bitácora de Auditoría Fiscal</h3>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Registra de forma inmutable todas las conciliaciones manuales realizadas por los cobradores para resguardar la transparencia fiscal frente a la institución.
            </p>
            <button 
              onClick={() => alert("Descargando logs de auditoría SIFE (.CSV)...")}
              style={{
                width: '100%', padding: '0.625rem', borderRadius: '0.75rem', border: '1px solid var(--border)',
                backgroundColor: 'white', color: 'var(--foreground)', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer'
              }}
            >
              📥 Descargar Historial de Auditoría (CSV)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
