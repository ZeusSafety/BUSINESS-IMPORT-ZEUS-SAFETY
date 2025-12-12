# Zeus Safety Next

Aplicación web moderna para la venta de Equipos de Protección Personal (EPP) y Seguridad Industrial.

## 🚀 Tecnologías

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **Zustand**
- **Lucide React**

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚢 Despliegue en GitHub Pages

### Configuración Inicial

1. **Habilita GitHub Pages en tu repositorio:**
   - Ve a Settings → Pages
   - En "Source", selecciona "GitHub Actions"

2. **El workflow se ejecutará automáticamente** cuando hagas push a `main` o `master`

3. **URL de despliegue:**
   - Si tu repo es `usuario/BUSINESS-IMPORT-ZEUS-SAFETY`, la URL será:
   - `https://usuario.github.io/BUSINESS-IMPORT-ZEUS-SAFETY/`

### Configuración Manual del BasePath

Si necesitas cambiar el nombre del repositorio o el basePath, edita `next.config.ts`:

```typescript
const basePath = "/TU-NOMBRE-DE-REPO";
```

### Build Local para Probar

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `out/`.

## 📝 Notas

- El proyecto está configurado para export estático (`output: 'export'`)
- Las imágenes están desoptimizadas para compatibilidad con GitHub Pages
- El archivo `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll
