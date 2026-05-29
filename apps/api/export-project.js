#!/usr/bin/env node
/**
 * Export a project as complete front-end code
 * Usage: node apps/api/export-project.js <project-id>
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectId = process.argv[2];

if (!projectId) {
  console.log('Usage: node apps/api/export-project.js <project-id>');
  console.log('\nAvailable projects:');
  const projDir = join(__dirname, 'data', 'projects');
  readdirSync(projDir, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(d => {
    const meta = JSON.parse(readFileSync(join(projDir, d.name, 'meta.json'), 'utf8'));
    console.log(`  ${d.name} — "${meta.name}"`);
  });
  process.exit(0);
}

const dir = join(__dirname, 'data', 'projects', projectId);
if (!existsSync(dir)) { console.error('Project not found:', projectId); process.exit(1); }

const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'));
let snapshots = JSON.parse(readFileSync(join(dir, 'snapshots.json'), 'utf8'));
if (Array.isArray(snapshots)) snapshots = {};

const template = meta.template || ((meta.description || '').includes('[plantilla: hogar]') ? 'hogar' : 'salud');
const pagesOrder = snapshots.__pages_order ? JSON.parse(snapshots.__pages_order.html || '[]') : null;
const flowConfig = snapshots.__flow_config ? JSON.parse(snapshots.__flow_config.html || '{}') : {};

console.log(`\n📦 Exportando: "${meta.name}"`);
console.log(`   Template: ${template}`);
console.log(`   Snapshots: ${Object.keys(snapshots).filter(k => !k.startsWith('__')).length} páginas\n`);

// Create export directory
const exportDir = join(dir, 'export');
if (!existsSync(exportDir)) mkdirSync(exportDir, { recursive: true });
const pagesDir = join(exportDir, 'pages');
if (!existsSync(pagesDir)) mkdirSync(pagesDir, { recursive: true });
const cssDir = join(exportDir, 'css');
if (!existsSync(cssDir)) mkdirSync(cssDir, { recursive: true });
const assetsDir = join(exportDir, 'assets');
if (!existsSync(assetsDir)) mkdirSync(assetsDir, { recursive: true });

// Copy CSS
const baseCssPath = join(__dirname, '..', template === 'hogar' ? 'hogar' : 'live', 'css');
if (existsSync(baseCssPath)) {
  readdirSync(baseCssPath).forEach(f => {
    if (f.endsWith('.css')) { copyFileSync(join(baseCssPath, f), join(cssDir, f)); console.log(`   ✅ CSS: ${f}`); }
  });
}

// Copy icons
const iconsPath = join(__dirname, '..', template === 'hogar' ? 'hogar' : 'live', 'public', 'Iconos');
if (existsSync(iconsPath)) {
  const iconsExport = join(assetsDir, 'Iconos');
  if (!existsSync(iconsExport)) mkdirSync(iconsExport, { recursive: true });
  const icons = readdirSync(iconsPath);
  icons.forEach(f => { try { copyFileSync(join(iconsPath, f), join(iconsExport, f)); } catch {} });
  console.log(`   ✅ Iconos: ${icons.length} archivos`);
}

// Copy images
const imagesPath = join(__dirname, '..', template === 'hogar' ? 'hogar' : 'live', 'public', 'images');
if (existsSync(imagesPath)) {
  const imagesExport = join(assetsDir, 'images');
  if (!existsSync(imagesExport)) mkdirSync(imagesExport, { recursive: true });
  const images = readdirSync(imagesPath);
  images.forEach(f => { try { copyFileSync(join(imagesPath, f), join(imagesExport, f)); } catch {} });
  console.log(`   ✅ Imágenes: ${images.length} archivos`);
}

// Generate HTML per page
const pageKeys = Object.keys(snapshots).filter(k => !k.startsWith('__'));
const pageFiles = [];

pageKeys.forEach((pageId, idx) => {
  const snap = snapshots[pageId];
  if (!snap || !snap.html) return;
  const pageLabel = pagesOrder ? (pagesOrder.find(p => p.id === pageId)?.label || pageId) : pageId;
  const fileName = `${String(idx + 1).padStart(2, '0')}-${pageId}.html`;

  const pageHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.name} - ${pageLabel}</title>
  <link rel="stylesheet" href="../css/hogar.css">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <main id="app-content" class="app-main app-main--home">
    ${snap.html}
  </main>
</body>
</html>`;

  writeFileSync(join(pagesDir, fileName), pageHtml, 'utf-8');
  pageFiles.push({ id: pageId, label: pageLabel, file: fileName });
  console.log(`   ✅ Página: ${fileName} (${pageLabel})`);
});

// Generate index.html
const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.name}</title>
  <link rel="stylesheet" href="css/hogar.css">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    .export-nav{position:fixed;bottom:0;left:0;right:0;background:#333;padding:8px 16px;display:flex;gap:8px;z-index:99999;overflow-x:auto}
    .export-nav a{padding:6px 14px;color:#999;text-decoration:none;border-radius:14px;font-size:13px;font-family:'Roboto Condensed',sans-serif;white-space:nowrap}
    .export-nav a:hover{background:rgba(255,255,255,0.1);color:#fff}
    .export-nav a.active{background:#016D38;color:#fff}
    .export-info{max-width:800px;margin:40px auto;padding:0 20px 80px;font-family:'Roboto Condensed',sans-serif}
    .export-info h1{color:#016D38}
    .export-info table{width:100%;border-collapse:collapse;margin:16px 0}
    .export-info th,.export-info td{padding:8px 12px;border:1px solid #eee;text-align:left;font-size:14px}
    .export-info th{background:#f5f5f5}
  </style>
</head>
<body>
  <div class="export-info">
    <h1>📦 ${meta.name}</h1>
    <p><strong>Template:</strong> ${template} | <strong>Exportado:</strong> ${new Date().toLocaleString('es-CO')} | <strong>Pantallas:</strong> ${pageFiles.length}</p>
    <h2>Pantallas del proyecto</h2>
    <table>
      <thead><tr><th>#</th><th>Pantalla</th><th>Archivo</th></tr></thead>
      <tbody>${pageFiles.map((p, i) => `<tr><td>${i + 1}</td><td>${p.label}</td><td><a href="pages/${p.file}">${p.file}</a></td></tr>`).join('')}</tbody>
    </table>
    <h2>Estructura</h2>
    <pre>
export/
├── index.html
├── css/hogar.css
├── assets/Iconos/
├── assets/images/
└── pages/
${pageFiles.map(p => `    ├── ${p.file}`).join('\n')}
    </pre>
    <h2>Flujo de navegación</h2>
    <pre>${JSON.stringify(flowConfig, null, 2)}</pre>
  </div>
  <nav class="export-nav">
    ${pageFiles.map((p, i) => `<a href="pages/${p.file}"${i === 0 ? ' class="active"' : ''}>${p.label}</a>`).join('')}
  </nav>
</body>
</html>`;

writeFileSync(join(exportDir, 'index.html'), indexHtml, 'utf-8');
writeFileSync(join(exportDir, 'manifest.json'), JSON.stringify({ projectId, projectName: meta.name, template, exportedAt: new Date().toISOString(), pages: pageFiles, flowConfig }, null, 2), 'utf-8');

console.log(`\n🎉 Exportación completa!`);
console.log(`   📁 ${exportDir}`);
console.log(`   📄 ${pageFiles.length} páginas HTML generadas`);
console.log(`   🎨 CSS + Iconos + Imágenes incluidos`);
console.log(`\n   Comparta la carpeta "export/" con el equipo de desarrollo.`);
