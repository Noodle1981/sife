'use client';

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Upload, 
  FileText, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  QrCode,
  DollarSign
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    id: string;
    concept_name: string;
    amount: number;
    student_name: string;
  } | null;
  onPaymentSuccess: (paymentId: string) => void;
}

export default function PaymentModal({ isOpen, onClose, payment, onPaymentSuccess }: PaymentModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'mp' | 'cash'>('transfer');
  
  // Estados para la simulación del Bot de Conciliación SIFE
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0); // 0: Idle, 1: Lectura, 2: Validación, 3: Conciliado!
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen || !payment) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleSimulateTransfer = async () => {
    if (!file) {
      setUploadError('Por favor, adjunta un comprobante (imagen o PDF) para continuar.');
      return;
    }

    setIsUploading(true);
    setUploadStep(1); // Lectura del comprobante

    // Paso 1: Leyendo comprobante (1.2s)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setUploadStep(2); // Validación bancaria

    // Paso 2: Validando en Homebanking (1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUploadStep(3); // ¡Aprobado y Conciliado!

    // Paso 3: Completar conciliación (1s)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Llamar al callback de éxito para guardar en sife-db.json
    onPaymentSuccess(payment.id);
    
    // Resetear estados y cerrar
    setIsUploading(false);
    setUploadStep(0);
    setFile(null);
    onClose();
  };

  const handleSimulateMercadoPago = async () => {
    setIsUploading(true);
    setUploadStep(2); // Validación directa
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    onPaymentSuccess(payment.id);
    setIsUploading(false);
    setUploadStep(0);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '32rem', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc' }}>
          <div>
            <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, color: '#2563eb', letterSpacing: '0.05em' }}>Pago Seguro SIFE</span>
            <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', lineHeight: 1.25 }}>Procesar Pago Escolar</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ padding: '0.375rem', color: '#94a3b8', background: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: isUploading ? 'default' : 'pointer' }}
            disabled={isUploading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Info del Concepto */}
        <div style={{ padding: '1.25rem', backgroundColor: 'rgba(239, 246, 255, 0.5)', borderBottom: '1px solid #eff6ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Concepto asignado a {payment.student_name}</p>
            <p style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>{payment.concept_name}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: 500 }}>Total a pagar</span>
            <span style={{ fontSize: '1.125rem', fontWeight: 900, color: '#1d4ed8' }}>${payment.amount.toLocaleString('es-AR')}</span>
          </div>
        </div>

        {/* Selector de Método */}
        <div style={{ padding: '1.25rem', paddingBottom: 0, display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => !isUploading && setPaymentMethod('transfer')}
            style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: paymentMethod === 'transfer' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              backgroundColor: paymentMethod === 'transfer' ? 'rgba(239, 246, 255, 0.4)' : 'transparent',
              color: paymentMethod === 'transfer' ? '#1d4ed8' : '#475569',
              fontSize: '0.75rem', fontWeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', cursor: isUploading ? 'default' : 'pointer'
            }}
            disabled={isUploading}
          >
            <Upload size={16} />
            Transferencia
          </button>
          <button
            onClick={() => !isUploading && setPaymentMethod('mp')}
            style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: paymentMethod === 'mp' ? '1px solid #0ea5e9' : '1px solid #e2e8f0',
              backgroundColor: paymentMethod === 'mp' ? 'rgba(224, 242, 254, 0.3)' : 'transparent',
              color: paymentMethod === 'mp' ? '#0369a1' : '#475569',
              fontSize: '0.75rem', fontWeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', cursor: isUploading ? 'default' : 'pointer'
            }}
            disabled={isUploading}
          >
            <QrCode size={16} />
            Mercado Pago
          </button>
          <button
            onClick={() => !isUploading && setPaymentMethod('cash')}
            style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: paymentMethod === 'cash' ? '1px solid #94a3b8' : '1px solid #e2e8f0',
              backgroundColor: paymentMethod === 'cash' ? '#f8fafc' : 'transparent',
              color: paymentMethod === 'cash' ? '#0f172a' : '#475569',
              fontSize: '0.75rem', fontWeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', cursor: isUploading ? 'default' : 'pointer'
            }}
            disabled={isUploading}
          >
            <DollarSign size={16} />
            Ventanilla
          </button>
        </div>

        {/* Contenido Dinámico del Método */}
        <div style={{ padding: '1.25rem', flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* 1. Transferencia */}
          {paymentMethod === 'transfer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!isUploading ? (
                <>
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(226, 232, 240, 0.6)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <p style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      🏛️ Datos de Cuenta Escolar Autorizada
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                      <div>
                        <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>CBU</span>
                        <code style={{ color: '#1e293b', fontWeight: 700, fontFamily: 'monospace' }}>0000003100012345678901</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('0000003100012345678901', 'cbu')}
                        style={{ padding: '0.375rem', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', borderRadius: '0.375rem' }}
                      >
                        {copiedField === 'cbu' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                      <div>
                        <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>Alias CBU</span>
                        <span style={{ color: '#1e293b', fontWeight: 700 }}>colegio.sife.pagos</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('colegio.sife.pagos', 'alias')}
                        style={{ padding: '0.375rem', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', borderRadius: '0.375rem' }}
                      >
                        {copiedField === 'alias' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Drag and Drop Simulado */}
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                      Cargar Comprobante de Pago
                    </label>
                    <div style={{ position: 'relative', border: '2px dashed #cbd5e1', backgroundColor: 'rgba(248, 250, 252, 0.5)', borderRadius: '0.75rem', padding: '1.25rem', textAlign: 'center', cursor: 'pointer' }}>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf" 
                        onChange={handleFileChange}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                        <Upload size={28} color="#94a3b8" />
                        {file ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                            <FileText size={16} />
                            {file.name}
                          </div>
                        ) : (
                          <>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Arrastra o selecciona tu comprobante</span>
                            <span style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 500 }}>Soporta PDF o Imágenes (JPG, PNG)</span>
                          </>
                        )}
                      </div>
                    </div>
                    {uploadError && (
                      <p style={{ color: '#ef4444', fontSize: '0.625rem', fontWeight: 700, marginTop: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertCircle size={12} /> {uploadError}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ padding: '2rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div style={{ animation: 'spin 1s linear infinite' }}><Loader2 size={40} color="#2563eb" /></div>
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                  
                  {uploadStep === 1 && (
                    <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                      <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1e293b' }}>🤖 SIFE Bot: Escaneando comprobante...</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Extrayendo DNI, CBU de origen e importe por OCR...</p>
                    </div>
                  )}

                  {uploadStep === 2 && (
                    <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                      <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1d4ed8' }}>🔍 SIFE Bot: Validando en Homebanking...</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Cruzando datos con extractos automáticos COELSA...</p>
                    </div>
                  )}

                  {uploadStep === 3 && (
                    <div>
                      <div style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.625rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                        <ShieldCheck size={28} />
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#059669' }}>🎉 ¡Conciliación Aprobada al Instante!</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Pago imputado y saldo familiar actualizado en disco.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 2. Mercado Pago */}
          {paymentMethod === 'mp' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 0', textAlign: 'center', gap: '1rem' }}>
              {!isUploading ? (
                <>
                  <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.75rem', borderRadius: '9999px' }}>
                    <QrCode size={32} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>Pago Electrónico Inmediato</h4>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', maxWidth: '24rem' }}>
                      Se debitará automáticamente mediante saldo o tarjetas en tu cuenta de Mercado Pago con acreditación inmediata.
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                    <span>CVU Escolar</span>
                    <code style={{ fontFamily: 'monospace' }}>0000003100098765432109</code>
                  </div>
                </>
              ) : (
                <div style={{ padding: '1.5rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div style={{ animation: 'spin 1s linear infinite' }}><Loader2 size={40} color="#0284c7" /></div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0284c7', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>Conectando con Mercado Pago...</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Procesando débito e imputando fondos en SIFE...</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Efectivo */}
          {paymentMethod === 'cash' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.25rem 0', textAlign: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '0.75rem', borderRadius: '9999px' }}>
                <FileText size={32} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>Pago por Administración (Ventanilla)</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', maxWidth: '24rem' }}>
                  Acércate a la ventanilla escolar de Lunes a Viernes de 8:00 a 13:00 hs con el siguiente código familiar para efectuar tu pago en efectivo.
                </p>
              </div>
              
              {/* Código de barras simulado */}
              <div style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.75rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: '3rem', width: '100%', maxWidth: '280px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.25rem 0.375rem', borderRadius: '0.25rem', position: 'relative', overflow: 'hidden', opacity: 0.9, userSelect: 'none' }}>
                  {/* Líneas de código de barras */}
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        backgroundColor: 'white',
                        height: '100%',
                        width: `${Math.max(1, Math.floor(Math.random() * 4))}px`,
                        opacity: Math.random() > 0.15 ? 1 : 0
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.625rem', fontFamily: 'monospace', color: '#94a3b8', marginTop: '0.5rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                  *28345678-PAY-001*
                </span>
              </div>
            </div>
          )}

          {/* Footer de Acciones del Modal */}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              onClick={onClose}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: isUploading ? 'default' : 'pointer' }}
              disabled={isUploading}
            >
              Cancelar
            </button>
            {paymentMethod === 'transfer' && (
              <button
                onClick={handleSimulateTransfer}
                style={{ padding: '0.5rem 1rem', backgroundColor: isUploading ? '#60a5fa' : '#2563eb', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', border: 'none', cursor: isUploading ? 'default' : 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                disabled={isUploading}
              >
                {isUploading ? <><div style={{ animation: 'spin 1s linear infinite' }}><Loader2 size={14} /></div> Confirmando...</> : 'Confirmar Comprobante'}
              </button>
            )}
            {paymentMethod === 'mp' && (
              <button
                onClick={handleSimulateMercadoPago}
                style={{ padding: '0.5rem 1rem', backgroundColor: isUploading ? '#38bdf8' : '#0ea5e9', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', border: 'none', cursor: isUploading ? 'default' : 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                disabled={isUploading}
              >
                {isUploading ? <><div style={{ animation: 'spin 1s linear infinite' }}><Loader2 size={14} /></div> Procesando...</> : 'Pagar con Mercado Pago'}
              </button>
            )}
            {paymentMethod === 'cash' && (
              <button
                onClick={onClose}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#0f172a', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              >
                Cerrar y Descargar Cupón
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
