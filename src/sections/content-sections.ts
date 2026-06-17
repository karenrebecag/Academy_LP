// Renderers genéricos por tipo de sección + ensamblado en orden desde content.ts.
// Reutiliza el lenguaje OSMO: container/section, headings con SplitText, reveals,
// card grid (playful-cards), checklist y accordion.

import { renderSection, renderContainer, renderGrid, type ContainerSize } from '../ui/layout';
import { renderEyebrow, renderHeading, renderParagraph } from '../ui/text';
import { renderButton } from '../ui/atoms/button';
import { renderAccordion } from '../ui/accordion';
import {
  SECTIONS,
  type SectionContent,
  type ProseContent,
  type CardsContent,
  type ChecklistContent,
  type InfoContent,
  type FaqContent,
  type CtaContent,
} from '../content';

const CHECK_ICON =
  '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Flecha dibujada a mano del scribble de OSMO (info__scribble).
const SCRIBBLE_ARROW =
  '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<path d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 ' +
  '26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921 27.0609 26.6775 ' +
  '27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 ' +
  '19.1711 28.2358 14.7619 25.6477C5.77699 20.3802 0.852119 10.8502 0.0231477 0.612125C-0.616531 ' +
  '15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z" ' +
  'fill="currentColor"/></svg>';

// Gráfico de marca para la columna pequeña: burbuja de chat con línea de crecimiento.
const INFO_GRAPHIC =
  '<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<path d="M20 18 H100 a14 14 0 0 1 14 14 V74 a14 14 0 0 1 -14 14 H52 L30 104 V88 H20 ' +
  'a14 14 0 0 1 -14 -14 V32 a14 14 0 0 1 14 -14 Z" stroke="currentColor" stroke-width="4"/>' +
  '<path d="M28 64 L48 46 L66 60 L92 34" stroke="currentColor" stroke-width="4" ' +
  'stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M78 34 H92 V48" stroke="currentColor" stroke-width="4" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';

function stack(center = false): HTMLElement {
  const el = document.createElement('div');
  el.className = center ? 'aa-stack aa-stack--center' : 'aa-stack';
  return el;
}

function fadeParagraph(text: string): HTMLElement {
  const p = renderParagraph({ size: 'l', text });
  p.setAttribute('data-aa-fade', '');
  return p;
}

function fadeEyebrow(text: string): HTMLElement {
  const e = renderEyebrow(text);
  e.setAttribute('data-aa-fade', '');
  return e;
}

function ctaRow(cta: { label: string; href: string }): HTMLElement {
  const row = document.createElement('div');
  row.className = 'aa-cta-row';
  row.setAttribute('data-aa-fade', '');
  row.appendChild(renderButton({ label: cta.label, href: cta.href, variant: 'primary' }));
  return row;
}

function buildProse(c: ProseContent): HTMLElement {
  const center = c.kind === 'statement';
  const s = stack(center);
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(
    renderHeading({
      size: center ? 'xl' : 'l',
      text: c.heading,
      split: true,
      className: center ? 'aa-text-balance' : undefined,
    }),
  );
  c.paragraphs.forEach((p) => s.appendChild(fadeParagraph(p)));
  if (c.cta) s.appendChild(ctaRow(c.cta));
  return s;
}

function buildList(c: ChecklistContent): HTMLElement {
  const marker = c.marker ?? 'check';
  const ul = document.createElement('ul');
  ul.className = `aa-list aa-list--${marker}`;
  ul.setAttribute('data-aa-fade', '');
  c.items.forEach((text) => {
    const li = document.createElement('li');
    li.className = 'aa-list__item';
    const m = document.createElement('span');
    m.className = 'aa-list__marker';
    if (marker === 'check') m.innerHTML = CHECK_ICON;
    const t = document.createElement('span');
    t.textContent = text;
    li.append(m, t);
    ul.appendChild(li);
  });
  return ul;
}

function buildChecklist(c: ChecklistContent): HTMLElement {
  const s = stack();
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(renderHeading({ size: 'l', text: c.heading, split: true }));
  (c.intro ?? []).forEach((p) => s.appendChild(fadeParagraph(p)));
  s.appendChild(buildList(c));
  (c.outro ?? []).forEach((p) => s.appendChild(fadeParagraph(p)));
  if (c.cta) s.appendChild(ctaRow(c.cta));
  return s;
}

// Layout info — réplica de la sección .info de OSMO: columna gráfica + columna grande
// con scribble flotante (coral), statement y lista de filas label/párrafo.
function buildInfo(c: InfoContent): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-info__wrap';

  const small = document.createElement('div');
  small.className = 'aa-info__small-col';
  small.setAttribute('data-aa-fade', '');
  const graphic = document.createElement('div');
  graphic.className = 'aa-info__graphic';
  graphic.innerHTML = INFO_GRAPHIC;
  small.appendChild(graphic);

  const large = document.createElement('div');
  large.className = 'aa-info__large-col';

  if (c.scribble) {
    const scribble = document.createElement('div');
    scribble.className = 'aa-info__scribble';
    const text = document.createElement('span');
    text.className = 'aa-info__scribble-text';
    text.textContent = c.scribble;
    const arrow = document.createElement('span');
    arrow.className = 'aa-info__arrow';
    arrow.innerHTML = SCRIBBLE_ARROW;
    scribble.append(text, arrow);
    large.appendChild(scribble);
  }

  large.appendChild(
    renderHeading({ size: 'ml', text: c.heading, tag: 'h3', split: true, className: 'aa-info__title' }),
  );

  const ul = document.createElement('ul');
  ul.className = 'aa-info__list';
  c.items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'aa-info__li';
    li.setAttribute('data-aa-fade', '');
    const liTitle = document.createElement('div');
    liTitle.className = 'aa-info__li-title';
    liTitle.appendChild(renderHeading({ size: 'm', text: item.title, tag: 'h4' }));
    const desc = renderParagraph({ size: 'm', text: item.desc, className: 'aa-info__li-desc' });
    li.append(liTitle, desc);
    ul.appendChild(li);
  });
  large.appendChild(ul);

  wrap.append(small, large);
  return wrap;
}

function cardEl(card: { title: string; desc: string }): HTMLElement {
  const el = document.createElement('article');
  el.className = 'aa-card';
  el.appendChild(renderHeading({ size: 'm', text: card.title, tag: 'h3' }));
  el.appendChild(renderParagraph({ size: 'm', text: card.desc }));
  return el;
}

// Card-módulo — réplica de la product-card de OSMO: spacer de aspect ratio (__before),
// capa de fondo (__bg) y __content con __tags arriba + __center centrado.
function moduleCardEl(card: {
  title: string;
  desc: string;
  tag?: string;
  variant?: 'dark' | 'electric' | 'purple' | 'neutral';
}): HTMLElement {
  const el = document.createElement('article');
  el.className = 'aa-mod-card aa-slider__item';
  if (card.variant) el.classList.add(`aa-mod-card--${card.variant}`);

  const before = document.createElement('div');
  before.className = 'aa-mod-card__before';
  const bg = document.createElement('div');
  bg.className = 'aa-mod-card__bg'; // slot listo para una imagen/visual de fondo

  const content = document.createElement('div');
  content.className = 'aa-mod-card__content';

  const tags = document.createElement('div');
  tags.className = 'aa-mod-card__tags';
  if (card.tag) {
    const tag = document.createElement('span');
    tag.className = 'aa-mod-card__tag';
    tag.textContent = card.tag;
    tags.appendChild(tag);
  }

  const center = document.createElement('div');
  center.className = 'aa-mod-card__center';
  const title = document.createElement('h3');
  title.className = 'aa-mod-card__h';
  title.textContent = card.title;
  const desc = document.createElement('p');
  desc.className = 'aa-mod-card__p';
  desc.textContent = card.desc;
  center.append(title, desc);

  content.append(tags, center);
  el.append(before, bg, content);
  return el;
}

function buildCards(c: CardsContent): HTMLElement {
  const s = stack();
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(renderHeading({ size: 'l', text: c.heading, split: true }));

  if (c.layout === 'slider') {
    const slider = document.createElement('div');
    slider.className = 'aa-slider';
    slider.setAttribute('data-aa-slider', '');
    slider.setAttribute('data-aa-fade', '');
    const track = document.createElement('div');
    track.className = 'aa-slider__track';
    track.setAttribute('data-aa-slider-track', '');
    c.cards.forEach((card) => track.appendChild(moduleCardEl(card)));
    slider.appendChild(track);
    s.appendChild(slider);
    return s;
  }

  const grid = renderGrid({
    cols: 3,
    attrs: { 'data-aa-stagger': '' },
    children: c.cards.map(cardEl),
  });
  s.appendChild(grid);
  return s;
}

function buildFaq(c: FaqContent): HTMLElement {
  const s = stack();
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(renderHeading({ size: 'l', text: c.heading, split: true }));
  const acc = renderAccordion(c.items);
  acc.setAttribute('data-aa-fade', '');
  s.appendChild(acc);
  return s;
}

function buildCta(c: CtaContent): HTMLElement {
  const s = stack(true);
  s.appendChild(renderHeading({ size: 'xl', text: c.heading, split: true, className: 'aa-text-balance' }));
  (c.paragraphs ?? []).forEach((p) => s.appendChild(fadeParagraph(p)));
  s.appendChild(ctaRow(c.cta));
  return s;
}

function buildInner(c: SectionContent): HTMLElement {
  switch (c.kind) {
    case 'prose':
    case 'statement':
      return buildProse(c);
    case 'cards':
      return buildCards(c);
    case 'checklist':
      return buildChecklist(c);
    case 'info':
      return buildInfo(c);
    case 'faq':
      return buildFaq(c);
    case 'cta':
      return buildCta(c);
  }
}

function sizeFor(kind: SectionContent['kind']): ContainerSize {
  if (kind === 'cards' || kind === 'info') return 'default';
  if (kind === 'statement') return 'm';
  return 'sm';
}

export function renderContentSections(root: Element): void {
  SECTIONS.forEach((c) => {
    const section = renderSection({
      theme: c.theme,
      children: [renderContainer({ size: sizeFor(c.kind), children: [buildInner(c)] })],
    });
    if (c.id) section.id = c.id;
    root.appendChild(section);
  });
}
