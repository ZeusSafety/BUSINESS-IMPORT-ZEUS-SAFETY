# Zeus Safety Next

Aplicación web moderna para la venta de Equipos de Protección Personal (EPP) y Seguridad Industrial.

## 🚀 Tecnologías

- **Next.js 16** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **Zustand**
- **Lucide React**

## 📦 Instalación

Este proyecto usa **pnpm** (no npm ni yarn).

```bash
corepack enable
pnpm install
```

## 🛠️ Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚢 Despliegue en Vercel

1. Crea una cuenta en Vercel y vincula tu repositorio de GitHub.
2. Importa el proyecto desde el dashboard de Vercel.
3. Vercel detectará automáticamente que es un proyecto **Next.js** con `pnpm-lock.yaml` y usará:
   - Comando de instalación: `pnpm install`
   - Comando de build: `pnpm build`
   - Directorio de salida: `.vercel/output` (manejado internamente por Vercel)
4. Cada push a la rama configurada (por defecto `main`) generará un nuevo despliegue.

Para probar localmente la build de producción:

```bash
pnpm build
pnpm start
```
