"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="SIFE Logo" width={96} height={96} className={styles.logoImage} priority />
        </Link>
        <div className={styles.links}>
          <Link href="#features">Características</Link>
          <Link href="#solutions">Soluciones</Link>
          <Link href="#adaptability">Adaptabilidad</Link>
        </div>
        <div className={styles.cta}>
          <button className="btn-primary">Solicitar Demo</button>
        </div>
      </div>
    </nav>
  );
}
