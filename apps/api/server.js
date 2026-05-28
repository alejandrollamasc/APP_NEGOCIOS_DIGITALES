import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, 'data', 'projects');
const PORT = 4001;
const BASE_PROJECT_PORT = 5000;
const projectPorts = {}; // projectId -> port

if (!existsSync(PROJECTS_DIR)) mkdirSync(PROJECTS_DIR, { recursive: true });

function readJSON(file) {
  try { if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf-8')); } catch (e) { console.error('Read error:', e.message); }
  return [];
}
function writeJSON(file, data) { writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8'); }

function getProjectDir(id) { return join(PROJECTS_DIR, id); }

function ensureProject(id) {
  const dir = getProjectDir(id);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  ['versions.json','logs.json','pending.json','images.json','meta.json','snapshots.json'].forEach(f => {
    const fp = join(dir, f);
    if (!existsSync(fp)) writeJSON(fp, (f === 'meta.json' || f === 'snapshots.json') ? {} : []);
  });
  // Create images subfolder
  const imgDir = join(dir, 'images');
  if (!existsSync(imgDir)) mkdirSync(imgDir, { recursive: true });
  return dir;
}

function parseBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
function json(res, data, status = 200) {
  cors(res);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const parts = path.split('/').filter(Boolean); // ['api','projects', ...]

  // ===== LIST PROJECTS =====
  // GET /api/projects
  if (parts[0] === 'api' && parts[1] === 'projects' && !parts[2] && req.method === 'GET') {
    const dirs = existsSync(PROJECTS_DIR) ? readdirSync(PROJECTS_DIR, { withFileTypes: true }).filter(d => d.isDirectory()) : [];
    const projects = dirs.map(d => {
      const meta = readJSON(join(PROJECTS_DIR, d.name, 'meta.json'));
      const versions = readJSON(join(PROJECTS_DIR, d.name, 'versions.json'));
      return {
        id: d.name,
        name: meta.name || d.name,
        description: meta.description || '',
        createdAt: meta.createdAt || '',
        updatedAt: meta.updatedAt || '',
        createdBy: meta.createdBy || '',
        versionCount: Array.isArray(versions) ? versions.length : 0
      };
    });
    return json(res, projects);
  }

  // ===== CREATE PROJECT =====
  // POST /api/projects
  if (parts[0] === 'api' && parts[1] === 'projects' && !parts[2] && req.method === 'POST') {
    const body = await parseBody(req);
    const id = (body.name || 'proyecto').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '-' + Date.now().toString(36);
    const dir = ensureProject(id);
    const template = (body.description || '').includes('[plantilla: hogar]') ? 'hogar' : 'salud';
    const meta = {
      name: body.name || 'Sin nombre',
      description: body.description || '',
      template: template,
      baseVersion: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: body.user || 'unknown',
      createdByName: body.userName || 'Unknown'
    };
    writeJSON(join(dir, 'meta.json'), meta);

    // Create export directory for this project (Rule 4)
    const exportDir = join(dir, 'export');
    if (!existsSync(exportDir)) mkdirSync(exportDir, { recursive: true });
    ['css', 'js', 'assets'].forEach(sub => {
      const subDir = join(exportDir, sub);
      if (!existsSync(subDir)) mkdirSync(subDir, { recursive: true });
    });

    return json(res, { id, ...meta }, 201);
  }

  // ===== PROJECT-SCOPED ROUTES =====
  // /api/projects/:id/...
  if (parts[0] === 'api' && parts[1] === 'projects' && parts[2]) {
    const projectId = parts[2];
    const resource = parts[3]; // versions, logs, pending, images, meta
    const dir = getProjectDir(projectId);

    if (!existsSync(dir)) return json(res, { error: 'Project not found' }, 404);

    // GET /api/projects/:id
    if (!resource && req.method === 'GET') {
      const meta = readJSON(join(dir, 'meta.json'));
      return json(res, { id: projectId, ...meta });
    }

    // DELETE /api/projects/:id
    if (!resource && req.method === 'DELETE') {
      const { rmSync } = await import('fs');
      try { rmSync(dir, { recursive: true, force: true }); } catch (e) { console.error('Delete error:', e); }
      return json(res, { ok: true, deleted: projectId });
    }

    // POST /api/projects/:id/duplicate — create a full copy of the project
    if (resource === 'duplicate' && req.method === 'POST') {
      const body = await parseBody(req);
      const newName = body.name || `${projectId} (copia)`;
      const newId = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '-' + Date.now().toString(36);
      const newDir = ensureProject(newId);

      // Copy all files from source to new project
      const { cpSync } = await import('fs');
      try { cpSync(dir, newDir, { recursive: true, force: true }); } catch (e) { console.error('Copy error:', e); }

      // Update meta with new name
      const meta = readJSON(join(newDir, 'meta.json'));
      meta.name = newName;
      meta.createdAt = new Date().toISOString();
      meta.updatedAt = new Date().toISOString();
      meta.createdBy = body.user || meta.createdBy;
      meta.createdByName = body.userName || meta.createdByName;
      meta.duplicatedFrom = projectId;
      writeJSON(join(newDir, 'meta.json'), meta);

      return json(res, { ok: true, id: newId, name: newName }, 201);
    }

    // PUT /api/projects/:id (update meta)
    if (!resource && req.method === 'PUT') {
      const body = await parseBody(req);
      const meta = readJSON(join(dir, 'meta.json'));
      Object.assign(meta, body, { updatedAt: new Date().toISOString() });
      writeJSON(join(dir, 'meta.json'), meta);
      return json(res, { id: projectId, ...meta });
    }

    // GET /api/projects/:id/versions
    if (resource === 'versions' && req.method === 'GET') {
      return json(res, readJSON(join(dir, 'versions.json')));
    }

    // POST /api/projects/:id/versions
    if (resource === 'versions' && req.method === 'POST') {
      const body = await parseBody(req);
      const versions = readJSON(join(dir, 'versions.json'));
      const logs = readJSON(join(dir, 'logs.json'));

      const version = {
        id: `v${versions.length + 1}`,
        number: versions.length + 1,
        timestamp: new Date().toISOString(),
        user: body.user || 'unknown',
        userName: body.userName || 'Unknown',
        changes: body.changes || [],
        changeCount: (body.changes || []).length
      };
      versions.unshift(version);
      writeJSON(join(dir, 'versions.json'), versions);

      (body.changes || []).forEach(c => {
        logs.unshift({
          id: c.id || Date.now().toString(36),
          versionId: version.id,
          timestamp: c.timestamp || new Date().toISOString(),
          user: body.user,
          userName: body.userName,
          action: c.action || 'modify',
          selector: c.selector,
          property: c.property,
          value: c.value,
          description: c.description || ''
        });
      });
      writeJSON(join(dir, 'logs.json'), logs);
      writeJSON(join(dir, 'pending.json'), []);

      // Update meta timestamp
      const meta = readJSON(join(dir, 'meta.json'));
      meta.updatedAt = new Date().toISOString();
      writeJSON(join(dir, 'meta.json'), meta);

      return json(res, version, 201);
    }

    // GET /api/projects/:id/logs
    if (resource === 'logs' && req.method === 'GET') {
      return json(res, readJSON(join(dir, 'logs.json')));
    }

    // GET/POST/DELETE /api/projects/:id/pending
    if (resource === 'pending') {
      if (req.method === 'GET') return json(res, readJSON(join(dir, 'pending.json')));
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const pending = readJSON(join(dir, 'pending.json'));
        const change = { ...body, id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4), timestamp: new Date().toISOString() };
        pending.push(change);
        writeJSON(join(dir, 'pending.json'), pending);
        return json(res, change, 201);
      }
      if (req.method === 'DELETE') {
        writeJSON(join(dir, 'pending.json'), []);
        return json(res, { ok: true });
      }
    }

    // POST /api/projects/:id/images
    if (resource === 'images' && req.method === 'POST') {
      const body = await parseBody(req);
      const images = readJSON(join(dir, 'images.json'));
      const img = { id: Date.now().toString(36), name: body.name, data: body.data, timestamp: new Date().toISOString() };
      images.push(img);
      writeJSON(join(dir, 'images.json'), images);
      return json(res, img, 201);
    }
    if (resource === 'images' && req.method === 'GET') {
      return json(res, readJSON(join(dir, 'images.json')));
    }
    // GET /api/projects/:id/overrides — get all changes as a single array for the live app
    if (resource === 'overrides' && req.method === 'GET') {
      const versions = readJSON(join(dir, 'versions.json'));
      const allChanges = [];
      [...(Array.isArray(versions) ? versions : [])].reverse().forEach(v => {
        (v.changes || []).forEach(c => allChanges.push({ selector: c.selector, property: c.property, value: c.value }));
      });
      return json(res, allChanges);
    }

    // GET /api/projects/:id/port — get or assign a unique port for this project
    if (resource === 'port' && req.method === 'GET') {
      if (!projectPorts[projectId]) {
        const usedPorts = Object.values(projectPorts);
        let port = BASE_PROJECT_PORT;
        while (usedPorts.includes(port)) port++;
        projectPorts[projectId] = port;
      }
      return json(res, { port: projectPorts[projectId], url: `http://localhost:3000?project=${projectId}` });
    }

    // POST /api/projects/:id/restore-page — remove all changes for a specific page
    if (resource === 'restore-page' && req.method === 'POST') {
      const body = await parseBody(req);
      const page = body.page;
      if (!page) return json(res, { error: 'page required' }, 400);

      // Remove changes for this page from all versions
      const versions = readJSON(join(dir, 'versions.json'));
      versions.forEach(v => {
        if (v.changes) {
          v.changes = v.changes.filter(c => (c.page || 'home') !== page);
          v.changeCount = v.changes.length;
        }
      });
      writeJSON(join(dir, 'versions.json'), versions);

      // Clear pending for this page
      const pending = readJSON(join(dir, 'pending.json'));
      const filtered = pending.filter(c => (c.page || 'home') !== page);
      writeJSON(join(dir, 'pending.json'), filtered);

      // Log the restore
      const logs = readJSON(join(dir, 'logs.json'));
      logs.unshift({ id: Date.now().toString(36), timestamp: new Date().toISOString(), userName: 'Admin', description: `Página "${page}" restaurada a versión original` });
      writeJSON(join(dir, 'logs.json'), logs);

      return json(res, { ok: true, page, message: `Page "${page}" restored` });
    }

    // POST /api/projects/:id/snapshots — save a page snapshot
    if (resource === 'snapshots' && req.method === 'POST') {
      const body = await parseBody(req);
      const page = body.page;
      const html = body.html;
      if (!page || !html) return json(res, { error: 'page and html required' }, 400);
      const snapshotsFile = join(dir, 'snapshots.json');
      let snapshots = readJSON(snapshotsFile);
      if (Array.isArray(snapshots) || !snapshots) snapshots = {};
      snapshots[page] = { html, updatedAt: new Date().toISOString() };
      writeJSON(snapshotsFile, snapshots);
      return json(res, { ok: true, page });
    }

    // GET /api/projects/:id/snapshots — get all snapshots
    if (resource === 'snapshots' && req.method === 'GET') {
      const snapshotsFile = join(dir, 'snapshots.json');
      if (existsSync(snapshotsFile)) return json(res, readJSON(snapshotsFile));
      return json(res, {});
    }

    // GET /api/projects/:id/snapshots/:page — get a specific page snapshot
    if (resource === 'snapshots' && parts[4] && req.method === 'GET') {
      const snapshotsFile = join(dir, 'snapshots.json');
      const snapshots = existsSync(snapshotsFile) ? readJSON(snapshotsFile) : {};
      const page = parts[4];
      if (snapshots[page]) return json(res, snapshots[page]);
      return json(res, { error: 'not found' }, 404);
    }

    // DELETE /api/projects/:id/snapshots/:page — delete a page snapshot
    if (resource === 'snapshots' && parts[4] && req.method === 'DELETE') {
      const snapshotsFile = join(dir, 'snapshots.json');
      const snapshots = existsSync(snapshotsFile) ? readJSON(snapshotsFile) : {};
      delete snapshots[parts[4]];
      writeJSON(snapshotsFile, snapshots);
      return json(res, { ok: true });
    }

    // POST /api/projects/:id/export — generate export files for developers
    if (resource === 'export' && req.method === 'POST') {
      const meta = readJSON(join(dir, 'meta.json'));
      const versions = readJSON(join(dir, 'versions.json'));
      const snapshotsFile = join(dir, 'snapshots.json');
      const snapshots = existsSync(snapshotsFile) ? readJSON(snapshotsFile) : {};
      const template = meta.template || ((meta.description || '').includes('[plantilla: hogar]') ? 'hogar' : 'salud');

      // Collect all changes
      const allChanges = [];
      [...(Array.isArray(versions) ? versions : [])].reverse().forEach(v => {
        (v.changes || []).forEach(c => allChanges.push(c));
      });

      // Group changes by page
      const changesByPage = {};
      allChanges.forEach(c => {
        const page = c.page || 'home';
        if (!changesByPage[page]) changesByPage[page] = [];
        changesByPage[page].push(c);
      });

      // Generate export manifest
      const exportDir = join(dir, 'export');
      if (!existsSync(exportDir)) mkdirSync(exportDir, { recursive: true });

      // Export snapshots as HTML files (both desktop and mobile)
      const pagesDir = join(exportDir, 'pages');
      if (!existsSync(pagesDir)) mkdirSync(pagesDir, { recursive: true });

      const exportedPages = [];
      for (const [pageKey, snapData] of Object.entries(snapshots)) {
        if (pageKey.startsWith('__')) continue; // Skip internal keys like __flow_config
        if (!snapData || !snapData.html) continue;
        const isMobile = pageKey.endsWith('_mobile');
        const basePage = isMobile ? pageKey.replace('_mobile', '') : pageKey;
        const suffix = isMobile ? '_mobile' : '_desktop';
        const filename = `${basePage}${suffix}.html`;

        const pageHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.name} - ${basePage}${isMobile ? ' (Mobile)' : ''}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <main id="app-content" class="app-main">
    ${snapData.html}
  </main>
</body>
</html>`;
        writeFileSync(join(pagesDir, filename), pageHtml, 'utf-8');
        exportedPages.push({ page: basePage, device: isMobile ? 'mobile' : 'desktop', file: filename });
      }

      const manifest = {
        projectId,
        projectName: meta.name,
        template,
        baseVersion: meta.baseVersion || meta.createdAt,
        exportedAt: new Date().toISOString(),
        totalChanges: allChanges.length,
        exportedPages,
        pages: Object.keys(changesByPage).map(page => ({
          id: page,
          changes: changesByPage[page].length,
          items: changesByPage[page]
        }))
      };

      writeJSON(join(exportDir, 'manifest.json'), manifest);
      writeJSON(join(exportDir, 'changes.json'), allChanges);

      // Generate a summary HTML with instructions for devs
      const summaryHtml = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Export - ${meta.name}</title>
<style>body{font-family:system-ui;max-width:800px;margin:40px auto;padding:0 20px;color:#333}h1{color:#016D38}code{background:#f5f5f5;padding:2px 6px;border-radius:4px;font-size:13px}.change{border:1px solid #eee;padding:12px;margin:8px 0;border-radius:8px}.page-title{color:#016D38;font-weight:700;margin-top:24px}.device-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-left:8px}.device-badge--desktop{background:#e3f2fd;color:#1565c0}.device-badge--mobile{background:#fce4ec;color:#c62828}</style>
</head>
<body>
<h1>📦 ${meta.name}</h1>
<p>Template: <strong>${template}</strong> | Exportado: ${new Date().toLocaleString('es-CO')}</p>
<p>Total de cambios: <strong>${allChanges.length}</strong> | Páginas exportadas: <strong>${exportedPages.length}</strong></p>
<hr>
<h2>📄 Páginas exportadas (HTML)</h2>
<ul>
${exportedPages.map(p => `<li><code>pages/${p.file}</code> <span class="device-badge device-badge--${p.device}">${p.device}</span></li>`).join('\n')}
</ul>
<hr>
<h2>📝 Cambios por página</h2>
${Object.entries(changesByPage).map(([page, changes]) => `
<h3 class="page-title">📄 ${page}</h3>
${changes.map(c => `<div class="change"><code>${c.property}</code> → <code>${c.selector}</code><br><small>${c.description || ''}</small></div>`).join('')}
`).join('')}
<hr>
<p><em>Archivo generado automáticamente. Los archivos HTML en /pages/ contienen el snapshot final de cada pantalla (desktop y mobile por separado).</em></p>
</body></html>`;

      writeFileSync(join(exportDir, 'index.html'), summaryHtml, 'utf-8');

      return json(res, { ok: true, exportDir: `projects/${projectId}/export/`, manifest });
    }

    // GET /api/projects/:id/export — get export manifest
    if (resource === 'export' && req.method === 'GET') {
      const exportDir = join(dir, 'export');
      const manifestFile = join(exportDir, 'manifest.json');
      if (existsSync(manifestFile)) {
        return json(res, readJSON(manifestFile));
      }
      return json(res, { error: 'No export yet. POST to generate.' }, 404);
    }
  }

  json(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => console.log(`📦 API server running at http://localhost:${PORT}`));
