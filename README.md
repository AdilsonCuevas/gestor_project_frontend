# gestion de proyectos - Frontend (Next.js)

en esta version se trabajara del lado del cliente utilizando la mejor forma de interaccion con el aplicativo

---

## Tabla de Contenidos

- [Tecnologías](#1-tecnologías)
- [arquitectura](#2-arquitectura)
- [Getting Started](#3-Getting Started)
- [Learn More](#4-Learn More)
- [Deploy on Vercel](#5-Deploy on Vercel)

---

## 1. Tecnologías

Este proyecto de backend está construido con las siguientes tecnologías:

- **Framework**: Next.js
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Gestión de estado:** [React Context/Zustand] (indica el que usas)
- **Manejo de Cookies**: js-cookie

---

## 2 arquitectura
```bash
gestor_project_frontend/
│
├── public/                  # Archivos estáticos (imágenes, favicon, etc.)
│
├── src/                     # Código fuente principal
│   ├── app/                 # Rutas de la aplicación (App Router de Next.js 13+)
│   │   ├── layout.tsx       # Layout raíz
│   │   ├── page.tsx         # Página principal
│   │   ├── login/           # Página de login
│   │   ├── dashboard/       # Módulo de dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── users/       # Submódulo usuarios
│   │   │   └── projects/    # Submódulo proyectos
│   │
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Botones, inputs, modales...
│   │   ├── layout/          # Header, sidebar, footer...
│   │   ├── forms/           # Formularios reutilizables
│   │   └── tables/          # Componentes de tablas
│   │   └── canva/          # Componentes de tablas
│   │          └──calendario/
│   │          └──card
│   │          └──board
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts
│   │
│   │
│   ├── services/            # Servicios para interactuar con el backend (users, projects, auth)
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── projectService.ts
│   │
│   ├── store/               # Contextos globales o Zustand, Redux, etc.
│   │   └── authContext.tsx
│   │
│   │
│   └── styles/              # Archivos de estilos globales
│       └── globals.css
│
├── .env.local               # Variables de entorno
├── tailwind.config.ts       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
├── next.config.js           # Configuración de Next.js
└── package.json

```

## 3. Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 4. Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 5. Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
