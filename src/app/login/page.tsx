"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // --- MOCK LOGIN PARA DESARROLLO ---
      if (email === "admin@example.com" && password === "password") {
        console.log("Mock login successful");
        document.cookie = "sb-mock-token=true; path=/";
        window.location.href = "/admin/dashboard";
        return;
      }
      // ----------------------------------

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Redirect or handle successful login
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError("Credenciales inválidas. Por favor, intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="SIFE Logo" 
              width={120} 
              height={120} 
              style={{ borderRadius: '12px' }}
            />
          </Link>
        </div>

        <h1 className={styles.title}>Bienvenido a SIFE</h1>
        <p className={styles.subtitle}>Gestión financiera escolar inteligente</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input 
                type="email" 
                id="email" 
                className={styles.input} 
                placeholder="usuario@colegio.edu.ar" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input 
                type="password" 
                id="password" 
                className={styles.input} 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.checkboxGroup}>
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <Link href="/forgot-password" className={styles.forgotLink}>
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Ingresando...
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                Ingresar al Sistema
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿No tiene una cuenta? Contacte a su administrador</p>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
