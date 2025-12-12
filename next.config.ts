import type { NextConfig } from "next";

// Configuración para GitHub Pages
// Si tu repo es "username/BUSINESS-IMPORT-ZEUS-SAFETY", el basePath sería "/BUSINESS-IMPORT-ZEUS-SAFETY"
// Si es un repo con nombre de usuario (username.github.io), deja basePath vacío
const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "BUSINESS-IMPORT-ZEUS-SAFETY";
const basePath = isProd ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true, // Requerido para export estático
  },
  trailingSlash: true,
};

export default nextConfig;
