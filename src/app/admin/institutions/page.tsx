"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  XCircle,
  PlayCircle,
  ChevronDown,
  X,
  Plus,
  Trash2
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";
import { Institution } from "@/types";

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for new institution form
  const [formData, setFormData] = useState<Partial<Institution>>({
    name: '',
    cuit: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    status: 'demo',
    modalities: [{ name: '', students: 0 }]
  });

  useEffect(() => {
    // Simulando carga de datos iniciales
    setTimeout(() => {
      setInstitutions([
        {
          id: "1",
          created_at: new Date().toISOString(),
          name: "Colegio San Martín",
          cuit: "30-12345678-9",
          address: "Av. Libertador 1234",
          city: "San Juan",
          phone: "264-4211111",
          email: "administracion@sanmartin.edu.ar",
          totalStudents: 450,
          modalities: [
            { name: "Inicial", students: 100 },
            { name: "Primaria", students: 200 },
            { name: "Secundaria", students: 150 }
          ],
          status: "activo"
        },
        {
          id: "2",
          created_at: new Date().toISOString(),
          name: "Instituto Belgrano",
          cuit: "30-87654321-0",
          address: "Calle Rivadavia 456",
          city: "Mendoza",
          phone: "261-4552222",
          email: "info@belgrano.edu.ar",
          totalStudents: 310,
          modalities: [
            { name: "Secundaria", students: 200 },
            { name: "Técnica", students: 110 }
          ],
          status: "demo"
        },
        {
          id: "3",
          created_at: new Date().toISOString(),
          name: "Escuela Sarmiento",
          cuit: "30-55566677-1",
          address: "Gral. Acha 789",
          city: "San Juan",
          phone: "264-4330000",
          email: "directorio@sarmiento.edu.ar",
          totalStudents: 125,
          modalities: [
            { name: "Primaria", students: 125 }
          ],
          status: "inactivo"
        },
        {
          id: "4",
          created_at: new Date().toISOString(),
          name: "Colegio Santa Fe",
          cuit: "30-99988877-6",
          address: "Av. Rawson 432",
          city: "San Juan",
          phone: "264-4223344",
          email: "contacto@santafe.edu.ar",
          totalStudents: 280,
          modalities: [
            { name: "Inicial", students: 80 },
            { name: "Primaria", students: 200 }
          ],
          status: "inactivo"
        },
        {
          id: "5",
          created_at: new Date().toISOString(),
          name: "Instituto Tecnológico",
          cuit: "30-11122233-4",
          address: "Lateral Circunvalación 789",
          city: "San Juan",
          phone: "264-4556677",
          email: "info@it.edu.ar",
          totalStudents: 150,
          modalities: [
            { name: "Secundaria", students: 150 }
          ],
          status: "demo"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddModality = () => {
    setFormData({
      ...formData,
      modalities: [...(formData.modalities || []), { name: '', students: 0 }]
    });
  };

  const handleRemoveModality = (index: number) => {
    const newMods = [...(formData.modalities || [])];
    newMods.splice(index, 1);
    setFormData({ ...formData, modalities: newMods });
  };

  const handleModalityChange = (index: number, field: 'name' | 'students', value: string | number) => {
    const newMods = [...(formData.modalities || [])];
    newMods[index] = { ...newMods[index], [field]: value };
    setFormData({ ...formData, modalities: newMods });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalStudents = formData.modalities?.reduce((acc, curr) => acc + (Number(curr.students) || 0), 0) || 0;
    
    const newInst: Institution = {
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      name: formData.name || '',
      cuit: formData.cuit || '',
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      email: formData.email,
      totalStudents,
      modalities: formData.modalities as any,
      status: formData.status as any
    };

    setInstitutions([newInst, ...institutions]);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: '',
      cuit: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      status: 'demo',
      modalities: [{ name: '', students: 0 }]
    });
  };

  const getStatusBadge = (status: Institution['status']) => {
    switch (status) {
      case 'activo':
        return (
          <span className={`${styles.badge} ${styles.badgeActive}`}>
            <CheckCircle2 size={12} />
            Activo
          </span>
        );
      case 'inactivo':
        return (
          <span className={`${styles.badge} ${styles.badgeInactive}`}>
            <XCircle size={12} />
            Inactivo
          </span>
        );
      case 'demo':
        return (
          <span className={`${styles.badge} ${styles.badgeDemo}`}>
            <PlayCircle size={12} />
            Demo
          </span>
        );
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Instituciones Educativas</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Alta de Institución
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
              placeholder="Buscar por nombre, CUIT o ciudad..." 
            />
          </div>
          <button className="btn-secondary" style={{ padding: '0.75rem 1rem' }}>
            <Filter size={18} />
            Filtros
          </button>
        </div>
      </div>

      {/* Institutions Table */}
      <section className={styles.sectionCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Institución / CUIT</th>
                <th>Contacto / Ubicación</th>
                <th>Alumnos por Modalidad</th>
                <th>Total Alumnos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Cargando instituciones...</td></tr>
              ) : institutions.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay instituciones registradas.</td></tr>
              ) : (
                institutions.map((inst) => (
                  <tr key={inst.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--foreground)' }}>{inst.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CUIT: {inst.cuit}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.815rem' }}>
                          <MapPin size={14} color="#94a3b8" />
                          {inst.address}, {inst.city}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.815rem' }}>
                          <Phone size={14} color="#94a3b8" />
                          {inst.phone}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.815rem' }}>
                          <Mail size={14} color="#94a3b8" />
                          {inst.email}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {inst.modalities.map((mod) => (
                          <div 
                            key={`${inst.id}-${mod.name}`} 
                            style={{ 
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              backgroundColor: '#f8fafc',
                              fontSize: '0.75rem',
                              border: '1px solid #f1f5f9'
                            }}
                          >
                            <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <GraduationCap size={12} color="#64748b" />
                              {mod.name}
                            </span>
                            <span style={{ color: '#286DE1', fontWeight: 700 }}>{mod.students.toLocaleString('es-AR')}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ 
                        display: 'inline-flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        background: 'rgba(40, 109, 225, 0.05)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        minWidth: '80px'
                      }}>
                        <Users size={18} color="#286DE1" />
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: '#233343' }}>{inst.totalStudents.toLocaleString('es-AR')}</div>
                        <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Alumnos</div>
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(inst.status)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.4rem' }}>
                          <ChevronDown size={16} />
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

      {/* Modal Alta de Institución */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            position: 'relative',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Building2 size={24} color="#286DE1" />
              Alta de Nueva Institución
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Sección General */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Nombre de la Institución *</label>
                  <input 
                    required
                    type="text" 
                    className={styles.input} 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Colegio San Martín" 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>CUIT *</label>
                  <input 
                    required
                    type="text" 
                    className={styles.input} 
                    value={formData.cuit}
                    onChange={(e) => setFormData({...formData, cuit: e.target.value})}
                    placeholder="30-XXXXXXXX-X" 
                  />
                </div>
              </div>

              {/* Sección Contacto */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Dirección</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Calle y número" 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Ciudad</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Ej: San Juan" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Teléfono</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="264XXXXXXX" 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={styles.input} 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="admin@colegio.edu.ar" 
                  />
                </div>
              </div>

              {/* Sección Modalidades */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Modalidades y Cantidad de Alumnos</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {formData.modalities?.map((mod, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ flex: 2 }}>
                        <input 
                          type="text" 
                          className={styles.input} 
                          value={mod.name}
                          onChange={(e) => handleModalityChange(index, 'name', e.target.value)}
                          placeholder="Nivel (Ej: Primaria)" 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="number" 
                          className={styles.input} 
                          value={mod.students}
                          onChange={(e) => handleModalityChange(index, 'students', parseInt(e.target.value) || 0)}
                          placeholder="Alumnos" 
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveModality(index)}
                        style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                        disabled={formData.modalities?.length === 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={handleAddModality}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      color: '#286DE1', 
                      background: 'none', 
                      border: '1px dashed #286DE1', 
                      padding: '0.5rem', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      justifyContent: 'center',
                      marginTop: '0.5rem'
                    }}
                  >
                    <Plus size={16} />
                    Añadir Modalidad
                  </button>
                </div>
              </div>

              {/* Estado */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Estado Inicial</label>
                <select 
                  className={styles.input}
                  style={{ width: '100%' }}
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="demo">Modo Demo</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ flex: 2 }}
                >
                  Confirmar Alta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
