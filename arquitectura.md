# Arquitectura Técnica - SIFE

## 1. Stack Tecnológico
- **Frontend:** React 19 + Next.js 15 (App Router).
- **Backend:** Node.js integrado mediante API Routes de Next.js.
- **Lenguaje:** TypeScript 5 (Tipado estricto en front y back).
- **Bundler:** Turbopack (Optimización de compilación en desarrollo).
- **Estilos:** Tailwind CSS (Arquitectura basada en utilidades).
- **Iconos:** Lucide React.

## 2. Estructura de Carpetas
```text
src/
├── app/               # Rutas y Layouts (Next.js App Router)
│   ├── api/           # Endpoints de Node.js (Backend)
│   └── layout.tsx     # Configuración global de la app
├── components/        # Componentes UI (Hero, Navbar, Features, etc.)
├── server/            # Lógica de negocio de Node.js
│   └── services/      # Servicios de backend independientes
├── types/             # Definiciones de TypeScript compartidas
└── services/          # Clientes de API y lógica de frontend
```

## 3. Decisiones Arquitectónicas
### Backend Integrado
Se optó por la **Opción 1: Next.js Integrated Architecture** para simplificar el despliegue y maximizar la velocidad de desarrollo. El backend corre sobre Node.js y se comunica con el frontend mediante API Routes estandarizadas.

### Separación de Lógica (Service Layer)
Para evitar que las rutas de la API se vuelvan complejas, se utiliza una capa de servicios en `src/server/services`. Esto permite:
- Reutilizar lógica de backend en diferentes rutas o Server Actions.
- Facilitar las pruebas unitarias de la lógica de negocio.

### Diseño de Componentes
Sigue un patrón de composición atómica donde la landing page (`page.tsx`) coordina componentes especializados situados en `src/components`.

## 4. Estrategia de Rendimiento
- **Streaming:** Uso de `loading.tsx` y Suspense para carga progresiva.
- **Turbopack:** Uso de compilación incremental para un ciclo de vida de desarrollo ultra-rápido.
- **Optimización de Assets:** Uso de `next/image` para el manejo de logos y capturas de pantalla.

## 5. Seguridad y Validación
- Validación de tipos en tiempo de compilación.
- Sanitización de inputs en API Routes.
- Manejo centralizado de errores mediante servicios de backend.
