// Waitlist — sección final con el formulario de lista de espera.
// Inputs/checkbox/submit con el design language del newsletter de OSMO.
// Ancla destino de todos los CTAs (#aa-waitlist). Campos: Nombre, Email, Empresa,
// Cargo, Teléfono. Validación cliente; conexión a Google Sheets pendiente (TODO).

import { renderSection, renderContainer } from '../ui/layout';
import { renderEyebrow, renderHeading, renderParagraph } from '../ui/text';
import { renderField, type FieldParts } from '../ui/atoms/input';
import { renderCheckbox } from '../ui/atoms/checkbox';
import { renderButton } from '../ui/atoms/button';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{6,}$/;

function setError(field: HTMLElement, error: HTMLElement | null, message: string): void {
  field.classList.add('has-error');
  if (error) error.textContent = message;
}

function clearError(field: HTMLElement, error: HTMLElement | null): void {
  field.classList.remove('has-error');
  if (error) error.textContent = '';
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

  const row1 = document.createElement('div');
  row1.className = 'aa-form__row';
  row1.append(nameParts.field, emailParts.field);

  const row2 = document.createElement('div');
  row2.className = 'aa-form__row';
  row2.append(companyParts.field, roleParts.field);

  const check = renderCheckbox({
    name: 'privacy',
    required: true,
    labelHtml: 'Acepto recibir información sobre la formación y la <a href="#" rel="noopener">política de privacidad</a>.',
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
  form.append(row1, row2, phoneParts.field, check.field, submitWrap, note);

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.className = 'aa-form__note';
    note.textContent = '';
    if (!validate()) {
      note.classList.add('is--error');
      note.textContent = 'Revisa los campos marcados.';
      return;
    }
    // TODO: POST a Google Sheets (Apps Script web app) al cablear la integración.
    note.classList.add('is--success');
    note.textContent = '¡Listo! Te avisaremos antes del lanzamiento.';
    form.reset();
  });

  // ── Sección (strip claro, contrasta con el CTA final oscuro) ───────────────
  const content = document.createElement('div');
  content.className = 'aa-flex-col';
  content.style.gap = 'var(--aa-gap-xl)';
  content.append(intro, form);

  const section = renderSection({
    theme: 'light',
    children: [renderContainer({ size: 'sm', children: [content] })],
  });
  section.id = 'aa-waitlist';

  root.appendChild(section);
}
