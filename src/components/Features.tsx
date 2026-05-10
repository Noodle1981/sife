import { FileCheck, Zap, ShieldCheck } from "lucide-react";
import styles from "./Features.module.css";

export default function Features() {
  const features = [
    {
      icon: <FileCheck size={32} className={styles.icon} strokeWidth={1.5} />,
      title: "Conciliación Automática",
      description: "Conecte la cobranza vía API y olvídese de validar tickets manualmente."
    },
    {
      icon: <ShieldCheck size={32} className={styles.icon} strokeWidth={1.5} />,
      title: "Pagos Seguros",
      description: "Tenga visibilidad absoluta del estado financiero con trazabilidad total."
    },
    {
      icon: <Zap size={32} className={styles.icon} strokeWidth={1.5} />,
      title: "Flexibilidad Total",
      description: "Configure conceptos como cuotas, talleres y eventos en segundos."
    }
  ];

  return (
    <section id="features" className={styles.featuresSection}>


      <div className={`container ${styles.container}`}>
        <div className={styles.contentHeader}>
          <h2 className={styles.mainSectionTitle}>Soluciones SIFE</h2>
        </div>

        <div className={styles.benefitsCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardMainTitle}>Beneficios para la Institución</h3>
          </div>
          
          <div className={styles.grid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <div className={styles.iconWrapper}>{feature.icon}</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
