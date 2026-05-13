"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  BookOpen, 
  CreditCard, 
  FileUp, 
  Settings, 
  LogOut,
  GraduationCap,
  Shield,
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../admin/dashboard/dashboard.module.css";

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-mock-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/login";
  };

  const mainMenuItems = [
    { href: "/school", label: "Dashboard", icon: LayoutDashboard },
    { href: "/school/levels", label: "Niveles y Estructura", icon: Layers },
    { href: "/school/courses", label: "Cursos y Talleres", icon: BookOpen },
    { href: "/school/students", label: "Alumnos y Familias", icon: Users },
    { href: "/school/finances", label: "Conceptos de Cobro", icon: CreditCard },
  ];

  const configMenuItems = [
    { href: "/school/users", label: "Usuarios y Permisos", icon: Shield },
    { href: "/school/import", label: "Importación Masiva", icon: FileUp },
    { href: "/school/settings", label: "Ajustes Generales", icon: Settings },
  ];

  const getLinkStyle = (href: string, isSubItem = false) => {
    const isActive = pathname === href || (href !== "/school" && pathname.startsWith(href));
    const isHovered = hoveredItem === href;
    
    return {
      fontSize: '0.815rem',
      backgroundColor: isActive ? '#0ea5e9' : isHovered ? '#1e293b' : 'transparent',
      color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
      padding: isSubItem ? '0.6rem 1rem' : '0.75rem 1rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    };
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar} style={{ backgroundColor: '#233343' }}>
        <div className={styles.logo}>
          <GraduationCap size={32} color="#38bdf8" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.1rem' }}>SIFE Escuela</span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 400 }}>Panel Institucional</span>
          </div>
        </div>
        
        <nav className={styles.menu}>
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={styles.menuItem}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                style={getLinkStyle(item.href)}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}

          {/* Collapsible Config Section */}
          <div style={{ marginTop: '0.5rem' }}>
            <button 
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className={styles.menuItem}
              onMouseEnter={() => setHoveredItem('config')}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ 
                width: '100%', border: 'none', background: 'none', cursor: 'pointer', 
                justifyContent: 'space-between', fontSize: '0.815rem',
                backgroundColor: hoveredItem === 'config' ? '#1e293b' : 'transparent',
                color: isConfigOpen || configMenuItems.some(i => pathname.startsWith(i.href)) ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Settings size={20} />
                Configuración
              </div>
              <ChevronDown size={16} style={{ transform: isConfigOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            
            {(isConfigOpen || configMenuItems.some(i => pathname.startsWith(i.href))) && (
              <div style={{ marginLeft: '1.5rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                {configMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className={styles.menuItem}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={getLinkStyle(item.href, true)}
                    >
                      <Icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <button 
          onClick={handleLogout} 
          className={styles.menuItem} 
          style={{ marginTop: 'auto', border: 'none', background: 'none', cursor: 'pointer', width: '100%', fontSize: '0.815rem' }}
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
