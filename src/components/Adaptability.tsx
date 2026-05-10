import { Layers, Settings, Calendar, Puzzle, BellRing, CheckCircle2 } from "lucide-react";
import styles from "./Adaptability.module.css";

export default function Adaptability() {
  const items = [
    {
      icon: <Layers size={28} />,
      title: "Inscripciones y Cuotas por Niveles",
      description: "Adaptabilidad total de cobros según el nivel educativo y sala de cada alumno."
    },
    {
      icon: <Settings size={28} />,
      title: "Ajuste Dinámico de Aranceles",
      description: "Actualice valores y aranceles de forma masiva o individual con total facilidad."
    },
    {
      icon: <Calendar size={28} />,
      title: "Planes para Cuotas Vencidas",
      description: "Diseñe planes de pago personalizados para regularizar deudas y morosidad."
    },
    {
      icon: <Puzzle size={28} />,
      title: "Libertad en Cobros Especiales",
      description: "Gestione cobros para talleres, eventos, pedidos especiales y uniformes en segundos."
    },
    {
      icon: <BellRing size={28} />,
      title: "Sistema de Alertas y Retroactivos",
      description: "Control total de pagos realizados, morosidad y ajustes retroactivos automáticos."
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: "Portal de Padres e Interfaz Simple",
      description: "Transparencia total para las familias: descarga de recibos y estados de cuenta en tiempo real."
    }
  ];

  return (
    <section id="adaptability" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Adaptabilidad sin límites</h2>
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <div className={styles.textContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
