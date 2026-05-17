"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  ArrowUpRight,
  Wallet,
  Calendar,
  Banknote,
  FileText,
  X,
  CreditCard,
  Building,
  User,
  Hash
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import styles from "../../admin/dashboard/dashboard.module.css";

export default function SchoolFinancesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'debt'>('overview');
  
  // Estados de datos
  const [students, setStudents] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados del modal de cobro manual
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedPaymentId, setSelectedPaymentId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia' | 'mercadopago' | 'tarjeta'>('efectivo');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch inicial
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: studentsData } = await supabase.from('students').select('*');
      const { data: paymentsData } = await supabase.from('payments').select('*');
      setStudents(studentsData || []);
      setPayments(paymentsData || []);
    } catch (err) {
      console.error("Error fetching finances data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Procesa e imputa cobro manual
  const handleRegisterPayment = async () => {
    if (!selectedPaymentId) return;
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('payments')
        .update({ status: 'paid' })
        .eq('id', selectedPaymentId);

      if (error) throw error;
      
      setSuccessMessage('El cobro ha sido registrado y conciliado con éxito en el sistema SIFE.');
      
      // Recargar datos locales
      await fetchData();
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage(null);
        setSelectedStudentId('');
        setSelectedPaymentId('');
        setReceiptNumber('');
        setStudentSearchQuery('');
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Error al registrar el cobro en el sistema.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrado de cuotas pendientes para el alumno seleccionado
  const studentPendingPayments = payments.filter(
    p => p.student_id === selectedStudentId && p.status === 'pending'
  );

  const activeStudent = students.find(s => s.id === selectedStudentId);
  const activePayment = payments.find(p => p.id === selectedPaymentId);

  // Cálculo de estadísticas basadas en base de datos real
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);

  const stats = [
    { title: "Recaudación Total SIFE", value: `$${totalPaid.toLocaleString('es-AR')}`, change: "Conciliado Real", icon: TrendingUp, color: "#10b981" },
    { title: "Pendiente de Cobro", value: `$${totalPending.toLocaleString('es-AR')}`, change: "Pendiente Familiar", icon: AlertCircle, color: "#ef4444" },
    { title: "Alumnos Registrados", value: `${students.length}`, change: "Matrícula Activa", icon: Clock, color: "#f59e0b" },
    { title: "Créditos de Caja", value: "$45.600", change: "Saldo a favor", icon: Wallet, color: "#6366f1" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión Financiera Institucional</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Control de recaudación, morosidad y conciliación bancaria automática.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => alert("Simulando exportación de reporte XLS/PDF...")}>
            <FileText size={18} />
            Exportar Reporte
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
            <Banknote size={18} />
            Registrar Cobro Manual
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border)', 
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.title}
                </span>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.02em', margin: '0.125rem 0' }}>
                  {stat.value}
                </span>
                <span style={{ 
                  fontSize: '0.6875rem', 
                  fontWeight: 700, 
                  color: stat.color,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {stat.change}
                </span>
              </div>
              <div style={{ 
                backgroundColor: `${stat.color}15`, 
                padding: '0.75rem', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={24} color={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeTab === 'overview' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'overview' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          Vista General
        </button>
        <button 
          onClick={() => setActiveTab('payments')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeTab === 'payments' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'payments' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          Pagos y Conciliación
        </button>
        <button 
          onClick={() => setActiveTab('debt')}
          style={{ 
            padding: '0.75rem 0', fontWeight: 600, fontSize: '0.875rem',
            color: activeTab === 'debt' ? '#286DE1' : 'var(--text-muted)',
            borderBottom: activeTab === 'debt' ? '2px solid #286DE1' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          Monitor de Morosidad
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Recent Activity */}
          <div className={styles.sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Últimos Movimientos</h3>
              <button onClick={() => setActiveTab('payments')} style={{ color: '#286DE1', fontSize: '0.815rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todos
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: "Familia Olivera", desc: "Cuota Junio - 1° Grado A", amount: "$65.000", type: 'in', date: "Hoy, 10:45", method: "Transferencia (Conciliado)" },
                { name: "Familia García", desc: "Taller Ajedrez", amount: "$8.000", type: 'in', date: "Hoy, 09:12", method: "Mercado Pago (Auto)" },
                { name: "Familia Rodríguez", desc: "Reserva Viaje de Estudios", amount: "$150.000", type: 'pending', date: "Ayer", method: "Transferencia (Pendiente)" },
                { name: "Ventanilla", desc: "Cobro Efectivo - Varios", amount: "$45.000", type: 'in', date: "Ayer", method: "Efectivo" },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ 
                    padding: '0.5rem', borderRadius: '10px', 
                    backgroundColor: item.type === 'in' ? '#f0fdf4' : '#fffbeb'
                  }}>
                    {item.type === 'in' ? <ArrowUpRight size={20} color="#10b981" /> : <Clock size={20} color="#f59e0b" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc} • <span style={{ fontWeight: 600 }}>{item.method}</span></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: item.type === 'in' ? '#1e293b' : '#f59e0b' }}>{item.amount}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projection / Quick Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.sectionCard} style={{ backgroundColor: '#286DE1', color: 'white' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Proyección Cierre</h3>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>$3.120.000</div>
              <p style={{ fontSize: '0.815rem', opacity: 0.9, lineHeight: 1.5 }}>
                Estimado basado en cuotas asignadas y tendencia de pago histórica del 85%.
              </p>
              <div style={{ marginTop: '1.5rem', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                <div style={{ width: '78%', height: '100%', backgroundColor: 'white', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                <span>78% Recaudado</span>
                <span>Objetivo: $4.0M</span>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem', color: '#64748b', textTransform: 'uppercase' }}>Distribución de Cobranza</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                {[
                  { name: "Transf. CBU/CVU", desc: "Bancos, Ualá, Naranja X (Alias)", percent: "55%", icon: Building, color: "#2563eb" },
                  { name: "Botón QR / MP", desc: "Mercado Pago y Billeteras", percent: "20%", icon: Wallet, color: "#f59e0b" },
                  { name: "Tarjetas Posnet", desc: "Posnet Físico en Escuela", percent: "15%", icon: CreditCard, color: "#6366f1" },
                  { name: "Efectivo Caja", desc: "Ventanilla escolar", percent: "10%", icon: Banknote, color: "#10b981" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <div style={{ 
                        padding: '0.5rem', 
                        borderRadius: '10px', 
                        backgroundColor: `${item.color}15`, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={18} color={item.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--foreground)' }}>{item.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--foreground)', fontWeight: 800 }}>{item.percent}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREMIUM: REGISTRAR COBRO MANUAL (ADAPTADO AL MODAL DEL PADRE) */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div style={{ 
            backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', 
            width: '90%', maxWidth: '580px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative'
          }}>
            {/* Botón Cerrar */}
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setSuccessMessage(null);
                setSelectedStudentId('');
                setSelectedPaymentId('');
                setReceiptNumber('');
                setStudentSearchQuery('');
              }}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>

            {/* Header del Modal */}
            <div>
              <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 800, color: '#2563eb', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                ADMINISTRACIÓN SIFE
              </span>
              <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--foreground)' }}>Registrar Cobro Manual (Ventanilla / Banco)</h3>
            </div>

            {/* Pantalla de Éxito */}
            {successMessage ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem 0', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#ecfdf5', color: '#10b981', padding: '1rem', borderRadius: '9999px', animation: 'scaleUp 0.3s ease-out' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '1.125rem', color: '#065f46' }}>¡Cobro Registrado!</h4>
                <p style={{ fontSize: '0.875rem', color: '#047857', maxWidth: '320px', lineHeight: 1.5 }}>
                  {successMessage}
                </p>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes scaleUp {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                `}} />
              </div>
            ) : (
              <>
                {/* Doble Columna de Resumen (Exactamente como el del Padre) */}
                {activePayment && activeStudent && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Concepto asignado a {activeStudent.first_name}</span>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.125rem' }}>{activePayment.concept_name}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total a cobrar</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#2563eb', marginTop: '0.125rem' }}>
                        ${activePayment.amount.toLocaleString('es-AR')}
                      </h4>
                    </div>
                  </div>
                )}

                {/* Formulario */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Selector de Alumno con Búsqueda Premium */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <User size={14} color="#64748b" /> Buscar Alumno (Nombre, DNI, Grado o Nivel)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Ej. 48.789.012, Primaria, 1° Grado, Matías..."
                        value={studentSearchQuery}
                        onChange={(e) => setStudentSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.75rem 0.75rem 2.25rem',
                          borderRadius: '0.75rem',
                          border: '1px solid var(--border)',
                          fontSize: '0.875rem',
                          outline: 'none',
                          fontWeight: 600,
                          backgroundColor: '#f8fafc'
                        }}
                      />
                    </div>

                    {/* Caja de Resultados Desplazable */}
                    <div style={{ 
                      maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.375rem', 
                      padding: '0.375rem', border: '1px solid var(--border)', borderRadius: '0.75rem', backgroundColor: '#f8fafc' 
                    }}>
                      {students.filter(s => {
                        const q = studentSearchQuery.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          s.first_name.toLowerCase().includes(q) ||
                          s.last_name.toLowerCase().includes(q) ||
                          s.dni.includes(q) ||
                          s.course_name.toLowerCase().includes(q)
                        );
                      }).length > 0 ? (
                        students.filter(s => {
                          const q = studentSearchQuery.toLowerCase().trim();
                          if (!q) return true;
                          return (
                            s.first_name.toLowerCase().includes(q) ||
                            s.last_name.toLowerCase().includes(q) ||
                            s.dni.includes(q) ||
                            s.course_name.toLowerCase().includes(q)
                          );
                        }).map(s => {
                          const isSelected = s.id === selectedStudentId;
                          const isInicial = s.course_name.toLowerCase().includes('inicial');
                          const isPrimaria = s.course_name.toLowerCase().includes('primaria');
                          
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => {
                                setSelectedStudentId(s.id);
                                setSelectedPaymentId('');
                              }}
                              style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0.625rem 0.875rem', borderRadius: '0.5rem',
                                border: isSelected ? '1px solid #2563eb' : '1px solid transparent',
                                backgroundColor: isSelected ? '#eff6ff' : 'white',
                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease',
                                boxShadow: isSelected ? '0 1px 3px rgba(37, 99, 235, 0.1)' : 'none'
                              }}
                            >
                              <div>
                                <p style={{ fontWeight: 700, fontSize: '0.8125rem', color: isSelected ? '#1d4ed8' : 'var(--foreground)' }}>
                                  {s.first_name} {s.last_name}
                                </p>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                                  DNI: {s.dni}
                                </p>
                              </div>
                              <span style={{ 
                                fontSize: '0.5625rem', padding: '0.125rem 0.375rem', borderRadius: '0.375rem', fontWeight: 700,
                                backgroundColor: isInicial ? '#fff7ed' : isPrimaria ? '#eff6ff' : '#eef2ff',
                                color: isInicial ? '#c2410c' : isPrimaria ? '#1d4ed8' : '#4338ca'
                              }}>
                                {s.course_name.split(' - ')[1] || s.course_name}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          No se encontraron alumnos coincidentes.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selector de Arancel Pendiente */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CreditCard size={14} color="#64748b" /> Arancel Pendiente
                    </label>
                    <select
                      value={selectedPaymentId}
                      onChange={(e) => setSelectedPaymentId(e.target.value)}
                      disabled={!selectedStudentId || studentPendingPayments.length === 0}
                      style={{
                        width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)',
                        fontSize: '0.875rem', backgroundColor: selectedStudentId && studentPendingPayments.length > 0 ? 'white' : '#f1f5f9',
                        color: 'var(--foreground)', fontWeight: 600, outline: 'none'
                      }}
                    >
                      <option value="">-- Seleccionar Arancel Pendiente --</option>
                      {studentPendingPayments.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.concept_name} - ${p.amount.toLocaleString('es-AR')}
                        </option>
                      ))}
                    </select>
                    {selectedStudentId && studentPendingPayments.length === 0 && (
                      <span style={{ fontSize: '0.6875rem', color: '#10b981', fontWeight: 600, marginTop: '0.125rem' }}>
                        🎉 El alumno no tiene cuotas pendientes en el sistema.
                      </span>
                    )}
                  </div>

                  {/* Selector de Medio de Pago */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      Medio de Recepción
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('efectivo')}
                        style={{
                          padding: '0.625rem', borderRadius: '0.75rem',
                          border: paymentMethod === 'efectivo' ? '1px solid #2563eb' : '1px solid var(--border)',
                          backgroundColor: paymentMethod === 'efectivo' ? '#eff6ff' : 'white',
                          color: paymentMethod === 'efectivo' ? '#1d4ed8' : 'var(--text-muted)',
                          fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem'
                        }}
                      >
                        <Banknote size={16} /> 💵 Efectivo (Ventanilla)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('transferencia')}
                        style={{
                          padding: '0.625rem', borderRadius: '0.75rem',
                          border: paymentMethod === 'transferencia' ? '1px solid #2563eb' : '1px solid var(--border)',
                          backgroundColor: paymentMethod === 'transferencia' ? '#eff6ff' : 'white',
                          color: paymentMethod === 'transferencia' ? '#1d4ed8' : 'var(--text-muted)',
                          fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem'
                        }}
                      >
                        <Building size={16} /> 🏦 Transf. CBU / CVU
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('mercadopago')}
                        style={{
                          padding: '0.625rem', borderRadius: '0.75rem',
                          border: paymentMethod === 'mercadopago' ? '1px solid #2563eb' : '1px solid var(--border)',
                          backgroundColor: paymentMethod === 'mercadopago' ? '#eff6ff' : 'white',
                          color: paymentMethod === 'mercadopago' ? '#1d4ed8' : 'var(--text-muted)',
                          fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        📱 Botón / QR Digital
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('tarjeta')}
                        style={{
                          padding: '0.625rem', borderRadius: '0.75rem',
                          border: paymentMethod === 'tarjeta' ? '1px solid #2563eb' : '1px solid var(--border)',
                          backgroundColor: paymentMethod === 'tarjeta' ? '#eff6ff' : 'white',
                          color: paymentMethod === 'tarjeta' ? '#1d4ed8' : 'var(--text-muted)',
                          fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem'
                        }}
                      >
                        <CreditCard size={16} /> 💳 Tarjeta (Posnet)
                      </button>
                    </div>
                  </div>

                  {/* Número de Comprobante / Referencia */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Hash size={14} color="#64748b" /> Comprobante / Nota de Caja
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. REC-9874 o Transf. MP-98273"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      style={{
                        width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)',
                        fontSize: '0.875rem', outline: 'none', fontWeight: 500
                      }}
                    />
                  </div>
                </div>

                {/* Footer del Modal */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedStudentId('');
                      setSelectedPaymentId('');
                      setReceiptNumber('');
                    }}
                    style={{
                      padding: '0.75rem 1.5rem', backgroundColor: '#f1f5f9', border: 'none', color: '#64748b',
                      borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={!selectedPaymentId || isSubmitting}
                    onClick={handleRegisterPayment}
                    style={{
                      padding: '0.75rem 1.5rem', 
                      backgroundColor: selectedPaymentId ? '#0f172a' : '#cbd5e1', 
                      border: 'none', 
                      color: 'white',
                      borderRadius: '0.75rem', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      cursor: selectedPaymentId ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {isSubmitting ? 'Registrando...' : 'Registrar Cobro'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
