// Contenido de la landing (brief WhatsApp Marketing). Una sola fuente de copy.
// El theme de cada sección sigue la narrativa (no alternancia mecánica):
//   dark = momentos de peso (tesis, visión, problema, cierre); light = el resto.

import type { SectionTheme } from './ui/layout';

export interface ProseContent {
  kind: 'prose' | 'statement';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
}

export interface CardsContent {
  kind: 'cards';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  layout?: 'grid' | 'slider';
  cards: {
    title: string;
    desc: string;
    tag?: string;
    variant?: 'dark' | 'electric' | 'purple' | 'neutral'; // variantes reales de product-card
  }[];
}

export interface ChecklistContent {
  kind: 'checklist';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  intro?: string[];
  items: string[];
  marker?: 'check' | 'dot';
  outro?: string[];
  cta?: { label: string; href: string };
}

export interface AudienceContent {
  kind: 'audience';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  intro?: string; // lead corto en la columna izquierda
  items: string[]; // criterios "para ti si…" (lista con líneas)
}

export interface ManifestoContent {
  kind: 'manifesto';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  // Burbujas flotantes: preguntas de prospectos. El avatar y la posición los asigna el renderer.
  bubbles: { text: string; time: string; kind: 'in' | 'out' }[];
}

export interface InfoContent {
  kind: 'info';
  id?: string;
  theme: SectionTheme;
  scribble?: string; // eyebrow flotante (coral) tipo "scribble" de OSMO
  heading: string; // statement largo que responde la pregunta
  items: { title: string; desc: string }[]; // filas label (izq) + párrafo (der)
}

export interface FaqContent {
  kind: 'faq';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  items: { q: string; a: string }[];
}

export interface CtaContent {
  kind: 'cta';
  id?: string;
  theme: SectionTheme;
  heading: string;
  paragraphs?: string[];
  cta: { label: string; href: string };
  // Video de fondo hospedado en R2 (no se inlina: el bundle es público en jsDelivr).
  bgVideo?: { webm: string; mp4: string; poster: string };
}

export type SectionContent =
  | ProseContent
  | CardsContent
  | ChecklistContent
  | AudienceContent
  | ManifestoContent
  | InfoContent
  | FaqContent
  | CtaContent;

const WAITLIST = '#aa-waitlist';

// Base pública del bucket de Cloudflare R2. Los assets comparten la misma key base.
const R2_BASE = 'https://pub-09dc8675a13e4b6d9ff1f7e15d49ade2.r2.dev';
const CTA_VIDEO_KEY = 'bgvideoCTASectionATOMAcademy';

// Secciones entre el hero (#1) y el form (#13). Orden del brief.
export const SECTIONS: SectionContent[] = [
  {
    kind: 'manifesto',
    theme: 'light',
    eyebrow: 'El cambio',
    heading: '¿Por qué convertirte en WhatsApp Marketer?',
    // **…** marca palabras a resaltar (peso tipográfico) para reforzar la narrativa.
    paragraphs: [
      'Porque el marketing cambió. Antes, el desafío era generar tráfico. Después, fue generar leads. Hoy, el verdadero desafío es **convertir conversaciones**.',
      'Los usuarios ya no quieren llenar formularios y esperar. Quieren **escribir, recibir respuesta inmediata** y avanzar por WhatsApp.',
      'Pero para que eso funcione, no alcanza con “tener WhatsApp”. **Se necesita estrategia.**',
      'Un **WhatsApp Marketer** entiende cómo convertir ese canal en una **máquina de crecimiento**: conecta anuncios, mensajes, automatización, IA, CRM, datos y ventas en una experiencia que **realmente convierte**.',
    ],
    bubbles: [
      { kind: 'in', text: '¿Esto sirve si vendo por DM?', time: '11:58' },
      { kind: 'out', text: '¿Cuánto cuesta?', time: '11:59' },
      { kind: 'in', text: '¿Necesito saber de tecnología?', time: '11:59' },
      { kind: 'in', text: '¿En cuánto tiempo veo resultados?', time: '12:00' },
      { kind: 'out', text: '¿Funciona para mi tienda?', time: '12:00' },
      { kind: 'in', text: '¿Y si no sé de marketing?', time: '12:01' },
      { kind: 'in', text: '¿Da certificado?', time: '12:01' },
      { kind: 'out', text: '¿Sirve para agencias?', time: '12:02' },
      { kind: 'in', text: '¿Incluye plantillas?', time: '12:02' },
      { kind: 'in', text: '¿Hay cupo todavía?', time: '12:03' },
    ],
  },
  {
    kind: 'statement',
    id: 'aa-tesis',
    theme: 'dark',
    eyebrow: 'La tesis',
    heading: 'WhatsApp Marketing no es enviar mensajes. Es diseñar conversaciones que venden.',
    paragraphs: [
      'En esta formación vas a aprender cómo pensar WhatsApp como un canal estratégico dentro del funnel comercial. Desde el primer clic en una campaña hasta la calificación del lead, el seguimiento, la recuperación de oportunidades inactivas y la medición real de resultados.',
      'Porque cada conversación puede ser una venta. Pero solo si está diseñada para avanzar.',
    ],
  },
  {
    kind: 'cards',
    id: 'aa-programa',
    theme: 'dark',
    eyebrow: 'Programa',
    heading: 'Lo que vas a aprender',
    layout: 'slider',
    cards: [
      {
        variant: 'dark',
        tag: 'Base',
        title: 'Fundamentos',
        desc: 'Por qué WhatsApp es hoy uno de los canales clave de marketing y ventas en LATAM.',
      },
      {
        variant: 'electric',
        tag: 'Estrategia',
        title: 'Estrategia conversacional',
        desc: 'Journeys, flujos y mensajes que llevan al lead del interés a la compra.',
      },
      {
        variant: 'purple',
        tag: 'Captación',
        title: 'Click to WhatsApp',
        desc: 'Campañas que llevan al usuario directo a WhatsApp sin perder leads tras el primer mensaje.',
      },
      {
        variant: 'neutral',
        tag: 'IA',
        title: 'Automatización e IA',
        desc: 'IA para responder, calificar, agendar y recuperar leads sin perder personalización.',
      },
      {
        variant: 'dark',
        tag: 'Datos',
        title: 'Trazabilidad y datos',
        desc: 'Mide lo que pasa dentro de WhatsApp y conéctalo con tu CRM para optimizar campañas.',
      },
      {
        variant: 'electric',
        tag: 'Conversión',
        title: 'Optimización comercial',
        desc: 'Mejora tiempos de respuesta, prioriza leads y recupera oportunidades inactivas.',
      },
    ],
  },
  {
    kind: 'audience',
    theme: 'light',
    eyebrow: 'Para quién',
    heading: 'Esta formación es para ti si…',
    intro: 'El WhatsApp Marketing es para quienes viven entre el marketing y la venta, y quieren convertir mejor cada conversación.',
    items: [
      'Trabajas en marketing, ventas, growth, performance, CRM, lifecycle, customer experience o revenue.',
      'Gestionas campañas que llevan leads a WhatsApp.',
      'Quieres reducir la pérdida de oportunidades después del clic.',
      'Necesitas mejorar la conversión entre lead, conversación y venta.',
      'Buscas integrar WhatsApp con IA, automatización, CRM y datos.',
      'Quieres desarrollar una habilidad cada vez más importante para los equipos comerciales modernos.',
    ],
  },
  {
    kind: 'prose',
    theme: 'dark',
    eyebrow: 'La visión',
    heading: 'El nuevo rol que las empresas van a necesitar',
    paragraphs: [
      'Las empresas ya tienen especialistas en pauta. Especialistas en CRM. Especialistas en automatización. Especialistas en ventas.',
      'Pero entre el clic y la venta hay una zona crítica: la conversación. Ahí es donde nace el rol del WhatsApp Marketer.',
      'Una persona capaz de entender la estrategia, diseñar la experiencia, optimizar los mensajes, leer los datos y convertir WhatsApp en un canal de crecimiento.',
      'No se trata solo de responder más rápido. Se trata de vender mejor.',
    ],
  },
  {
    kind: 'info',
    theme: 'light',
    scribble: '¿Qué hace?',
    heading:
      'Un Experto en WhatsApp Marketing convierte conversaciones en crecimiento: diseña la experiencia, optimiza los mensajes y conecta cada chat con la estrategia comercial.',
    items: [
      {
        title: 'Diseña la conversación',
        desc: 'Crea journeys conversacionales y mensajes que califican, educan y convierten, llevando al lead del primer clic a la venta sin fricción.',
      },
      {
        title: 'Optimiza la captación',
        desc: 'Lanza y afina campañas Click to WhatsApp para que cada anuncio termine en una conversación real, sin perder leads en el camino.',
      },
      {
        title: 'Integra datos e IA',
        desc: 'Conecta WhatsApp con el CRM, la automatización y la IA para medir la conversión real y recuperar los leads que dejaron de responder.',
      },
      {
        title: 'Alinea marketing y ventas',
        desc: 'Hace que ambos equipos trabajen sobre el mismo canal, con más contexto y mejores resultados.',
      },
    ],
  },
  {
    kind: 'checklist',
    theme: 'dark',
    eyebrow: 'El problema',
    heading: 'De lead perdido a oportunidad convertida',
    intro: [
      'La mayoría de las empresas invierte en generar demanda, pero pierde oportunidades cuando el lead llega a WhatsApp.',
    ],
    marker: 'dot',
    items: [
      'Respuestas lentas.',
      'Mensajes sin contexto.',
      'Asesores saturados.',
      'Falta de seguimiento.',
      'Datos que no vuelven a las campañas.',
      'Leads interesados que nunca llegan a ventas.',
    ],
    outro: [
      'El WhatsApp Marketing existe para resolver ese problema.',
      'No se trata de generar más conversaciones. Se trata de convertir mejor las conversaciones que ya estás generando.',
    ],
  },
  {
    kind: 'prose',
    theme: 'light',
    eyebrow: 'Lanzamiento',
    heading: 'Lanzamiento en julio',
    paragraphs: [
      'La primera edición de la formación se lanza en julio. Durante esta etapa inicial, el acceso será exclusivo para las personas registradas en la lista de espera.',
      'Quienes se registren primero recibirán prioridad para acceder a la formación, conocer el programa completo y asegurar su lugar antes de la apertura general.',
    ],
    cta: { label: 'Regístrate en la lista de espera', href: WAITLIST },
  },
  {
    kind: 'prose',
    id: 'aa-generacion',
    theme: 'light',
    eyebrow: 'Primera generación',
    heading: 'Sé parte de la primera generación de Expertos en WhatsApp Marketing',
    paragraphs: [
      'WhatsApp ya es uno de los canales más importantes para conectar con clientes. La diferencia está en quién sabe usarlo estratégicamente.',
      'Aprende a convertir conversaciones en oportunidades reales de negocio y desarrolla una habilidad clave para el futuro del marketing, las ventas y la experiencia del cliente.',
    ],
    cta: { label: 'Quiero entrar a la lista de espera', href: WAITLIST },
  },
  {
    kind: 'faq',
    theme: 'light',
    eyebrow: 'Dudas',
    heading: 'Preguntas frecuentes',
    items: [
      { q: '¿Cuándo se lanza la formación?', a: 'La formación se lanza en julio.' },
      {
        q: '¿Quiénes podrán acceder primero?',
        a: 'En esta primera edición, el acceso será priorizado para las personas registradas en la lista de espera.',
      },
      {
        q: '¿Necesito experiencia previa en WhatsApp Business?',
        a: 'No necesariamente. La formación está pensada para profesionales de marketing, ventas, growth, CRM, performance y experiencia del cliente que quieran aprender a usar WhatsApp como canal estratégico de conversión.',
      },
      {
        q: '¿La formación es solo para equipos técnicos?',
        a: 'No. Está diseñada para perfiles de negocio que necesitan entender estrategia, automatización, IA, datos y conversión sin depender exclusivamente de conocimientos técnicos.',
      },
      {
        q: '¿Qué voy a lograr al finalizar?',
        a: 'Vas a entender cómo diseñar, implementar y optimizar estrategias de WhatsApp Marketing para captar, calificar, recuperar y convertir leads con mayor eficiencia.',
      },
    ],
  },
  {
    kind: 'cta',
    theme: 'dark',
    heading: 'El futuro del marketing no termina en el clic. Empieza en la conversación.',
    paragraphs: [
      'Regístrate en la lista de espera y sé parte de la primera formación para convertirte en Experto en WhatsApp Marketing.',
    ],
    cta: { label: 'Unirme a la lista de espera', href: WAITLIST },
    bgVideo: {
      webm: `${R2_BASE}/${CTA_VIDEO_KEY}.webm`,
      mp4: `${R2_BASE}/${CTA_VIDEO_KEY}.mp4`,
      poster: `${R2_BASE}/${CTA_VIDEO_KEY}.jpg`,
    },
  },
];
