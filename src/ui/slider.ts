// Slider draggable con inercia (GSAP Draggable + InertiaPlugin, sin dep nueva).
// El track se arrastra en X con momentum, acotado al overflow real del contenido.

import { Draggable } from './gsap-env';

export function initSliders(scope: Element): void {
  scope.querySelectorAll<HTMLElement>('[data-aa-slider]').forEach((slider) => {
    const track = slider.querySelector<HTMLElement>('[data-aa-slider-track]');
    if (!track) return;

    // El track se mueve hacia la izquierda (x negativo) para revelar el overflow.
    const bounds = (): { minX: number; maxX: number } => ({
      minX: Math.min(0, slider.clientWidth - track.scrollWidth),
      maxX: 0,
    });

    const instance = Draggable.create(track, {
      type: 'x',
      inertia: true,
      bounds: bounds(),
      edgeResistance: 0.9,
      dragResistance: 0.05,
      cursor: 'grab',
      activeCursor: 'grabbing',
      allowNativeTouchScrolling: true, // permite scroll vertical nativo en móvil
    })[0];

    const refresh = (): void => instance.applyBounds(bounds());
    window.addEventListener('resize', refresh);
    document.fonts?.ready?.then(refresh); // las fonts cambian el ancho del track
    requestAnimationFrame(refresh);
  });
}
