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
  type FaqContent,
  type CtaContent,
} from '../content';

const CHECK_ICON =
  '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" stroke-width="2" ' +
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
    case 'faq':
      return buildFaq(c);
    case 'cta':
      return buildCta(c);
  }
}

function sizeFor(kind: SectionContent['kind']): ContainerSize {
  if (kind === 'cards') return 'default';
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
