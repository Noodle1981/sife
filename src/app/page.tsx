import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProblemSolution from "@/components/ProblemSolution";
import Adaptability from "@/components/Adaptability";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.topSection}>
        <Hero />
      </div>
      <Features />
      <ProblemSolution />
      <Adaptability />
      <ContactForm />
      
      <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8", padding: "2rem 0", textAlign: "center", fontSize: "0.875rem" }}>
        <p>&copy; 2026 SIFE - Sistema Integral Financiero Educativo. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
