"use client";

import { useState } from "react";
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Filter,
  BookOpen,
  Users,
  Clock,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Bus,
  Plane,
  Heart,
  X,
  CreditCard
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";
import { Course, BillingConcept } from "@/types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", level_id: "1", name: "Sala de 4 - Turno Mañana", year: 2026, shift: "mañana", base_fee: 45000 },
    { id: "2", level_id: "1", name: "Sala de 5 - Turno Tarde", year: 2026, shift: "tarde", base_fee: 45000 },
    { id: "3", level_id: "2", name: "1° Grado 'A'", year: 2026, shift: "mañana", base_fee: 65000 },
    { id: "4", level_id: "2", name: "1° Grado 'B'", year: 2026, shift: "tarde", base_fee: 65000 },
    { id: "5", level_id: "3", name: "1° Año Secundaria", year: 2026, shift: "jornada_completa", base_fee: 85000 },
  ]);

  const concepts: BillingConcept[] = [
    { 
      id: "w1", 
      name: "Taller de Ajedrez", 
      amount: 8000, 
      category: 'taller', 
      is_mandatory: false, 
      target_type: 'course', 
      target_id: "3" // Asociado a 1° Grado A (ID 3)
    },
    { 
      id: "w2", 
      name: "Fútbol Extracurricular", 
      amount: 12000, 
      category: 'taller', 
      is_mandatory: false, 
      target_type: 'level', 
      target_id: "2" // Primaria
    },
    { 
      id: "e1", 
      name: "Excursión Museo de Ciencias", 
      amount: 5500, 
      category: 'excursion', 
      is_mandatory: true, 
      target_type: 'course', 
      target_id: "5" // Secundaria
    },
    { 
      id: "v1", 
      name: "Viaje de Estudios (Reserva)", 
      amount: 150000, 
      category: 'viaje', 
      is_mandatory: false, 
      target_type: 'level', 
      target_id: "3" // Secundaria
    },
    { 
      id: "d1", 
      name: "Donación Cooperadora (Opcional)", 
      amount: 2000, 
      category: 'donacion', 
      is_mandatory: false, 
      target_type: 'all'
    },
  ];

  const [activeTab, setActiveTab] = useState<'courses' | 'workshops'>('courses');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<BillingConcept>>({
    name: '',
    amount: 0,
    category: 'taller',
    is_mandatory: false,
    target_type: 'all'
  });

  const levels = [
    { id: "1", name: "Inicial" },
    { id: "2", name: "Primaria" },
    { id: "3", name: "Secundaria" }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de guardado
    setIsModalOpen(false);
  };

  const getTargetLabel = (concept: BillingConcept) => {
    if (concept.target_type === 'all') return "Toda la Institución";
    if (concept.target_type === 'level') {
      const level = levels.find(l => l.id === concept.target_id);
      return `Nivel ${level?.name || ''}`;
    }
    if (concept.target_type === 'course') {
      const course = courses.find(c => c.id === concept.target_id);
      return course ? `Solo ${course.name}` : "Curso Específico";
    }
    return "";
  };

  const getCategoryIcon = (category: BillingConcept['category']) => {
    switch(category) {
      case 'taller': return <BookOpen size={20} color="#db2777" />;
      case 'excursion': return <Bus size={20} color="#0ea5e9" />;
      case 'viaje': return <Plane size={20} color="#8b5cf6" />;
      case 'donacion': return <Heart size={20} color="#ef4444" />;
      default: return <CreditCard size={20} color="#64748b" />;
    }
  };

  const getCategoryColor = (category: BillingConcept['category']) => {
    switch(category) {
      case 'taller': return '#fdf2f8';
      case 'excursion': return '#f0f9ff';
      case 'viaje': return '#f5f3ff';
      case 'donacion': return '#fef2f2';
      default: return '#f8fafc';
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Cursos y Conceptos Cobrables</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Gestiona las divisiones y los servicios adicionales (talleres, viajes, excursiones).
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          {activeTab === 'courses' ? 'Nuevo Curso' : 'Nuevo Concepto'}
        </button>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('courses')}
          style={{ 
            padding: '0.75rem 0', 
            fontWeight: 600, 
            fontSize: '0.875rem',
            color: activeTab === 'courses' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'courses' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer'
          }}
        >
          Cursos y Divisiones
        </button>
        <button 
          onClick={() => setActiveTab('workshops')}
          style={{ 
            padding: '0.75rem 0', 
            fontWeight: 600, 
            fontSize: '0.875rem',
            color: activeTab === 'workshops' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'workshops' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer'
          }}
        >
          Conceptos Extra (Talleres, Viajes, etc.)
        </button>
      </div>

      {activeTab === 'courses' ? (
        <div className={styles.sectionCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre del Curso</th>
                  <th>Turno</th>
                  <th>Cuota Base</th>
                  <th>Alumnos</th>
                  <th>Estado Fin.</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: '#f0f9ff', padding: '0.5rem', borderRadius: '8px' }}>
                          <GraduationCap size={18} color="#0ea5e9" />
                        </div>
                        <div style={{ fontWeight: 600 }}>{course.name}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.815rem' }}>
                        <Clock size={14} />
                        {course.shift.replace('_', ' ')}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>
                      ${course.base_fee.toLocaleString('es-AR')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Users size={14} color="#64748b" />
                        25 Alumnos
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeActive}`}>
                        <CheckCircle2 size={12} />
                        Configurado
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
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {concepts.map((concept) => (
            <div key={concept.id} className={styles.sectionCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
              {!concept.is_mandatory && (
                <span style={{ 
                  position: 'absolute', top: '1rem', right: '1rem', 
                  fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                  color: '#94a3b8', border: '1px solid #e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '4px'
                }}>
                  Opcional
                </span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ backgroundColor: getCategoryColor(concept.category), padding: '0.75rem', borderRadius: '12px' }}>
                  {getCategoryIcon(concept.category)}
                </div>
                <div style={{ textAlign: 'right', marginRight: !concept.is_mandatory ? '4rem' : '0' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>${concept.amount.toLocaleString('es-AR')}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{concept.category === 'taller' ? 'Mensual' : 'Pago único'}</div>
                </div>
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{concept.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.815rem', color: '#286DE1', fontWeight: 600 }}>
                  <Users size={14} />
                  {getTargetLabel(concept)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button className="btn-secondary" style={{ flex: 1, fontSize: '0.815rem' }}>Editar</button>
                <button className="btn-secondary" style={{ flex: 1, fontSize: '0.815rem', color: '#ef4444' }}>Eliminar</button>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ 
              border: '2px dashed var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', background: 'none', cursor: 'pointer', color: 'var(--text-muted)'
            }}
          >
            <Plus size={32} />
            <span style={{ fontWeight: 600 }}>Agregar Nuevo Concepto</span>
          </button>
        </div>
      )}

      {/* Advanced Concept Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CreditCard size={24} color="#286DE1" />
              Configurar Nuevo Concepto
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
              Define los detalles, el alcance y las reglas de cobro del nuevo servicio.
            </p>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Categoría y Nombre */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Categoría</label>
                  <select 
                    className={styles.input} 
                    style={{ width: '100%' }}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as BillingConcept['category']})}
                  >
                    <option value="taller">Taller Extraprogramático</option>
                    <option value="excursion">Excursión / Salida</option>
                    <option value="viaje">Viaje de Estudios</option>
                    <option value="material">Materiales / Libros</option>
                    <option value="donacion">Donación Voluntaria</option>
                    <option value="otro">Otro Concepto</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Nombre del Concepto</label>
                  <input 
                    required
                    type="text" 
                    className={styles.input} 
                    placeholder="Ej: Ajedrez Avanzado" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Monto y Periodicidad */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Monto ($)</label>
                  <input 
                    required
                    type="number" 
                    className={styles.input} 
                    placeholder="0.00" 
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                    <input 
                      type="checkbox" 
                      checked={formData.is_mandatory}
                      onChange={(e) => setFormData({...formData, is_mandatory: e.target.checked})}
                      style={{ width: '1.25rem', height: '1.25rem', accentColor: '#286DE1' }}
                    />
                    Es un cobro obligatorio
                  </label>
                </div>
              </div>

              {/* Alcance (Target) */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>Alcance del Cobro</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  {['all', 'level', 'course'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, target_type: type as BillingConcept['target_type'], target_id: undefined})}
                      style={{
                        padding: '0.6rem',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: formData.target_type === type ? '#286DE1' : '#e2e8f0',
                        backgroundColor: formData.target_type === type ? '#eff6ff' : 'white',
                        color: formData.target_type === type ? '#286DE1' : '#64748b',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {type === 'all' ? 'Toda la Inst.' : type === 'level' ? 'Por Nivel' : 'Por Curso'}
                    </button>
                  ))}
                </div>

                {formData.target_type === 'level' && (
                  <select 
                    className={styles.input} 
                    style={{ width: '100%' }}
                    value={formData.target_id || ''}
                    onChange={(e) => setFormData({...formData, target_id: e.target.value})}
                  >
                    <option value="">Seleccionar Nivel...</option>
                    {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                )}

                {formData.target_type === 'course' && (
                  <select 
                    className={styles.input} 
                    style={{ width: '100%' }}
                    value={formData.target_id || ''}
                    onChange={(e) => setFormData({...formData, target_id: e.target.value})}
                  >
                    <option value="">Seleccionar Curso...</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                  Guardar Concepto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
