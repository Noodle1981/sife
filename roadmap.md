# Roadmap SIFE - Sistema Inteligente de Facturación Escolar

## Etapa 1: Fundación, Captación y Súper Admin (El MVP) - COMPLETADA ✅
Antes de que los colegios operen, necesitas una forma de captarlos y darles acceso al sistema.
- **Landing Page y Captación**: Desarrollo de la página de inicio orientada a la conversión con estética premium.
- **Formulario de Captación**: Implementado con conexión a Supabase y validación de leads.
- **Panel Súper Admin (SIFE HQ)**: 
  - Dashboard ejecutivo con métricas de facturación (1% comisión).
  - Gestión de Leads (embudo de ventas).
  - Gestión de Instituciones (Alta, modalidades, estados).
  - Configuración global y permisos de administradores de escuela.

## Etapa 2: Estructura Institucional (Onboarding de la Escuela) - EN PROGRESO 🔄
Una vez que el colegio tiene su cuenta, el "Administrador de la Escuela" debe poder armar su estructura organizativa.
- **Gestión de Accesos**: El Administrador principal de la escuela puede crear otros usuarios administrativos y asignarles permisos.
- **Configuración de Niveles Educativos**: Capacidad de crear los niveles que mencionas: Inicial, Primaria, Secundaria, Técnica, Terciario o Superior.
- **Armado de Cursos y Materias**: Dentro de cada nivel, se crean los cursos (ej. 1er Año "A", Sala de 4, etc.).
- **Importación de Datos**: Desarrollo de la función para importar plantillas de Excel con los datos de los alumnos y cursos.

## Etapa 3: Gestión de la Comunidad (Alumnos y Familias)
- **Alta de Alumnos**: Se agregan los alumnos y se asignan a sus respectivos cursos.
- **Conexión con Padres/Tutores**: Generación automática de perfiles de responsables económicos.
- **Portal de Familias**: Vista personalizada para que padres vean la situación de sus hijos y realicen pagos.

## Etapa 4: Motor Financiero y Asignación de Cobros (El núcleo de SIFE)
- **Configuración de Conceptos de Cobro**: Definición de cuotas, inscripciones, materiales, talleres, etc.
- **Asignación de Deuda**: Vinculación de conceptos de cobro a alumnos o cursos completos.
- **Medios de Pago y Vínculo Bancario**: Integración con pasarelas de pago y validación de CBU/CVU.

## Etapa 5: Conciliación Automática y Dashboards Escolares
- **Conciliación Automática**: El sistema detecta los ingresos e impacta automáticamente el pago en el legajo del alumno.
- **Dashboard Institucional**: Vista personalizada para la administración escolar (recaudación, morosidad, estado de cuenta familiar).

## Etapa 6: Diferenciadores Clave (Escalabilidad y Fiscalidad)
- **Mesa de Ayuda Integrada**: Canal de soporte directo dentro de la plataforma.
- **Facturación Electrónica**: Integración con AFIP/Entes fiscales para emisión automática de facturas.
- **App Mobile**: Notificaciones push para recordatorios de pago y avisos institucionales.