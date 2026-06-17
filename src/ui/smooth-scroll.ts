// Smooth scroll — Lenis integrado con ScrollTrigger, igual que OSMO (initLenis).
// Singleton: el scroll suave es global a la página, no por instancia.

import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap-env';

let lenis: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({ lerp: 0.165, wheelMultiplier: 1.25 });

  // ScrollTrigger se actualiza con cada scroll de Lenis y Lenis corre en el ticker de GSAP.
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}
