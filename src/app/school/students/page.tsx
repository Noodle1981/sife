"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical,
  CreditCard,
  History,
  Phone,
  Mail,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  X,
  Plus
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";
import { Student, Responsible, Course } from "@/types";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student & { responsibles: Partial<Responsible>[] }>>({
    first_name: '',
    last_name: '',
    dni: '',
    course_id: '',
    responsibles: [{ full_name: '', relationship: 'padre', email: '', dni: '' }]
  });
  
  // Mock data
  const students: (Student & { course_name: string })[] = [
    { 
      id: "1", first_name: "Ignacio", last_name: "Olivera", dni: "45.123.456", 
      course_id: "3", course_name: "1° Grado 'A'", status: 'active', 
      responsible_id: "r1", current_balance: -15000, total_credits: 0, institution_id: "inst1"
    },
    { 
      id: "2", first_name: "Sofía", last_name: "García", dni: "46.789.012", 
      course_id: "3", course_name: "1° Grado 'A'", status: 'active', 
      responsible_id: "r2", current_balance: 5000, total_credits: 5000, institution_id: "inst1"
    },
    { 
      id: "3", first_name: "Mateo", last_name: "Rodríguez", dni: "44.555.666", 
      course_id: "5", course_name: "1° Año Secundaria", status: 'active', 
      responsible_id: "r3", current_balance: 0, total_credits: 0, institution_id: "inst1"
    }
  ];

  const courses = [
    { id: "1", name: "Sala de 4 - Mañana" },
    { id: "2", name: "Sala de 5 - Tarde" },
    { id: "3", name: "1° Grado 'A'" },
    { id: "4", name: "1° Grado 'B'" },
    { id: "5", name: "1° Año Secundaria" },
  ];

  const responsibles: Record<string, Responsible> = {
    "r1": { id: "r1", full_name: "Omar Olivera", email: "omar@ejemplo.com", phone: "2644123456", relationship: 'padre', dni: "20.123.456", alias: "omar.sife.pagos" },
    "r2": { id: "r2", full_name: "Lucía Méndez", email: "lucia@ejemplo.com", phone: "2644987654", relationship: 'madre', dni: "22.789.012", alias: "lucia.uclp" },
    "r3": { id: "r3", full_name: "Ricardo Rodríguez", email: "ricardo@ejemplo.com", phone: "2644555666", relationship: 'padre', dni: "18.555.666" },
  };

  const handleAddResponsible = () => {
    setNewStudent({
      ...newStudent,
      responsibles: [...(newStudent.responsibles || []), { full_name: '', relationship: 'madre', email: '', dni: '' }]
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const getBalanceStyle = (balance: number) => {
    if (balance < 0) return { color: '#ef4444', backgroundColor: '#fef2f2' };
    if (balance > 0) return { color: '#10b981', backgroundColor: '#f0fdf4' };
    return { color: '#64748b', backgroundColor: '#f8fafc' };
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Alumnos y Familias</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Gestión de legajos, responsables económicos y estados de cuenta.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          Nuevo Alumno
        </button>
      </header>

      {/* Toolbar */}
      <div className={styles.sectionCard} style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <Search className={styles.inputIcon} size={18} />
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Buscar por nombre, apellido o DNI..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary" style={{ padding: '0.75rem 1rem' }}>
            <Filter size={18} />
            Filtrar por Curso
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main List */}
        <section className={styles.sectionCard} style={{ padding: 0 }}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Curso</th>
                  <th>Responsable</th>
                  <th>Estado Financiero</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const responsible = responsibles[student.responsible_id];
                  const balanceStyle = getBalanceStyle(student.current_balance);
                  
                  return (
                    <tr key={student.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ 
                            width: '36px', height: '36px', borderRadius: '50%', 
                            backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.875rem', fontWeight: 700, color: '#475569'
                          }}>
                            {student.first_name[0]}{student.last_name[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{student.last_name}, {student.first_name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DNI: {student.dni}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.875rem', color: '#1e293b' }}>{student.course_name}</span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.875rem' }}>{responsible.full_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#286DE1' }}>{responsible.relationship}</div>
                      </td>
                      <td>
                        <div style={{ 
                          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                          padding: '0.4rem 0.75rem', borderRadius: '8px', ...balanceStyle,
                          fontWeight: 700, fontSize: '0.875rem'
                        }}>
                          {student.current_balance < 0 ? <ArrowDownRight size={14} /> : student.current_balance > 0 ? <ArrowUpRight size={14} /> : <Wallet size={14} />}
                          ${Math.abs(student.current_balance).toLocaleString('es-AR')}
                        </div>
                      </td>
                      <td>
                        <button className="btn-secondary" style={{ padding: '0.4rem' }}>
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detail Panel (Mocking a selected student) */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className={styles.sectionCard} style={{ borderTop: '4px solid #286DE1' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f1f5f9', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                border: '2px solid #e2e8f0'
              }}>
                <Users size={32} color="#64748b" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Ignacio Olivera</h3>
              <p style={{ fontSize: '0.815rem', color: 'var(--text-muted)' }}>1° Grado 'A'</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ borderBottom: '1px solid var(--border)', pb: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.75rem' }}>Responsable Económico</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                    <UserCheck size={16} color="#10b981" />
                    Omar Olivera (Padre)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.815rem', color: 'var(--text-muted)' }}>
                    <Mail size={14} />
                    omar@ejemplo.com
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.815rem', color: 'var(--text-muted)' }}>
                    <Phone size={14} />
                    +54 264 4123456
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.75rem' }}>Información de Pagos</h4>
                <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.815rem' }}>
                    <span style={{ color: '#64748b' }}>Alias:</span>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>omar.sife.pagos</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.815rem' }}>
                    <span style={{ color: '#64748b' }}>Crédito:</span>
                    <span style={{ fontWeight: 600, color: '#10b981' }}>$0</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: '0.815rem', padding: '0.5rem' }}>
                  <History size={16} /> Ver Historial
                </button>
                <button className="btn-secondary" style={{ flex: 1, fontSize: '0.815rem', padding: '0.5rem' }}>
                  <CreditCard size={16} /> Cobrar
                </button>
              </div>
            </div>
          </section>

          <section className={styles.sectionCard} style={{ backgroundColor: '#fffbeb', borderColor: '#fef3c7' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Wallet size={16} /> Recordatorio
            </h4>
            <p style={{ fontSize: '0.75rem', color: '#b45309', lineHeight: 1.5 }}>
              Este alumno tiene una cuota de Taller de Ajedrez pendiente de asignar para el mes de Junio.
            </p>
          </section>
        </aside>
      </div>

      {/* New Student Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '800px',
            maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <UserPlus size={24} color="#286DE1" />
              Alta de Nuevo Alumno
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
              Completa los datos del alumno y vincula a sus responsables económicos.
            </p>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Student Data */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                  Datos del Alumno
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Nombre</label>
                    <input type="text" required className={styles.input} style={{ width: '100%' }} placeholder="Ej: Juan" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Apellido</label>
                    <input type="text" required className={styles.input} style={{ width: '100%' }} placeholder="Ej: Pérez" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>DNI</label>
                    <input type="text" required className={styles.input} style={{ width: '100%' }} placeholder="XX.XXX.XXX" />
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Curso / División</label>
                  <select required className={styles.input} style={{ width: '100%' }}>
                    <option value="">Seleccionar curso...</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Family Data */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Responsables y Familiares</h3>
                  <button type="button" onClick={handleAddResponsible} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    <Plus size={14} /> Agregar Familiar
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {newStudent.responsibles?.map((resp, index) => (
                    <div key={index} style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'relative' }}>
                      {index > 0 && (
                        <button type="button" style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <X size={16} />
                        </button>
                      )}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Nombre Completo</label>
                          <input type="text" required className={styles.input} style={{ width: '100%' }} placeholder="Ej: Ana García" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Parentesco</label>
                          <select className={styles.input} style={{ width: '100%' }}>
                            <option value="padre">Padre</option>
                            <option value="madre">Madre</option>
                            <option value="tutor">Tutor Legal</option>
                            <option value="otro">Otro</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Email</label>
                          <input type="email" required className={styles.input} style={{ width: '100%' }} placeholder="ejemplo@correo.com" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.815rem', fontWeight: 600, marginBottom: '0.4rem' }}>Teléfono</label>
                          <input type="text" className={styles.input} style={{ width: '100%' }} placeholder="+54 264 ..." />
                        </div>
                      </div>
                      <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '1rem', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <CreditCard size={16} color="#64748b" />
                          <span style={{ fontSize: '0.815rem', fontWeight: 700, color: '#475569' }}>Datos para Conciliación (Opcional)</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>CBU / CVU</label>
                            <input type="text" className={styles.input} style={{ width: '100%', fontSize: '0.75rem' }} placeholder="22 dígitos..." />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>Alias Mercado Pago / Banco</label>
                            <input type="text" className={styles.input} style={{ width: '100%', fontSize: '0.75rem' }} placeholder="mi.alias.pago" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, gap: '0.75rem' }}>
                  <UserPlus size={18} />
                  Confirmar Alta de Alumno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
