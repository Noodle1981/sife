"use client";

import { useState } from "react";
import { Building, Mail, Phone, User, MessageSquare, Loader2 } from "lucide-react";
import styles from "./ContactForm.module.css";
import { supabase } from "@/lib/supabase";

const COMMON_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
  "icloud.com", "live.com", "aol.com", "msn.com"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (domain && COMMON_DOMAINS.includes(domain)) {
      setEmailWarning("Se recomienda el uso de un correo institucional (@colegio.edu, @gob.ar, etc.) para una validación más rápida.");
    } else {
      setEmailWarning(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (id === "email") {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from("leads")
        .insert([
          {
            school_name: formData.school,
            contact_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            status: 'pending'
          }
        ]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting lead:", err);
      setError("Hubo un problema al enviar su solicitud. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className={`section ${styles.section}`}>
        <div className="container">
          <div className={styles.successMessage}>
            <h2 style={{ marginBottom: "0.5rem" }}>¡Solicitud Enviada con Éxito!</h2>
            <p>Gracias por su interés en SIFE. Un asesor se pondrá en contacto con usted en las próximas 24 horas para coordinar la demostración personalizada para <strong>{formData.school}</strong>.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={styles.title}>Comience a automatizar hoy</h2>
            <p className={styles.subtitle}>
              Diseñado exclusivamente para directivos y administradores de instituciones educativas. Solicite una demostración gratuita y descubra cómo SIFE puede transformar su gestión financiera.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <Building className={styles.icon} size={20} />
                <span>San Juan, Argentina</span>
              </div>
            </div>
          </div>
          
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Nombre del Directivo / Administrador</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} size={18} />
                  <input 
                    type="text" 
                    id="name" 
                    className={styles.input} 
                    placeholder="Ej. María Fernández" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="school" className={styles.label}>Nombre de la Institución</label>
                <div className={styles.inputWrapper}>
                  <Building className={styles.inputIcon} size={18} />
                  <input 
                    type="text" 
                    id="school" 
                    className={styles.input} 
                    placeholder="Ej. Colegio San José" 
                    required 
                    value={formData.school}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Correo Institucional</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={18} />
                    <input 
                      type="email" 
                      id="email" 
                      className={styles.input} 
                      placeholder="direccion@colegio.edu.ar" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {emailWarning && <span className={styles.error} style={{ color: '#f59e0b' }}>{emailWarning}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>Teléfono de Contacto</label>
                  <div className={styles.inputWrapper}>
                    <Phone className={styles.inputIcon} size={18} />
                    <input 
                      type="tel" 
                      id="phone" 
                      className={styles.input} 
                      placeholder="+54 264 123 4567" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>Contanos sobre tu necesidad (Opcional)</label>
                <div className={styles.inputWrapper}>
                  <MessageSquare className={styles.inputIcon} size={18} style={{ top: '0.75rem' }} />
                  <textarea 
                    id="message" 
                    className={`${styles.input} ${styles.textarea}`} 
                    placeholder="Ej. Necesitamos automatizar el cobro de cuotas y talleres extracurriculares..." 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button 
                type="submit" 
                className={`btn-primary ${styles.submitBtn}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Enviando...
                  </>
                ) : "Solicitar Demostración Gratuita"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
