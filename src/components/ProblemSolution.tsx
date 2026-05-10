import { AlertTriangle, CheckCircle2, X, ArrowRight } from "lucide-react";
import styles from "./ProblemSolution.module.css";

export default function ProblemSolution() {
  const problems = [
    "Dependencia total de planillas de Excel desactualizadas.",
    "Padres enviando comprobantes por WhatsApp a toda hora.",
    "Horas perdidas conciliando transferencias bancarias a mano.",
    "Tensiones por tener que llamar a padres para recordar pagos.",
    "Falta de claridad en quién pagó qué concepto (talleres, cuota)."
  ];

  const solutions = [
    "Plataforma centralizada y actualizada en tiempo real.",
    "Conciliación automática vía API con medios de pago.",
    "Cero carga administrativa validando tickets o comprobantes.",
    "Recordatorios automáticos y amigables de vencimientos.",
    "Flexibilidad total para crear y asignar nuevos conceptos de cobro."
  ];

  return (
    <section id="solutions" className={`section ${styles.section}`}>
      <div className="container">


        <div className={styles.comparisonWrapper}>
          {/* Problem Card */}
          <div className={`${styles.card} ${styles.problemCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapperProblem}>
                <AlertTriangle size={24} className={styles.problemIcon} />
              </div>
              <h3>Antes de SIFE</h3>
            </div>
            <div className={styles.list}>
              {problems.map((text, i) => (
                <div key={i} className={styles.listItem}>
                  <div className={styles.listIconProblem}><X size={16} strokeWidth={3} /></div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transition Arrow (Desktop Only) */}
          <div className={styles.transitionArrow}>
            <ArrowRight size={32} />
          </div>

          {/* Solution Card */}
          <div className={`${styles.card} ${styles.solutionCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapperSolution}>
                <CheckCircle2 size={24} className={styles.solutionIcon} />
              </div>
              <h3 className={styles.solutionTitle}>Con SIFE</h3>
            </div>
            <div className={styles.list}>
              {solutions.map((text, i) => (
                <div key={i} className={`${styles.listItem} ${styles.listItemSolution}`}>
                  <div className={styles.listIconSolution}><CheckCircle2 size={18} strokeWidth={2.5} /></div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
