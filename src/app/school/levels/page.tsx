"use client";

import { useState } from "react";
import { 
  Layers, 
  Plus, 
  MoreVertical, 
  ChevronRight,
  Info,
  Trash2,
  Edit2
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";
import { EducationalLevel } from "@/types";

export default function LevelsPage() {
  const [levels, setLevels] = useState<EducationalLevel[]>([
    { id: "1", name: "Inicial", description: "Jardín de Infantes (Salas de 3, 4 y 5)" },
    { id: "2", name: "Primaria", description: "Educación Primaria Obligatoria (1° a 6° grado)" },
    { id: "3", name: "Secundaria", description: "Educación Secundaria (1° a 6° año)" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");

  const handleAddLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLevelName) return;
    
    const newLevel: EducationalLevel = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLevelName,
      description: ""
    };
    
    setLevels([...levels, newLevel]);
    setNewLevelName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Niveles Educativos</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Define la estructura organizativa principal de tu institución.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Nuevo Nivel
        </button>
      </header>

      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
            <Info size={16} />
            Los niveles sirven para agrupar cursos y aplicar conceptos de cobro masivos.
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nivel Educativo</th>
                <th>Descripción</th>
                <th>Cursos Asociados</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level) => (
                <tr key={level.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' }}>
                        <Layers size={18} color="#286DE1" />
                      </div>
                      {level.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{level.description || "Sin descripción"}</td>
                  <td>
                    <span style={{ 
                      backgroundColor: 'rgba(40, 109, 225, 0.1)', 
                      color: '#286DE1', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}>
                      6 Cursos
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.4rem' }}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-secondary" style={{ padding: '0.4rem', color: '#ef4444' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Simple implementation for demo */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '400px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Nuevo Nivel Educativo</h2>
            <form onSubmit={handleAddLevel}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Nombre del Nivel</label>
              <input 
                autoFocus
                type="text" 
                className={styles.input} 
                placeholder="Ej: Terciario" 
                style={{ width: '100%', marginBottom: '1.5rem' }}
                value={newLevelName}
                onChange={(e) => setNewLevelName(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
