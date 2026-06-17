import * as esbuild from 'esbuild';

// Bundle TS + GSAP + CSS hacia dist/. jsDelivr sirve el tag versionado.
const shared = {
  bundle: true,
  format: 'esm',
  target: ['es2019'],
  logLevel: 'info',
};

const jsOptions = {
  ...shared,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/landing.js',
  minify: true,
  sourcemap: true,
};

const cssOptions = {
  ...shared,
  entryPoints: ['src/styles/landing.css'],
  outfile: 'dist/landing.css',
  minify: true,
};

const watch = process.argv.includes('--watch');
const serve = process.argv.includes('--serve');

if (watch || serve) {
  const jsCtx = await esbuild.context(jsOptions);
  const cssCtx = await esbuild.context(cssOptions);
  await Promise.all([jsCtx.watch(), cssCtx.watch()]);
  if (serve) {
    const { host, port } = await jsCtx.serve({ servedir: '.', port: 8766 });
    console.log(`dev server: http://${host}:${port}`);
  } else {
    console.log('watching src/...');
  }
} else {
  await Promise.all([esbuild.build(jsOptions), esbuild.build(cssOptions)]);
}
