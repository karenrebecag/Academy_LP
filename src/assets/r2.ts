// URLs públicas de imágenes servidas desde Cloudflare R2. Se sirven aparte del bundle
// para no inflar landing.js con data-URLs (parseo lento en mobile = pantalla blanca).
const R2 = 'https://pub-c8d801a0ff204d758910633021fa302b.r2.dev';

export const contourTexture = `${R2}/contour.jpg`;

export const audiencePhotos = [
  `${R2}/aud-1.jpg`,
  `${R2}/aud-2.jpg`,
  `${R2}/aud-3.jpg`,
];

export const manifestoShots = {
  top: `${R2}/bubbles-top.webp`,
  bottom: `${R2}/bubbles-bottom.webp`,
};

export const avatars = [
  `${R2}/avatar-01.jpg`,
  `${R2}/avatar-02.jpg`,
  `${R2}/avatar-03.jpg`,
  `${R2}/avatar-04.jpg`,
  `${R2}/avatar-05.jpg`,
  `${R2}/avatar-06.jpg`,
  `${R2}/avatar-07.jpg`,
  `${R2}/avatar-08.jpg`,
  `${R2}/avatar-09.jpg`,
  `${R2}/avatar-10.jpg`,
];
