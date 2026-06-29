// Waitlist — sección final con el formulario de lista de espera.
// Inputs/checkbox/submit con el design language del newsletter de OSMO.
// Ancla destino de todos los CTAs (#aa-waitlist). Campos: Nombre, Email, Empresa,
// Cargo, Teléfono. Validación cliente + envío al proxy en Vercel (Edge → Google Sheets).

import { renderSection, renderContainer } from '../ui/layout';
import { renderEyebrow, renderHeading, renderParagraph } from '../ui/text';
import { renderField, type FieldParts } from '../ui/atoms/input';
import { renderCheckbox } from '../ui/atoms/checkbox';
import { renderButton } from '../ui/atoms/button';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{6,}$/;

// Página de gracias (Elementor) a la que se redirige tras el registro exitoso. Allí
// se dispara el pixel CONTACT de Meta al cargar (ver src/index.ts, data-aa-ty-mount).
const TY_REDIRECT_URL = 'https://atomchat.io/whatsapp-academy-thank-you-page/';

// Endpoint público del proxy en Vercel (Edge Function → Google Sheets). NO es secreto:
// el secreto (URL/token del Apps Script) vive en env vars de Vercel. Reemplaza el
// subdominio por el real tras el primer deploy a Vercel.
const WAITLIST_ENDPOINT = 'https://atom-academy-waitlist-api.vercel.app/api/waitlist';

function setError(field: HTMLElement, error: HTMLElement | null, message: string): void {
  field.classList.add('has-error');
  if (error) error.textContent = message;
}

function clearError(field: HTMLElement, error: HTMLElement | null): void {
  field.classList.remove('has-error');
  if (error) error.textContent = '';
}

// Checkmark animado (transitions.dev #10): data-state="in" desde el inicio porque el
// elemento se monta recién creado, así la animación corre al insertarse en el DOM.
function buildSuccessCheck(): HTMLElement {
  const wrap = document.createElement('span');
  wrap.className = 'aa-form__check t-success-check';
  wrap.setAttribute('data-state', 'in');
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" ' +
    'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return wrap;
}

// Estados del aviso del form. Loading usa shimmer (transitions.dev #15) sobre data-text.
function noteLoading(note: HTMLElement, msg: string): void {
  note.className = 'aa-form__note is--loading t-shimmer';
  note.setAttribute('data-text', msg);
  note.textContent = msg;
}
function noteError(note: HTMLElement, msg: string): void {
  note.className = 'aa-form__note is--error';
  note.removeAttribute('data-text');
  note.textContent = msg;
}
function noteSuccess(note: HTMLElement, msg: string): void {
  note.className = 'aa-form__note is--success';
  note.removeAttribute('data-text');
  const text = document.createElement('span');
  text.className = 'aa-form__note-text';
  text.textContent = msg;
  note.replaceChildren(buildSuccessCheck(), text);
}
function noteReset(note: HTMLElement): void {
  note.className = 'aa-form__note';
  note.removeAttribute('data-text');
  note.textContent = '';
}

export function renderWaitlist(root: Element): void {
  // ── Intro ───────────────────────────────────────────────────────────────────
  const intro = document.createElement('div');
  intro.className = 'aa-flex-col aa-text-center';
  intro.style.alignItems = 'center'; // centra el badge (fit-content) como en manifesto/audience
  intro.style.gap = 'var(--aa-gap-m)';
  intro.style.maxWidth = '44em';
  intro.style.marginInline = 'auto';

  const eyebrow = renderEyebrow('Lista de espera · Lanzamiento julio');
  eyebrow.setAttribute('data-aa-fade', '');
  intro.appendChild(eyebrow);
  intro.appendChild(renderHeading({ size: 'l', text: 'Únete a la lista de espera', tag: 'h2', split: true }));
  const lead = renderParagraph({
    size: 'l',
    text: 'En esta primera edición, el acceso será exclusivo para quienes se registren. Déjanos tus datos y te avisamos antes de la apertura general.',
    className: 'aa-text-balance',
  });
  lead.setAttribute('data-aa-fade', '');
  intro.appendChild(lead);

  // ── Formulario ───────────────────────────────────────────────────────────────
  const form = document.createElement('form');
  form.className = 'aa-form';
  form.noValidate = true;
  form.setAttribute('data-aa-fade', '');
  form.setAttribute('data-aa-delay', '0.15');

  const nameParts = renderField({ name: 'name', label: 'Nombre', placeholder: 'Tu nombre', required: true, autocomplete: 'name' });
  const emailParts = renderField({ name: 'email', label: 'Email', type: 'email', placeholder: 'tunombre@email.com', required: true, autocomplete: 'email' });
  const companyParts = renderField({ name: 'company', label: 'Empresa', placeholder: 'Empresa donde trabajas', required: true, autocomplete: 'organization' });
  const roleParts = renderField({ name: 'role', label: 'Cargo', placeholder: 'Tu cargo o rol', required: true, autocomplete: 'organization-title' });
  const phoneParts = renderField({ name: 'phone', label: 'Teléfono', type: 'tel', placeholder: '+52 55 1234 5678', required: true, autocomplete: 'tel' });

  // Honeypot anti-bot: invisible y fuera del tab order. Debe llegar vacío al servidor.
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'company_url';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;';

  const row1 = document.createElement('div');
  row1.className = 'aa-form__row';
  row1.append(nameParts.field, emailParts.field);

  const row2 = document.createElement('div');
  row2.className = 'aa-form__row';
  row2.append(companyParts.field, roleParts.field);

  const check = renderCheckbox({
    name: 'privacy',
    required: true,
    labelHtml: 'Acepto recibir información sobre la formación y la <a href="https://atomchat.io/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">política de privacidad</a>.',
  });

  const submitWrap = document.createElement('div');
  submitWrap.className = 'aa-form__submit';
  const submit = renderButton({ label: 'Únete a la lista de espera', variant: 'primary' });
  if (submit instanceof HTMLButtonElement) submit.type = 'submit';
  submitWrap.appendChild(submit);

  const note = document.createElement('p');
  note.className = 'aa-form__note';
  note.setAttribute('role', 'status');
  note.setAttribute('aria-live', 'polite');

  // Teléfono a ancho completo (fila propia)
  form.append(row1, row2, phoneParts.field, honeypot, check.field, submitWrap, note);

  // ── Validación cliente ─────────────────────────────────────────────────────
  const required: { parts: FieldParts; msg: string; test?: (v: string) => boolean }[] = [
    { parts: nameParts, msg: 'Ingresa tu nombre.' },
    { parts: emailParts, msg: 'Ingresa un email válido.', test: (v) => EMAIL_RE.test(v) },
    { parts: companyParts, msg: 'Ingresa tu empresa.' },
    { parts: roleParts, msg: 'Ingresa tu cargo.' },
    { parts: phoneParts, msg: 'Ingresa un teléfono válido.', test: (v) => PHONE_RE.test(v) },
  ];

  const validate = (): boolean => {
    let ok = true;
    required.forEach(({ parts, msg, test }) => {
      const value = parts.input.value.trim();
      const valid = test ? test(value) : value.length > 0;
      if (!valid) {
        setError(parts.field, parts.error, msg);
        ok = false;
      } else clearError(parts.field, parts.error);
    });
    if (!check.input.checked) {
      check.field.classList.add('has-error');
      ok = false;
    } else check.field.classList.remove('has-error');
    return ok;
  };

  required.forEach(({ parts }) =>
    parts.input.addEventListener('input', () => clearError(parts.field, parts.error)),
  );
  check.input.addEventListener('change', () => check.field.classList.remove('has-error'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    noteReset(note);
    if (!validate()) {
      noteError(note, 'Revisa los campos marcados.');
      return;
    }

    const payload = {
      name: nameParts.input.value.trim(),
      email: emailParts.input.value.trim(),
      company: companyParts.input.value.trim(),
      role: roleParts.input.value.trim(),
      phone: phoneParts.input.value.trim(),
      company_url: honeypot.value, // honeypot
    };

    submit.setAttribute('disabled', '');
    noteLoading(note, 'Enviando…');
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) throw new Error('request_failed');
      noteSuccess(note, '¡Listo! Te llevamos a tu confirmación…');
      // Conserva el query string (UTM) para mantener la atribución en la TY page.
      window.setTimeout(() => {
        window.location.href = TY_REDIRECT_URL + window.location.search;
      }, 800);
    } catch {
      noteError(note, 'No se pudo enviar. Intenta de nuevo en un momento.');
    } finally {
      submit.removeAttribute('disabled');
    }
  });

  // ── Sección (strip claro, contrasta con el CTA final oscuro) ───────────────
  const content = document.createElement('div');
  content.className = 'aa-flex-col';
  content.style.gap = 'var(--aa-gap-xl)';
  content.append(intro, form);

  const section = renderSection({
    theme: 'light',
    children: [renderContainer({ className: 'aa-container--card', children: [content] })],
  });
  section.id = 'aa-waitlist';

  root.appendChild(section);
}
