export type Category =
  | "Protección Manual"
  | "Protección Visual"
  | "Protección Respiratoria"
  | "Protección de Cabeza"
  | "Protección Auditiva"
  | "Calzado de Seguridad";

export type Certification = "ANSI" | "ISO" | "EN" | "OSHA";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  brand: string;
  price: number;
  certification: Certification[];
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  tags?: string[];
};

export type Advisor = {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  avatar: string;
};

export const categories: Category[] = [
  "Protección Manual",
  "Protección Visual",
  "Protección Respiratoria",
  "Protección de Cabeza",
  "Protección Auditiva",
  "Calzado de Seguridad",
];

export const products: Product[] = [
  {
    id: "prd-001",
    name: "Guante Anticorte Nivel 5",
    slug: "guante-anticorte-n5",
    category: "Protección Manual",
    brand: "Zeus",
    price: 14.9,
    certification: ["ANSI", "EN"],
    description:
      "Guante de fibra HPPE con recubrimiento de nitrilo arenoso para máximo agarre en entornos aceitosos.",
    specs: [
      { label: "Tallas", value: "7, 8, 9, 10" },
      { label: "Recubrimiento", value: "Nitrilo arenoso" },
      { label: "Nivel de corte", value: "ANSI A5" },
    ],
    image: "/products/glove-cut5.jpg",
    tags: ["anticorte", "industria", "aceite"],
  },
  {
    id: "prd-002",
    name: "Gafa Panorámica Antiempañante",
    slug: "gafa-panoramica-premium",
    category: "Protección Visual",
    brand: "3M",
    price: 22.5,
    certification: ["ANSI"],
    description:
      "Lente panorámico con tratamiento antiempañante permanente y ventilación indirecta.",
    specs: [
      { label: "Material", value: "Policarbonato óptico" },
      { label: "Tratamiento", value: "Antiempañante / Anti-rayas" },
      { label: "Compatibilidad", value: "Respiradores de media cara" },
    ],
    image: "/products/goggle-pro.jpg",
  },
  {
    id: "prd-003",
    name: "Respirador Reutilizable Serie 700",
    slug: "respirador-reutilizable-700",
    category: "Protección Respiratoria",
    brand: "Zeus",
    price: 68.0,
    certification: ["ISO", "OSHA"],
    description:
      "Respirador de silicona premium con doble filtro y ajuste ergonómico para jornadas largas.",
    specs: [
      { label: "Tallas", value: "S, M, L" },
      { label: "Conexión", value: "Bayoneta universal" },
      { label: "Compatible", value: "Cartuchos P100 / OV" },
    ],
    image: "/products/respirator-700.jpg",
    tags: ["minería", "químicos"],
  },
  {
    id: "prd-004",
    name: "Casco Tipo II Dielectrico",
    slug: "casco-tipo-ii-diel",
    category: "Protección de Cabeza",
    brand: "CAT",
    price: 39.9,
    certification: ["ANSI"],
    description:
      "Casco de seguridad dieléctrico con suspensión ratchet y soporte para barboquejo.",
    specs: [
      { label: "Suspensión", value: "Ratchet 6 puntos" },
      { label: "Peso", value: "380 g" },
      { label: "Uso", value: "Trabajos eléctricos <20kV" },
    ],
    image: "/products/helmet-diel.jpg",
  },
  {
    id: "prd-005",
    name: "Bota Dielectrica Alta",
    slug: "bota-dielectrica-alta",
    category: "Calzado de Seguridad",
    brand: "Zeus",
    price: 82.5,
    certification: ["ISO", "EN"],
    description:
      "Bota dieléctrica de caña alta con puntera composite y suela bidensidad antideslizante.",
    specs: [
      { label: "Tallas", value: "38-44" },
      { label: "Puntera", value: "Composite" },
      { label: "Suela", value: "PU/TPU antideslizante" },
    ],
    image: "/products/boot-diel.jpg",
  },
  {
    id: "prd-006",
    name: "Guante Nitrilo ChemGuard",
    slug: "guante-nitrilo-chemguard",
    category: "Protección Manual",
    brand: "Mapa",
    price: 6.9,
    certification: ["EN"],
    description:
      "Guante de nitrilo largo para manejo de químicos y solventes con interior flocado.",
    specs: [
      { label: "Largo", value: "33 cm" },
      { label: "Espesor", value: "0.38 mm" },
      { label: "Textura", value: "Diamante" },
    ],
    image: "/products/glove-chem.jpg",
  },
  {
    id: "prd-007",
    name: "Tapón Auditivo Reutilizable",
    slug: "tapon-auditivo-reusable",
    category: "Protección Auditiva",
    brand: "3M",
    price: 3.8,
    certification: ["ANSI"],
    description:
      "Tapón con cordón y triple aleta para uso prolongado, fácil de limpiar y reusar.",
    specs: [
      { label: "NRR", value: "25 dB" },
      { label: "Material", value: "Silicona hipoalergénica" },
      { label: "Presentación", value: "Caja x 50 pares" },
    ],
    image: "/products/earplug.jpg",
  },
  {
    id: "prd-008",
    name: "Gafa Deportiva Polaris",
    slug: "gafa-deportiva-polaris",
    category: "Protección Visual",
    brand: "Zeus",
    price: 18.5,
    certification: ["ANSI"],
    description:
      "Lente deportivo con protección UV400 y patillas antideslizantes para trabajos en altura.",
    specs: [
      { label: "Lente", value: "Policarbonato espejo" },
      { label: "Peso", value: "24 g" },
      { label: "Protección", value: "UV 400" },
    ],
    image: "/products/glasses-polaris.jpg",
  },
  {
    id: "prd-009",
    name: "Arnés Anticaídas ProLine",
    slug: "arnes-proline-4p",
    category: "Protección de Cabeza",
    brand: "Zeus",
    price: 115.0,
    certification: ["ANSI", "ISO"],
    description:
      "Arnés de cuerpo completo con 4 puntos de anclaje y acolchado lumbar para trabajo en altura.",
    specs: [
      { label: "Anillos D", value: "Dorsal, frontal, laterales" },
      { label: "Tallas", value: "M/L, XL" },
      { label: "Capacidad", value: "140 kg" },
    ],
    image: "/products/harness-proline.jpg",
  },
  {
    id: "prd-010",
    name: "Filtro P100 Cartucho Dual",
    slug: "filtro-p100-dual",
    category: "Protección Respiratoria",
    brand: "Zeus",
    price: 12.0,
    certification: ["OSHA"],
    description:
      "Filtro P100 de baja resistencia para particulados finos, compatible con respiradores serie 700.",
    specs: [
      { label: "Eficiencia", value: "99.97%" },
      { label: "Compatibilidad", value: "Serie 700 y 900" },
      { label: "Presentación", value: "Caja x 20" },
    ],
    image: "/products/filter-p100.jpg",
  },
];

export const advisors: Advisor[] = [
  {
    id: "adv-01",
    name: "Mariana Torres",
    specialty: "Especialista en Minería",
    phone: "51999999991",
    avatar: "/advisors/mariana.jpg",
  },
  {
    id: "adv-02",
    name: "Luis Fernández",
    specialty: "Oil & Gas / Petroquímica",
    phone: "51999999992",
    avatar: "/advisors/luis.jpg",
  },
  {
    id: "adv-03",
    name: "Carla Rivas",
    specialty: "Construcción e Infraestructura",
    phone: "51999999993",
    avatar: "/advisors/carla.jpg",
  },
  {
    id: "adv-04",
    name: "Jorge Medina",
    specialty: "Sector Eléctrico y Utilities",
    phone: "51999999994",
    avatar: "/advisors/jorge.jpg",
  },
];

export const certifications = ["ANSI", "ISO", "OSHA", "EN"];


