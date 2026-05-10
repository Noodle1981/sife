import { Building, Mail, Phone, User } from "lucide-react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
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
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Nombre del Directivo / Administrador</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} size={18} />
                  <input type="text" id="name" className={styles.input} placeholder="Ej. María Fernández" required />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="school" className={styles.label}>Nombre de la Institución</label>
                <div className={styles.inputWrapper}>
                  <Building className={styles.inputIcon} size={18} />
                  <input type="text" id="school" className={styles.input} placeholder="Ej. Colegio San José" required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Correo Institucional</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={18} />
                    <input type="email" id="email" className={styles.input} placeholder="direccion@colegio.edu.ar" required />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>Teléfono de Contacto</label>
                  <div className={styles.inputWrapper}>
                    <Phone className={styles.inputIcon} size={18} />
                    <input type="tel" id="phone" className={styles.input} placeholder="+54 264 123 4567" required />
                  </div>
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                Solicitar Demostración Gratuita
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
