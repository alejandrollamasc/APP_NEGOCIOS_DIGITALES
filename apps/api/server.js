import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, 'data', 'projects');
const PORT = 4001;

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
  ['versions.json','logs.json','pending.json','images.json','meta.json'].forEach(f => {
    const fp = join(dir, f);
    if (!existsSync(fp)) writeJSON(fp, f === 'meta.json' ? {} : []);
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
    const meta = {
      name: body.name || 'Sin nombre',
      description: body.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: body.user || 'unknown',
      createdByName: body.userName || 'Unknown'
    };
    writeJSON(join(dir, 'meta.json'), meta);
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
  }

  json(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => console.log(`📦 API server running at http://localhost:${PORT}`));
