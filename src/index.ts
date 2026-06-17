// Entry point. Cada punto de montaje declara su configuración por atributos:
//   <div data-aa-mount
//        data-aa-theme="light|dark"
//        data-aa-lang="es|en"></div>
//
//   <script data-cfasync="false"
//     src="https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js"></script>
const _v = document.querySelector<HTMLScriptElement>('script[src*="Academy_LP@"]')?.src.match(/Academy_LP@([^/]+)/)?.[1] ?? 'dev';
console.log(`[academy-lp] v${_v} loaded`);

import { type Theme, type Lang } from './core/types';
import { initMotion } from './ui/motion';
import { initAccordion } from './ui/accordion';
import { initSmoothScroll, getLenis } from './ui/smooth-scroll';
import { initSliders } from './ui/slider';
import { initHeroChat } from './ui/hero-chat';
import { renderHero } from './sections/hero';
import { renderContentSections } from './sections/content-sections';
import { renderWaitlist } from './sections/waitlist';

// Scroll suave para anclas internas (#id). Usa Lenis si está activo; si no, nativo.
function initAnchorScroll(root: HTMLElement): void {
  root.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')?.slice(1);
    if (!id) return;
    const target = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!target) return;
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function resolveTheme(raw: string | undefined): Theme {
  return raw === 'dark' ? 'dark' : 'light';
}

function resolveLang(raw: string | undefined): Lang {
  return raw === 'en' ? 'en' : 'es';
}

function boot(): void {
  initSmoothScroll(); // smooth scroll global (Lenis + ScrollTrigger), una sola vez

  const mounts = document.querySelectorAll<HTMLElement>('[data-aa-mount]');
  mounts.forEach((mount) => {
    const theme = resolveTheme(mount.dataset.aaTheme);
    const lang = resolveLang(mount.dataset.aaLang);

    // Root wrapper — todo el CSS está scopeado a .aa-landing
    const root = document.createElement('div');
    root.className = 'aa-landing';
    root.setAttribute('data-aa-theme', theme);
    root.setAttribute('data-aa-lang', lang);

    // Cada sección se importa como módulo y recibe `root` como contenedor.
    renderHero(root);
    renderContentSections(root);
    renderWaitlist(root);

    mount.replaceChildren(root);
    initAnchorScroll(root);
    initAccordion(root);
    initSliders(root);
    initHeroChat(root);
    initMotion(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
