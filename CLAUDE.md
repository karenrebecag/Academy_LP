# atom-academy

Landing page versionada para ATOM Academy. Lógica + estilos servidos vía jsDelivr;
**Elementor solo aporta un punto de montaje**. Build: esbuild + TypeScript + GSAP.
Design language: OSMO (tokens, easing, animaciones, tipografía, espaciado).

## Identidad

| Campo | Valor |
|---|---|
| Repo | `karenrebecag/Academy_LP` (público — requisito de jsDelivr /gh/) |
| Remote | `https://github.com/karenrebecag/Academy_LP.git` |
| CDN loader | `https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js` |
| Bundle JS | `dist/landing.js` |
| Bundle CSS | `dist/landing.css` |

## Cómo se usa en Elementor

Widget **HTML** con el mount + loader:

```html
<div data-aa-mount
     data-aa-theme="light"
     data-aa-lang="es"></div>

<script data-cfasync="false"
  src="https://cdn.jsdelivr.net/gh/karenrebecag/atom-academy@latest/loader.js"></script>
```

Atributos disponibles:
- `data-aa-theme` → `light` | `dark` (default `light`)
- `data-aa-lang`  → `es` | `en` (default `es`)

### Gotcha: plugins de "delay JS" de WordPress (WP Meteor, WP Rocket, Perfmatters…)

La landing se renderiza 100% con JS: si el loader no corre al cargar, la página queda
en blanco. Los plugins de optimización de WordPress **retrasan la ejecución de todo el JS
hasta la primera interacción** (scroll/touch/click). Reescriben el `<script>` del loader a
`type="javascript/blocked"` y mueven la URL a `data-wpmeteor-src` → en mobile no pinta hasta
que el usuario hace scroll (parece loader eterno). Diagnosticado en `atomchat.io/whatsapp-academy/`
(WP Meteor v3.4.18).

`data-cfasync="false"` **NO** exime de esto (eso es solo para Cloudflare Rocket Loader). Hay
que eximir el loader del plugin de delay. Para **WP Meteor** basta el atributo:

```html
<script data-cfasync="false" data-wpmeteor-nooptimize="true"
  src="https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js"></script>
```

Para otros plugins (WP Rocket, Perfmatters, Flying Scripts), excluir la URL del loader
(`jsdelivr`/`loader.js`) en su lista de "no retrasar / exclude from delay".

Los scripts que el loader inyecta luego (`landing.js`) se crean vía JS, así que el plugin no
los toca; solo hay que eximir el `<script>` del loader.

> Para no quedar en blanco durante la descarga, montar un placeholder de marca **dentro** del
> `data-aa-mount`; `boot()` lo reemplaza con `mount.replaceChildren(root)` al terminar.
>
> Cache: jsDelivr sirve el loader `@latest` con `max-age` de 7 días en el navegador. Tras
> cambiar el embed o publicar versión, probar con hard-refresh o incógnito para no quedarse
> con el loader viejo cacheado.

## Arquitectura

```
src/*.ts  --esbuild-->  dist/landing.js (GSAP inlined, minificado) + dist/landing.css
push main -> CI: typecheck + build + tag patch + regenera loader.js + commitea dist + purga @latest
```

### Estructura

```
src/
├── index.ts              # boot: lee atributos del mount, renderiza root .aa-landing, initMotion
├── core/
│   ├── types.ts          # Theme, Lang, LandingConfig, MountAttrs
│   └── dom.ts            # $, $$, has (helpers de query)
├── sections/             # Una exportación por sección (hero, features, social, cta, etc.)
├── ui/
│   ├── atoms/
│   │   └── button.ts     # renderButton — patrón 038 OSMO (bg scale + letra-roll)
│   └── motion.ts         # initMotion / revealHeadings / revealFade / revealStagger
└── styles/
    └── landing.css       # Design system completo (tokens --aa-*, tema, tipografía, grid, botón)
```

## Design system tokens (prefijo --aa-)

| Categoría | Variables clave |
|---|---|
| Colores neutros | `--aa-neutral-50` → `--aa-neutral-950` (13 pasos) |
| Accents | `--aa-color-electric` (#a1ff62), `--aa-color-purple` (#6840ff), `--aa-color-coral` (#f84131) |
| Semánticos | `--aa-bg`, `--aa-fg`, `--aa-fg-muted`, `--aa-border`, `--aa-accent` |
| Espaciado | `--aa-padding-{xxs|xs|s|m|l|xl|xxl}`, `--aa-gap-{xxs|xs|s|m|l|xl|xxl}` |
| Tipografía | `--aa-text-{xxs|xs|s|m|ml|l|xl|xxl}` (clamp responsive) |
| Animación | `--aa-ease` (OSMO: `cubic-bezier(0.625, 0.05, 0, 1)`), `--aa-duration-{xs|s|m|l|xl}` |
| Radio | `--aa-radius-{s|m|l|xl|pill}` |

## Animaciones (data attributes en HTML)

| Atributo | Efecto |
|---|---|
| `data-aa-split` | SplitText: words suben desde abajo con rotate + stagger |
| `data-aa-fade` | Fade + translateY, con `data-aa-delay="0.2"` opcional |
| `data-aa-stagger` | Stagger sobre hijos directos del elemento |

## Desarrollo

```bash
npm install
npm run typecheck     # tsc --noEmit
npm run build         # genera dist/
npm run dev           # build + watch + server en :8766 (sirve preview.html)
```

`preview.html` monta dos instancias (light / dark) contra dist local.

## Deploy

`git push origin main` (SSH). El CI: typecheck + build + tag patch (vX.Y.(Z+1)) + regenera
loader.js + commitea dist + purga `@latest`. Antes del siguiente push: `git pull --rebase origin main`.

## Añadir una sección

1. Crear `src/sections/mi-seccion.ts` que exporte `renderMiSeccion(root: Element): void`
2. Importar y llamar en `src/index.ts` dentro de `boot()`:
   ```ts
   import { renderMiSeccion } from './sections/mi-seccion';
   // dentro de boot(), después de crear root:
   renderMiSeccion(root);
   ```
3. Agregar clases del DS (`aa-section`, `aa-container`, `aa-h-xl`, etc.) en el HTML generado
4. Para animaciones: añadir `data-aa-split` / `data-aa-fade` / `data-aa-stagger` a los elementos

## Reglas de operación

- CSS prefijado `.aa-*` — nunca selectores globales (colisionan con Elementor)
- Pegas en widget **HTML**, NO en el widget Form de Elementor
- No meter secretos: el bundle es público en jsDelivr
- Repo debe ser público (requisito de jsDelivr /gh/)
