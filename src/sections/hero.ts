// Hero — estructura básica recreada del home-hero de OSMO: heading, subheading, buttons.
// Maquetación: content centrado en columna sobre bg con línea vertical central.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderButton } from '../ui/atoms/button';

export function renderHero(root: Element): void {
  const hero = document.createElement('section');
  hero.className = 'aa-hero';
  hero.setAttribute('data-aa-intro', ''); // anima al montar (no al hacer scroll)
  hero.setAttribute('data-aa-section-theme', 'light'); // strip claro

  // Spacer del nav (replica padding-hero "nav-large")
  const padding = document.createElement('div');
  padding.className = 'aa-hero__padding';

  // Background: línea vertical central
  const bg = document.createElement('div');
  bg.className = 'aa-hero__bg';
  const bgLine = document.createElement('div');
  bgLine.className = 'aa-hero__bg-line';
  bg.appendChild(bgLine);

  // Title row — heading
  const titleRow = document.createElement('div');
  titleRow.className = 'aa-hero__title-row';
  titleRow.appendChild(
    renderHeading({
      size: 'xl',
      text: 'Conviértete en Experto en WhatsApp Marketing',
      tag: 'h1',
      split: true,
      className: 'aa-text-balance',
    }),
  );

  // Description row — subheading
  const descriptionRow = document.createElement('div');
  descriptionRow.className = 'aa-hero__description-row';
  descriptionRow.setAttribute('data-aa-fade', '');
  descriptionRow.setAttribute('data-aa-delay', '0.2');
  descriptionRow.appendChild(
    renderParagraph({
      size: 'l',
      text: 'La primera formación para dominar el canal donde hoy se generan, califican y cierran más oportunidades.',
      className: 'aa-text-balance',
    }),
  );

  // Button row — CTA anclado al formulario de lista de espera
  const buttonRow = document.createElement('div');
  buttonRow.className = 'aa-hero__button-row';
  buttonRow.setAttribute('data-aa-fade', '');
  buttonRow.setAttribute('data-aa-delay', '0.35');
  buttonRow.append(
    renderButton({ label: 'Únete a la lista de espera', href: '#aa-waitlist', variant: 'primary' }),
  );

  // Content
  const content = document.createElement('div');
  content.className = 'aa-hero__content';
  content.append(titleRow, descriptionRow, buttonRow);

  const container = renderContainer({ size: 'm', children: [content] });

  hero.append(padding, bg, container);
  root.appendChild(hero);
}
