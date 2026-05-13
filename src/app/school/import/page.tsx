"use client";

import { useState } from "react";
import { 
  FileUp, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  ArrowRight,
  Loader2
} from "lucide-react";
import styles from "../../admin/dashboard/dashboard.module.css";

export default function ImportPage() {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setStep(2);
      }, 2000);
    }
  };

  const templates = [
    { name: "Plantilla Alumnos y Familias", icon: FileText, color: "#286DE1" },
    { name: "Plantilla Cursos y Niveles", icon: FileText, color: "#10b981" },
    { name: "Plantilla Talleres y Servicios", icon: FileText, color: "#f59e0b" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Importación Masiva de Datos</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Carga rápidamente tu base de datos desde archivos Excel o CSV.
          </p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Sidebar: Templates */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className={styles.sectionCard}>
            <h2 className={styles.sectionTitle} style={{ fontSize: '1rem' }}>Descargar Plantillas</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {templates.map((template, index) => (
                <button 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#286DE1'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ backgroundColor: `${template.color}10`, padding: '0.5rem', borderRadius: '6px' }}>
                    <template.icon size={18} color={template.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.815rem', fontWeight: 600 }}>{template.name}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>XLSX, CSV</div>
                  </div>
                  <Download size={16} color="#94a3b8" />
                </button>
              ))}
            </div>
          </section>

          <section className={styles.sectionCard} style={{ backgroundColor: '#f0f9ff', borderColor: '#bae6fd' }}>
            <h2 className={styles.sectionTitle} style={{ fontSize: '1rem', color: '#0369a1' }}>
              <AlertCircle size={18} />
              Ayuda
            </h2>
            <p style={{ fontSize: '0.815rem', color: '#0c4a6e', lineHeight: 1.5 }}>
              Asegúrate de que las columnas coincidan con el formato de la plantilla para evitar errores en el procesamiento de cuotas y vinculación de familiares.
            </p>
          </section>
        </aside>

        {/* Main: Import Process */}
        <main className={styles.sectionCard} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {step === 1 && (
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <div style={{ 
                width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
              }}>
                {isUploading ? (
                  <Loader2 size={32} color="#286DE1" className="animate-spin" />
                ) : (
                  <FileUp size={32} color="#64748b" />
                )}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {isUploading ? "Subiendo archivo..." : "Sube tu archivo"}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                Arrastra y suelta tu archivo aquí o haz clic para buscarlo en tu equipo.
              </p>
              
              <input 
                type="file" 
                id="file-upload" 
                style={{ display: 'none' }} 
                onChange={handleFileUpload}
                accept=".csv, .xlsx"
              />
              <label 
                htmlFor="file-upload" 
                className="btn-primary" 
                style={{ cursor: 'pointer', display: 'inline-flex' }}
              >
                Seleccionar Archivo
              </label>
              <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Formatos soportados: .xlsx, .csv (Máx. 10MB)
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: '#f0fdf4', padding: '0.5rem', borderRadius: '50%' }}>
                  <CheckCircle2 size={24} color="#16a34a" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Archivo Validado Correctamente</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{file?.name} - 450 registros encontrados</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Resumen de Importación</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>450</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alumnos</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>432</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Responsables</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>18</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cursos</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button className="btn-secondary" onClick={() => setStep(1)}>Cambiar Archivo</button>
                <button className="btn-primary" onClick={() => setStep(3)}>
                  Confirmar Importación
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', height: '80px', backgroundColor: '#f0fdf4', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
              }}>
                <CheckCircle2 size={40} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>¡Importación Exitosa!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                Se han procesado todos los registros. Ahora puedes ver los alumnos en el listado.
              </p>
              <button className="btn-primary" onClick={() => window.location.href = "/school/students"}>
                Ver Alumnos
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
