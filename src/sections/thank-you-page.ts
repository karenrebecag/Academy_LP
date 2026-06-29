// TY Page (standalone) — página completa de gracias servida en su propio mount
// (data-aa-ty-mount). Reusa tokens, tipografía, botón OSMO y el check del overlay,
// pero como sección en flujo normal: sin overlay fijo ni botón de cerrar.

import { renderEyebrow, renderHeading, renderParagraph } from '../ui/text';
import { renderButton } from '../ui/atoms/button';

function buildCheckSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M4 11.5L10 17.5L21 6.5');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-miterlimit', '10');

  svg.appendChild(path);
  return svg;
}

export function renderThankYouPage(root: Element): void {
  const section = document.createElement('section');
  section.className = 'aa-typage';

  // Reusa el inner del overlay para heredar layout, párrafo muted y margen del CTA.
  const inner = document.createElement('div');
  inner.className = 'aa-ty__inner';

  const checkWrap = document.createElement('div');
  checkWrap.className = 'aa-ty__check';
  checkWrap.appendChild(buildCheckSvg());

  const eyebrow = renderEyebrow('Lista de espera · Confirmación');

  const heading = renderHeading({ size: 'xl', text: '¡Ya estás en la lista!', tag: 'h1' });

  const lead = renderParagraph({
    size: 'l',
    text: 'Serás de los primeros en enterarte cuando abra el acceso. Te avisamos por email antes del lanzamiento.',
    className: 'aa-text-balance',
  });

  const cta = renderButton({
    label: 'Explora más sobre Atomchat',
    href: 'https://atomchat.io/',
    variant: 'primary',
  });

  inner.append(checkWrap, eyebrow, heading, lead, cta);
  section.appendChild(inner);
  root.appendChild(section);
}
