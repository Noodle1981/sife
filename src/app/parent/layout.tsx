'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Users, 
  CreditCard, 
  History, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap, 
  ShieldCheck
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from '../admin/dashboard/dashboard.module.css';

interface ParentLayoutProps {
  children: React.ReactNode;
}

export default function ParentLayout({ children }: ParentLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [parentName, setParentName] = useState('Carlos Ortega');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Intentar leer el usuario logueado en modo mock
    const userJson = localStorage.getItem('sb-mock-user');
    if (userJson) {
      try {
        const u = JSON.parse(userJson);
        if (u.email === 'carlos@colegio.edu.ar') {
          setParentName('Carlos Ortega');
        } else {
          setParentName(u.email.split('@')[0]);
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { name: 'Mi Familia', href: '/parent/dashboard', icon: Users },
    { name: 'Pagos y Cuotas', href: '/parent/payment', icon: CreditCard },
    { name: 'Historial', href: '/parent/history', icon: History }
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar - Desktop */}
      <aside className={styles.sidebar} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div className={styles.logo} style={{ marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#286DE1', padding: '0.5rem', borderRadius: '8px' }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>SIFE</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Portal de Familias</div>
            </div>
          </div>

          <nav className={styles.menu}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile / Logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Responsable Económico</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{parentName}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '0.125rem 0.5rem', borderRadius: '4px', fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={12} />
              Socio
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.8)', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#fca5a5'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            <LogOut size={14} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Mobile Navbar */}
        <header style={{ display: 'none', backgroundColor: '#233343', color: 'white', padding: '1rem', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#286DE1', padding: '0.375rem', borderRadius: '8px' }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1 }}>SIFE</div>
              <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Portal de Familias</div>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.375rem' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div style={{ display: 'none', backgroundColor: '#233343', color: 'white', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1rem', position: 'absolute', top: '3.5rem', left: 0, width: '100%', zIndex: 50, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '8px', 
                      fontSize: '0.875rem', 
                      fontWeight: isActive ? 700 : 500, 
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.8)', 
                      backgroundColor: isActive ? '#286DE1' : 'transparent',
                      textDecoration: 'none' 
                    }}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Tutor</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>{parentName}</div>
              </div>
              <button
                onClick={handleLogout}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 768px) {
          .${styles.sidebar} { display: none !important; }
          header { display: flex !important; }
          .md-hidden { display: block !important; }
        }
      `}} />
    </div>
  );
}
