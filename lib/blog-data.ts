export type BlogPost = {
  slug: string;
  title: string;
  date: string; // DD/MM/YY
  excerpt: string;
  cover: string;
  images: string[];
  sections: {
    heading?: string;
    paragraphs?: string[];
    bullets?: { title: string; text: string }[];
    list?: string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'desgaste-epp-cuando-reemplazar',
    title: 'Desgaste del EPP: cuándo reemplazar antes de que falle',
    date: '05/08/26',
    excerpt:
      'El EPP no dura para siempre. Aprende a detectar señales de desgaste en guantes, cascos, calzado y arneses para evitar fallas en obra...',
    cover: '/blog/desgaste-blog.jpg',
    images: ['/blog/desgaste-blog.jpg'],
    sections: [
      {
        paragraphs: [
          'En minería, construcción y planta industrial, el equipo de protección personal trabaja bajo fricción, químicos, UV y golpes diarios. Un EPP desgastado deja de proteger aunque “todavía se vea usable”.',
          'En Zeus Safety recomendamos inspecciones visuales al inicio de cada turno y un criterio claro de retiro: si la protección ya no garantiza el nivel de norma, se reemplaza.',
        ],
      },
      {
        heading: 'Señales claras de retiro',
        bullets: [
          {
            title: 'Guantes:',
            text: 'rasgaduras, pérdida de recubrimiento, costuras abiertas o reducción de agarre.',
          },
          {
            title: 'Cascos:',
            text: 'grietas, decoloración severa por sol, arnés interno flojo o golpes previos.',
          },
          {
            title: 'Calzado:',
            text: 'suela lisa, punta deformada, costuras rotas o pérdida de impermeabilidad.',
          },
          {
            title: 'Arneses:',
            text: 'fibras deshilachadas, hebillas oxidadas, etiquetas ilegibles o cortes.',
          },
        ],
      },
      {
        heading: 'Buenas prácticas',
        list: [
          'Registra fecha de puesta en servicio del EPP crítico.',
          'Capacita al personal para reportar daños sin miedo a sanciones.',
          'Mantén stock de reposición para no improvisar con equipo vencido.',
        ],
      },
    ],
  },
  {
    slug: 'como-diferenciar-guantes-industriales',
    title: 'Cómo diferenciar guantes industriales según el riesgo',
    date: '28/07/26',
    excerpt:
      'No todos los guantes sirven para lo mismo. Corte, químico, calor o impacto exigen materiales y normas distintas...',
    cover: '/blog/diferenciar-guantes-1.jpg',
    images: [
      '/blog/diferenciar-guantes-1.jpg',
      '/blog/diferenciar-guantes-2.jpg',
      '/blog/diferenciar-guantes-3.jpg',
    ],
    sections: [
      {
        paragraphs: [
          'Elegir el guante correcto reduce accidentes y también costos: un modelo inadecuado se gasta rápido o no protege el riesgo real de la tarea.',
          'Empieza por mapear el peligro: corte, abrasión, pinchazo, químicos, calor o riesgos eléctricos. Luego valida norma y nivel de desempeño.',
        ],
      },
      {
        heading: 'Tipos frecuentes en industria',
        bullets: [
          {
            title: 'Anticorte:',
            text: 'fibras de alto rendimiento (HPPE, fibra de vidrio, etc.) con niveles ANSI/EN claros.',
          },
          {
            title: 'Químicos:',
            text: 'nitrilo, neopreno o PVC según compatibilidad con la sustancia.',
          },
          {
            title: 'Soldadura / calor:',
            text: 'cuero o materiales resistentes a chispas y temperatura.',
          },
          {
            title: 'Impacto:',
            text: 'refuerzos en dorso y nudillos para herramientas pesadas.',
          },
        ],
      },
      {
        heading: 'Checklist rápido de compra',
        list: [
          'Confirma talla y destreza: un guante flojo también es un riesgo.',
          'Revisa ficha técnica y certificación, no solo el color.',
          'Prueba agarre en condiciones reales (aceite, polvo, humedad).',
        ],
      },
    ],
  },
  {
    slug: 'frases-que-escuchamos-en-seguridad',
    title: 'Frases que escuchamos en seguridad… y por qué son peligrosas',
    date: '20/07/26',
    excerpt:
      '“Siempre lo hicimos así”, “es solo un minuto” o “no va a pasar nada”. Desmontamos las frases que normalizan el riesgo en planta...',
    cover: '/blog/frases-que-decimos-blog-1.jpg',
    images: [
      '/blog/frases-que-decimos-blog-1.jpg',
      '/blog/frases-que-decimos-blog-2.jpg',
      '/blog/frases-que-decimos-blog-3.jpg',
      '/blog/frases-que-decimos-blog-4.jpg',
      '/blog/frases-que-decimos-blog-5.jpg',
      '/blog/frases-que-decimos-blog-6.jpg',
    ],
    sections: [
      {
        paragraphs: [
          'La cultura de seguridad se construye con hábitos, no con carteles. Algunas frases parecen inofensivas, pero abren la puerta a omisiones que terminan en incidentes.',
          'En Zeus Safety trabajamos con equipos que quieren pasar de “cumplir por obligación” a “proteger porque es parte del trabajo bien hecho”.',
        ],
      },
      {
        heading: 'Frases a corregir en el equipo',
        bullets: [
          {
            title: '“Es solo un minuto”:',
            text: 'la mayoría de accidentes ocurren en tareas “rápidas” sin EPP.',
          },
          {
            title: '“Siempre lo hicimos así”:',
            text: 'la costumbre no reemplaza una evaluación de riesgo actualizada.',
          },
          {
            title: '“Eso es exagerado”:',
            text: 'minimizar el riesgo suele aparecer justo antes de un casi-accidente.',
          },
          {
            title: '“El casco molesta”:',
            text: 'si molesta, ajusta o cambia el modelo; no dejes de usarlo.',
          },
        ],
      },
      {
        heading: 'Cómo responder desde liderazgo',
        list: [
          'Reconoce el esfuerzo y corrige el comportamiento, no a la persona.',
          'Muestra el “por qué” con ejemplos reales de la operación.',
          'Facilita EPP cómodo y disponible: la fricción baja el cumplimiento.',
        ],
      },
    ],
  },
  {
    slug: 'ignorarlo-hoy-cuesta-manana',
    title: 'Ignorarlo hoy te cuesta mañana: el precio de postergar el EPP',
    date: '12/07/26',
    excerpt:
      'Aplazar la compra o el uso de protección personal no ahorra: traslada el costo a lesiones, paradas y multas. Te explicamos el impacto real...',
    cover: '/blog/ignorarlo-hoy-zeus.jpg',
    images: ['/blog/ignorarlo-hoy-zeus.jpg'],
    sections: [
      {
        paragraphs: [
          'Cuando una empresa posterga inversión en EPP, suele pensarlo como ahorro de caja. En la práctica, el costo se multiplica: días perdidos, rotación, investigaciones y daño reputacional.',
          'Zeus Safety acompaña a operaciones que prefieren prevenir con stock confiable, asesoría técnica y cotizaciones claras.',
        ],
      },
      {
        heading: 'Costos ocultos de no actuar',
        list: [
          'Paradas de línea por incidente o inspección.',
          'Reposición urgente a precio premium.',
          'Pérdida de productividad por personal lesionado o desmotivado.',
        ],
      },
      {
        heading: 'Qué hacer esta semana',
        bullets: [
          {
            title: 'Audita:',
            text: 'revisa EPP vencido, incompleto o sin ficha técnica.',
          },
          {
            title: 'Prioriza:',
            text: 'protege primero los riesgos de mayor severidad.',
          },
          {
            title: 'Cotiza:',
            text: 'arma tu pedido con cantidades reales de reposición.',
          },
        ],
      },
    ],
  },
  {
    slug: 'la-regla-del-y-si',
    title: 'La regla del “¿y si…?” para decidir protección en campo',
    date: '05/07/26',
    excerpt:
      'Antes de iniciar una tarea, pregúntate “¿y si falla?”. Esta regla simple ayuda a elegir el EPP correcto y evitar improvisaciones...',
    cover: '/blog/la-regla-y-si-blog.jpg',
    images: ['/blog/la-regla-y-si-blog.jpg'],
    sections: [
      {
        paragraphs: [
          'La pregunta “¿y si…?” obliga a pensar en el escenario peor razonable: ¿y si hay proyección?, ¿y si hay caída a distinto nivel?, ¿y si hay contacto químico?',
          'No se trata de alarmismo: es un método rápido de análisis de riesgo que cualquier supervisor puede aplicar en minutos.',
        ],
      },
      {
        heading: 'Ejemplos prácticos',
        bullets: [
          {
            title: '¿Y si hay chispas?',
            text: 'lentes con protección lateral y ropa adecuada.',
          },
          {
            title: '¿Y si hay corte?',
            text: 'guante con nivel de corte verificado, no “cualquier guante”.',
          },
          {
            title: '¿Y si hay trabajo en altura?',
            text: 'arnés inspeccionado, punto de anclaje y plan de rescate.',
          },
        ],
      },
      {
        heading: 'Implementación en tu equipo',
        list: [
          'Incluye la pregunta en el permiso de trabajo o charla de 5 minutos.',
          'Documenta la respuesta y el EPP seleccionado.',
          'Si no hay respuesta segura, no inicia la tarea.',
        ],
      },
    ],
  },
  {
    slug: 'linterna-minera-y-vision-segura',
    title: 'Linterna minera y visión segura en zonas de baja luminosidad',
    date: '28/06/26',
    excerpt:
      'En túneles y turnos nocturnos, ver bien es prevenir. Criterios para elegir iluminación personal compatible con casco y operación minera...',
    cover: '/blog/linterna-minera-blog.jpg',
    images: ['/blog/linterna-minera-blog.jpg'],
    sections: [
      {
        paragraphs: [
          'La iluminación personal no es un accesorio: es parte del sistema de seguridad cuando el entorno no garantiza luz suficiente o estable.',
          'Una buena linterna de casco debe ofrecer autonomía, haz adecuado, resistencia al impacto y montaje seguro sin interferir con el arnés del casco.',
        ],
      },
      {
        heading: 'Qué revisar antes de comprar',
        list: [
          'Compatibilidad con el casco de tu flota.',
          'Modos de luz (foco / flood) según la tarea.',
          'Resistencia a polvo, humedad y golpes típicos de mina.',
          'Facilidad de cambio de batería en campo.',
        ],
      },
      {
        heading: 'Consejo Zeus',
        paragraphs: [
          'Combina iluminación personal con señalización vial y ropa de alta visibilidad. La linterna ayuda a ver; la visibilidad ayuda a que te vean.',
        ],
      },
    ],
  },
  {
    slug: 'peligro-y-riesgo-no-es-lo-mismo',
    title: 'Peligro y riesgo no es lo mismo: diferencia clave en seguridad',
    date: '17/06/26',
    excerpt:
      'Confundir peligro con riesgo lleva a malas decisiones. Te explicamos la diferencia y cómo usarla para elegir EPP con criterio...',
    cover: '/blog/peligro-y-riesgo-no-es-lo-mismo-blog.jpg',
    images: [
      '/blog/peligro-rieso-blog.jpg',
      '/blog/peligro-y-riesgo-no-es-lo-mismo-blog.jpg',
    ],
    sections: [
      {
        paragraphs: [
          'El peligro es la fuente potencial de daño (una máquina, un químico, una altura). El riesgo es la probabilidad de que ese daño ocurra y su severidad, considerando controles existentes.',
          'Si solo hablamos de “peligro”, compramos EPP genérico. Si hablamos de “riesgo”, compramos la protección adecuada al escenario real.',
        ],
      },
      {
        heading: 'Cómo aplicar la diferencia',
        bullets: [
          {
            title: 'Identifica el peligro:',
            text: 'qué puede lastimar (corte, caída, inhalación, etc.).',
          },
          {
            title: 'Evalúa el riesgo:',
            text: 'qué tan probable y grave es en tu operación concreta.',
          },
          {
            title: 'Elige controles:',
            text: 'ingeniería + administrativos + EPP como última línea.',
          },
        ],
      },
      {
        heading: 'Ejemplo rápido',
        paragraphs: [
          'Una sierra es un peligro. El riesgo baja si hay resguardo, capacitación y guantes anticorte del nivel correcto. El EPP no elimina el peligro: reduce el riesgo residual.',
        ],
      },
    ],
  },
  {
    slug: 'porque-tantos-colores-de-guantes',
    title: '¿Por qué tantos colores de guantes? Guía práctica en planta',
    date: '10/06/26',
    excerpt:
      'El color no es solo estética: ayuda a codificar tareas, zonas y niveles de protección. Cómo usarlo a favor de tu operación...',
    cover: '/blog/porque-tantos-colores-guantes-blog.jpg',
    images: ['/blog/porque-tantos-colores-guantes-blog.jpg'],
    sections: [
      {
        paragraphs: [
          'En muchas plantas el color del guante se usa para diferenciar áreas (alimentos, mantenimiento, química) o para hacer visible el recambio.',
          'Ojo: el color no reemplaza la norma. Un guante rojo no es “más seguro” por sí solo; lo que importa es el nivel de corte, abrasión o compatibilidad química.',
        ],
      },
      {
        heading: 'Usos inteligentes del color',
        list: [
          'Codificar por área o turno para evitar cruces de contaminación.',
          'Facilitar supervisión visual del uso correcto.',
          'Separar tallas o modelos en almacén.',
        ],
      },
      {
        heading: 'Recomendación Zeus',
        paragraphs: [
          'Define un código de color interno y publícalo en el almacén. Luego cotiza modelos que cumplan norma y, además, respeten tu código visual.',
        ],
      },
    ],
  },
  {
    slug: 'zonas-del-cuerpo-a-proteger',
    title: 'Zonas del cuerpo a proteger: mapa rápido de EPP por exposición',
    date: '01/06/26',
    excerpt:
      'Cabeza, ojos, manos, pies, vías respiratorias y cuerpo: un mapa simple para no dejar huecos en tu programa de protección...',
    cover: '/blog/zonas-para-proteger-1.jpg',
    images: [
      '/blog/zonas-para-proteger-1.jpg',
      '/blog/zonas-para-proteger-2.jpg',
      '/blog/zonas-para-proteger-3.jpg',
      '/blog/zonas-para-proteger-4.jpg',
      '/blog/zonas-para-proteger-5.jpg',
    ],
    sections: [
      {
        paragraphs: [
          'Un programa de EPP incompleto suele fallar por “zonas olvidadas”: proteges la mano, pero no el ojo; o el casco, pero no la caída.',
          'Usa este mapa como checklist de supervisión y de cotización con Zeus Safety.',
        ],
      },
      {
        heading: 'Mapa por zona',
        bullets: [
          {
            title: 'Cabeza y cara:',
            text: 'casco, barbiquejo, careta según proyección.',
          },
          {
            title: 'Ojos:',
            text: 'lentes de seguridad con norma y protección lateral.',
          },
          {
            title: 'Manos:',
            text: 'guante según corte, químico, calor o impacto.',
          },
          {
            title: 'Pies:',
            text: 'calzado dieléctrico, puntera y suela según piso.',
          },
          {
            title: 'Respiratorio:',
            text: 'respirador y filtro correctos para el contaminante.',
          },
          {
            title: 'Cuerpo / altura:',
            text: 'ropa de alta visibilidad, arnés y líneas de vida.',
          },
        ],
      },
      {
        heading: 'Cómo armar tu pedido',
        list: [
          'Lista tareas críticas y zonas expuestas.',
          'Prioriza riesgos de alta severidad.',
          'Cotiza sets completos para no dejar huecos de protección.',
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecommendedPosts(slug: string, count = 3) {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}

export function formatBlogDate(date: string) {
  return `Publicado: ${date}`;
}
