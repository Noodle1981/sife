"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Users, 
  Wallet, 
  Calculator,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ArrowUpRight,
  ChevronRight,
  FileText
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

interface InstitutionalFinance {
  id: string;
  name: string;
  installmentValue: number;
  paidStudents: number;
  totalStudents: number;
  totalRevenue: number;
  sifeCommission: number;
  lastUpdate: string;
  period: string;
}

export default function FinancesPage() {
  const [data, setData] = useState<InstitutionalFinance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando datos agregados por institución
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "Colegio San Martín",
          installmentValue: 45000,
          paidStudents: 450,
          totalStudents: 450,
          totalRevenue: 20250000,
          sifeCommission: 202500,
          lastUpdate: new Date().toISOString(),
          period: "Mayo 2026"
        },
        {
          id: "2",
          name: "Instituto Belgrano",
          installmentValue: 38000,
          paidStudents: 310,
          totalStudents: 350,
          totalRevenue: 11780000,
          sifeCommission: 117800,
          lastUpdate: new Date().toISOString(),
          period: "Mayo 2026"
        },
        {
          id: "3",
          name: "Escuela Sarmiento",
          installmentValue: 22000,
          paidStudents: 125,
          totalStudents: 130,
          totalRevenue: 2750000,
          sifeCommission: 27500,
          lastUpdate: new Date(Date.now() - 86400000).toISOString(),
          period: "Abril 2026"
        },
        {
          id: "4",
          name: "Colegio Santa Fe",
          installmentValue: 41000,
          paidStudents: 250,
          totalStudents: 280,
          totalRevenue: 10250000,
          sifeCommission: 102500,
          lastUpdate: new Date().toISOString(),
          period: "Mayo 2026"
        },
        {
          id: "5",
          name: "Instituto Tecnológico",
          installmentValue: 55000,
          paidStudents: 140,
          totalStudents: 150,
          totalRevenue: 7700000,
          sifeCommission: 77000,
          lastUpdate: new Date().toISOString(),
          period: "Mayo 2026"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const totalSifeRevenue = data.reduce((acc, curr) => acc + (Number(curr.sifeCommission) || 0), 0);
  const totalPaidStudents = data.reduce((acc, curr) => acc + (Number(curr.paidStudents) || 0), 0);
  const totalStudents = data.reduce((acc, curr) => acc + (Number(curr.totalStudents) || 0), 0);
  const totalGlobalRevenue = data.reduce((acc, curr) => acc + (Number(curr.totalRevenue) || 0), 0);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Métricas de Facturación SIFE</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary">
            Exportar Liquidación
          </button>
          <button className="btn-primary">
            <Wallet size={18} />
            Gestionar Cobros
          </button>
        </div>
      </header>

      {/* Global SIFE Metrics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ borderLeft: '4px solid #286DE1' }}>
          <div className={styles.statLabel}>Ganancia Total SIFE (1%)</div>
          <div className={styles.statValue} style={{ color: '#286DE1' }}>
            ${totalSifeRevenue.toLocaleString('es-AR')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
            <ArrowUpRight size={14} style={{ display: 'inline', marginRight: '2px' }} />
            +15.2% este mes
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Alumnos Pagos</div>
          <div className={styles.statValue}>
            {totalPaidStudents.toLocaleString()}
            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}> / {totalStudents.toLocaleString()}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Suscritos a través de SIFE</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Volumen Transaccionado</div>
          <div className={styles.statValue}>${((totalGlobalRevenue || 0) / 1000000).toFixed(1)}M</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Base imponible total</div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className={styles.sectionCard} style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className={styles.inputWrapper} style={{ flex: 1, minWidth: '200px' }}>
            <Search className={styles.inputIcon} size={18} />
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Buscar por institución..." 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} />
              Período: Mayo 2026
              <ChevronDown size={14} />
            </button>

            <button className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} />
              Filtros
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Breakdown Table */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>
          <Calculator size={20} />
          Desglose por Institución
        </h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Institución / Período</th>
                <th>Fecha de Cierre</th>
                <th>Valor Cuota</th>
                <th>Alumnos Pagos / Total</th>
                <th>Total Recaudado</th>
                <th style={{ backgroundColor: '#286DE1', color: 'white' }}>SIFE (1%)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Cargando datos financieros...</td></tr>
              ) : (
                data.map((inst) => (
                  <tr key={inst.id}>
                    <td>
                      <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Building2 size={16} color="#94a3b8" />
                        {inst.name || 'Sin nombre'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, marginLeft: '1.5rem' }}>
                        {inst.period || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {inst.lastUpdate && !isNaN(new Date(inst.lastUpdate).getTime()) ? new Date(inst.lastUpdate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>
                        ${(Number(inst.installmentValue) || 0).toLocaleString('es-AR')}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} color="#94a3b8" />
                        <span style={{ fontWeight: 600, color: inst.paidStudents === inst.totalStudents ? '#10b981' : '#f59e0b' }}>
                          {inst.paidStudents || 0}
                        </span>
                        <span style={{ color: '#94a3b8' }}>/ {inst.totalStudents || 0}</span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        {inst.totalStudents > 0 
                          ? Math.round(((inst.paidStudents || 0) / inst.totalStudents) * 100) 
                          : 0}% de efectividad
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>
                        ${(Number(inst.totalRevenue) || 0).toLocaleString('es-AR')}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#286DE1', backgroundColor: 'rgba(40, 109, 225, 0.05)' }}>
                      ${(Number(inst.sifeCommission) || 0).toLocaleString('es-AR')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ef4444', borderColor: '#fee2e2' }}>
                          <FileText size={14} />
                          Comprobantes
                        </button>
                        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          Detalle
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {!loading && (
              <tfoot style={{ backgroundColor: '#f8fafc', fontWeight: 700 }}>
                <tr>
                  <td colSpan={3} style={{ padding: '1rem' }}>TOTALES GLOBALES</td>
                  <td style={{ padding: '1rem' }}>
                    {totalPaidStudents} <span style={{ fontWeight: 400, color: '#64748b' }}>/ {totalStudents}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>${(totalGlobalRevenue || 0).toLocaleString('es-AR')}</td>
                  <td style={{ padding: '1rem', color: '#286DE1', fontSize: '1rem' }}>${(totalSifeRevenue || 0).toLocaleString('es-AR')}</td>
                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </section>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fefce8', border: '1px solid #fef08a', borderRadius: '8px', color: '#854d0e', fontSize: '0.875rem' }}>
        <strong>Nota de Negocio:</strong> SIFE factura a la escuela basándose en el 1% del volumen total de cuotas efectivamente cobradas a los alumnos. El ratio muestra cuántos alumnos del total de la matrícula ya han pagado.
      </div>
    </>
  );
}
