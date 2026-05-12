"use client";

import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CreditCard, 
  Settings, 
  LogOut
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard/dashboard.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Limpiar cookie de mock si existe
    document.cookie = "sb-mock-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/login";
  };

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/institutions", label: "Instituciones", icon: Building2 },
    { href: "/admin/leads", label: "Solicitudes (Leads)", icon: Users },
    { href: "/admin/finances", label: "Finanzas", icon: CreditCard },
    { href: "/admin/settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="SIFE Logo" width={40} height={40} />
          <span>SIFE Admin</span>
        </div>
        
        <nav className={styles.menu}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout} 
          className={styles.menuItem} 
          style={{ marginTop: 'auto', border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}
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
