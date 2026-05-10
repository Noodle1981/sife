import { Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Desde que implementamos SIFE, la mora se redujo un 30% en los primeros tres meses. La automatización de la conciliación nos cambió la vida.",
      author: "María González",
      role: "Directora de Administración",
      institution: "Colegio San José"
    },
    {
      text: "La facilidad para que los padres paguen y la claridad de los reportes es lo que más valoramos. Un sistema pensado para la educación.",
      author: "Ricardo Torres",
      role: "Representante Legal",
      institution: "Instituto del Sol"
    },
    {
      text: "Excelente soporte y una plataforma intuitiva. Automatizar la facturación y los recordatorios nos ahorró horas de trabajo administrativo.",
      author: "Laura Martínez",
      role: "Coordinadora Administrativa",
      institution: "Escuela del Parque"
    }
  ];

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
          <p className={styles.subtitle}>
            Instituciones que ya transformaron su gestión financiera con SIFE.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.quoteIcon}>
                <Quote size={32} />
              </div>
              <p className={styles.text}>&quot;{t.text}&quot;</p>
              <div className={styles.authorInfo}>
                <div className={styles.author}>
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
                <div className={styles.institution}>{t.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
