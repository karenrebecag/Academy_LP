// Footer corporativo de ATOM adaptado al DS: tira de badges (partners/reviews),
// 4 columnas de links y barra inferior (logo + redes + dirección). Contenido reusado
// de atomchat.io; imágenes apuntan a sus URLs públicas. Sin FontAwesome (SVG inline).

import { renderContainer } from '../ui/layout';

interface Badge {
  src: string;
  alt: string;
  href: string;
  w: number;
  h: number;
}

interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

interface Social {
  name: string;
  href: string;
  icon: string; // SVG inline (24x24, currentColor)
}

const ATOM = 'https://atomchat.io';
const UP = `${ATOM}/wp-content/uploads`;
const G2 = 'https://www.g2.com/products/atomchat-io/reviews';
const HUBSPOT = 'https://ecosystem.hubspot.com/marketplace/apps/marketing/live-chat/atomchat-1053281';
const YOUTUBE = 'https://www.youtube.com/channel/UCvVlbyMlf5X_h-HvjoC14nA';

const BADGES: Badge[] = [
  { src: `${UP}/2023/08/MBP-Badge-Dark-backgrounds@1x.png`, alt: 'Meta Business Partner', href: 'https://www.facebook.com/business/partner-directory/search?solution_type=messaging&ref=pd_home_hero_cta&id=3701304469998183&section=overview', w: 388, h: 222 },
  { src: `${UP}/2023/05/High-Performer-Latin-America-Winter-2025-1.png`, alt: 'G2 High Performer Latin America', href: G2, w: 199, h: 222 },
  { src: `${UP}/2023/05/High-Performer-Small-Business_32025.png`, alt: 'G2 High Performer Small Business', href: G2, w: 199, h: 222 },
  { src: `${UP}/2023/05/High-Performer-Mid-Market_25.png`, alt: 'G2 High Performer Mid-Market', href: G2, w: 199, h: 222 },
  { src: `${UP}/2023/05/Momentum-Leader-sp-2025.png`, alt: 'G2 Momentum Leader', href: G2, w: 199, h: 222 },
  { src: `${UP}/2023/05/High-Performer-Spring-LATAM3.-png.png`, alt: 'G2 High Performer Spring LATAM', href: G2, w: 199, h: 222 },
  { src: `${UP}/2023/05/High-Performer-Small-Latam3.png`, alt: 'G2 High Performer Small Business LATAM', href: G2, w: 199, h: 222 },
  { src: `${UP}/2023/05/g2-users-love-us.webp`, alt: 'G2 users love us', href: G2, w: 199, h: 222 },
  { src: `${UP}/2024/05/score_hubspot_marketplace-e1726874629833.webp`, alt: 'HubSpot Marketplace score', href: HUBSPOT, w: 200, h: 154 },
  { src: `${UP}/2023/05/hubspot_solution_provider-e1726874685339.webp`, alt: 'HubSpot Solution Provider', href: HUBSPOT, w: 200, h: 172 },
];

const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Términos y Condiciones',
    links: [
      { label: 'Términos y condiciones', href: `${ATOM}/terminos-y-condiciones/` },
      { label: 'Política de privacidad', href: `${ATOM}/politica-de-privacidad/` },
      { label: 'Términos suscripción', href: `${ATOM}/terminos-de-suscripcion/` },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Acerca de Atom', href: `${ATOM}/acerca-de-nosotros/` },
      { label: 'Sitio en Inglés', href: `${ATOM}/en/` },
    ],
  },
  {
    title: 'Soporte',
    links: [{ label: 'Centro de Ayuda', href: 'https://soporte.atomchat.io' }],
  },
  {
    title: 'Comunidad',
    links: [
      { label: 'Blog', href: 'https://blog.atomchat.io/blog/' },
      { label: 'Tutoriales', href: YOUTUBE },
    ],
  },
];

const SOCIALS: Social[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/atomchat.io/',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z"/></svg>',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/atom_chat/',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z"/></svg>',
  },
  {
    name: 'YouTube',
    href: YOUTUBE,
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.5C0 8.39 0 12 0 12s0 3.61.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.61 24 12 24 12s0-3.61-.5-5.5ZM9.6 15.6V8.4l6.2 3.6Z"/></svg>',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/atomchat',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  },
];

const CHEVRON =
  '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>';

function buildBadges(): HTMLElement {
  const row = document.createElement('div');
  row.className = 'aa-footer__badges';
  row.setAttribute('data-aa-fade', '');
  BADGES.forEach((b) => {
    const a = document.createElement('a');
    a.className = 'aa-footer__badge';
    a.href = b.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    const img = document.createElement('img');
    img.src = b.src;
    img.alt = b.alt;
    img.width = b.w;
    img.height = b.h;
    img.loading = 'lazy';
    a.appendChild(img);
    row.appendChild(a);
  });
  return row;
}

function buildLinks(): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'aa-footer__links';
  grid.setAttribute('data-aa-fade', '');
  LINK_GROUPS.forEach((group) => {
    const col = document.createElement('div');
    col.className = 'aa-footer__col';

    const title = document.createElement('span');
    title.className = 'aa-footer__col-title';
    title.textContent = group.title;
    col.appendChild(title);

    const ul = document.createElement('ul');
    ul.className = 'aa-footer__list';
    group.links.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'aa-footer__link';
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const chev = document.createElement('span');
      chev.className = 'aa-footer__chev';
      chev.innerHTML = CHEVRON;
      const label = document.createElement('span');
      label.textContent = link.label;
      a.append(chev, label);
      li.appendChild(a);
      ul.appendChild(li);
    });
    col.appendChild(ul);
    grid.appendChild(col);
  });
  return grid;
}

function buildBottom(): HTMLElement {
  const bottom = document.createElement('div');
  bottom.className = 'aa-footer__bottom';
  bottom.setAttribute('data-aa-fade', '');

  const logo = document.createElement('img');
  logo.className = 'aa-footer__logo';
  logo.src = `${UP}/2021/02/logo-atom.png`;
  logo.alt = 'ATOM';
  logo.width = 150;
  logo.height = 38;
  logo.loading = 'lazy';

  const socials = document.createElement('div');
  socials.className = 'aa-footer__socials';
  SOCIALS.forEach((s) => {
    const a = document.createElement('a');
    a.className = 'aa-footer__social';
    a.href = s.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', s.name);
    a.innerHTML = s.icon;
    socials.appendChild(a);
  });

  const address = document.createElement('p');
  address.className = 'aa-footer__address';
  address.textContent = 'StreetMall Piso 1, oficina 303 San Francisco, Panamá';

  bottom.append(logo, socials, address);
  return bottom;
}

export function renderFooter(root: Element): void {
  const footer = document.createElement('footer');
  footer.className = 'aa-footer';
  footer.setAttribute('data-aa-section-theme', 'light');

  footer.appendChild(
    renderContainer({
      className: 'aa-container--card',
      children: [buildBadges(), buildLinks(), buildBottom()],
    }),
  );

  root.appendChild(footer);
}
