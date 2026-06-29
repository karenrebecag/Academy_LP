// TY Page — overlay fijo que reemplaza la vista al enviar el form con éxito.
// Oculto por defecto; showThankYou() añade .is-visible para activarlo.

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

function hideThankYou(): void {
  const overlay = document.getElementById('aa-ty');
  if (!overlay) return;
  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden', 'true');
}

export function renderThankYou(root: Element): void {
  const overlay = document.createElement('div');
  overlay.className = 'aa-ty';
  overlay.id = 'aa-ty';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('role', 'status');

  const inner = document.createElement('div');
  inner.className = 'aa-ty__inner';

  const checkWrap = document.createElement('div');
  checkWrap.className = 'aa-ty__check';
  checkWrap.appendChild(buildCheckSvg());

  const eyebrow = renderEyebrow('Lista de espera · Confirmación');

  const heading = renderHeading({ size: 'xl', text: '¡Ya estás en la lista!', tag: 'h2' });

  const lead = renderParagraph({
    size: 'l',
    text: 'Serás de los primeros en enterarte cuando abra el acceso. Te avisamos por email antes del lanzamiento.',
    className: 'aa-text-balance',
  });

  const cta = renderButton({
    label: 'Explora más sobre Atomchat',
    href: 'https://atomchat.io/',
    variant: 'primary',
    target: '_blank',
  });

  const closeBtn = document.createElement('button');
  closeBtn.className = 'aa-ty__close';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  closeBtn.addEventListener('click', hideThankYou);

  inner.append(checkWrap, eyebrow, heading, lead, cta);
  overlay.append(closeBtn, inner);
  root.appendChild(overlay);
}

export function showThankYou(): void {
  const overlay = document.getElementById('aa-ty');
  if (!overlay) return;
  overlay.classList.add('is-visible');
  overlay.removeAttribute('aria-hidden');
}
