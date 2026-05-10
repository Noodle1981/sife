import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            <span className={styles.highlight}>Sistema Integral Financiero Educativo</span>
          </h1>
          <p className={styles.subtitle}>
            Abandona los procesos manuales con el sistema diseñado para instituciones educativas que sí automatiza tu conciliación, facturación y reportes.
          </p>
          <button className={`btn-primary ${styles.ctaButton}`}>
            Probá con un Aula completa gratis
          </button>
        </div>

        <div className={styles.visualContent}>
          <div className={styles.shapeDecoration}></div>

          <div className={styles.mainMockup}>
            <Image
              src="/hero-mockup.png"
              alt="Dashboard de SIFE"
              width={700}
              height={430}
              className={styles.dashboardImage}
              priority
            />
          </div>

          <div className={styles.overlapElement}>
            <div className={styles.overlapCard}>
              <span className={styles.overlapTitle}>Pagos Conciliados</span>
              <div className={styles.overlapData}>
                <span className={styles.overlapValue}>1,240</span>
                <span className={styles.overlapTrend}>↑ 15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
