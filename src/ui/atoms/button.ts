// Botón — estructura del botón de OSMO: .aa-button > bg + label-wrap con dos copias
// del label apiladas. El hover (rotación alrededor de pivote lejano) lo maneja
// button-rotate.ts, activado por el atributo data-aa-btn-rotate.

export interface ButtonOptions {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
  target?: '_blank' | '_self';
}

export function renderButton(opts: ButtonOptions): HTMLElement {
  const { label, href, variant = 'primary', size = 'default', target } = opts;

  const tag = href ? 'a' : 'button';
  const el = document.createElement(tag) as HTMLAnchorElement | HTMLButtonElement;
  el.className = `aa-button aa-button--${variant} aa-button--${size}`;
  el.setAttribute('data-aa-btn-rotate', '');

  if (href && el instanceof HTMLAnchorElement) {
    el.href = href;
    if (target) el.target = target;
    if (target === '_blank') el.rel = 'noopener noreferrer';
  }

  const bg = document.createElement('span');
  bg.className = 'aa-button__bg';

  const wrap = document.createElement('span');
  wrap.className = 'aa-button__label-wrap';

  // Dos copias del label: una visible, una pre-rotada que entra en el hover.
  for (let i = 0; i < 2; i++) {
    const lbl = document.createElement('span');
    lbl.className = 'aa-button__label';
    if (i > 0) lbl.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = label;
    lbl.appendChild(inner);
    wrap.appendChild(lbl);
  }

  el.append(bg, wrap);
  return el;
}
