---
inclusion: auto
---

# Reglas del Proyecto SIOP - Admin & Experiencias Base

## Regla 1: Caché y Refresh
Cada vez que se implementen ajustes en las experiencias bases o en el admin:
- Borrar caché (dist, .vite)
- Reiniciar servidores con `--force`
- Si el usuario está en el admin, cerrar sesión (limpiar localStorage de auth)
- Si está en la experiencia live, redirigir a la página inicial

## Regla 2: Versionamiento de Experiencia Base por Proyecto
- Cada proyecto creado queda vinculado a la versión de la experiencia base que existía al momento de su creación
- Si se modifica la experiencia base después, los proyectos existentes NO se ven afectados
- El proyecto almacena una referencia a la versión base con la que fue creado

## Regla 3: Nuevos Proyectos = Última Versión
- Al crear un nuevo proyecto, siempre accede a la última versión disponible de la experiencia base
- No hereda configuraciones de proyectos anteriores

## Regla 4: Repositorio por Proyecto
- Cada proyecto tiene su propio repositorio con la estructura live completa
- Ubicación: `apps/api/data/projects/{project-id}/export/`
- Contiene: HTML, CSS, JS con todos los cambios aplicados
- Al eliminar un proyecto, se elimina todo su repositorio
- El objetivo es que los desarrolladores/backend reciban el código final para conectar servicios

## Regla 5: Persistencia de Snapshots en Disco (API)
- Todos los snapshots se almacenan en disco vía API (`snapshots.json`)
- `snapshots.json` SIEMPRE se inicializa como `{}` (objeto), NUNCA como `[]` (array)
- localStorage se usa solo como caché; la fuente de verdad es la API
- Al guardar: se envía a la API Y se cachea en localStorage
- Al cargar: se intenta localStorage primero, luego API como fallback

## Regla 6: Orden de Páginas Persistente
- El orden de pestañas/páginas se guarda en la API como `__pages_order` dentro de `snapshots.json`
- También se cachea en localStorage (`sb_pages_${projectId}`)
- Al abrir un proyecto, se carga el orden guardado (localStorage → API fallback)
- `currentPage` siempre se establece como la primera página del orden guardado
- El iframe navega directamente al step correcto de la primera página

## Regla 7: Desktop/Mobile Dual Editing
- El admin tiene un toggle 🖥/📱 para cambiar entre modo desktop y mobile
- La experiencia mobile se construye SIEMPRE a partir de los ajustes de desktop (hereda)
- La experiencia mobile puede ajustarse de forma independiente
- Los snapshots se almacenan con sufijo de dispositivo: `page` (desktop) y `page_mobile` (mobile)
- Al cargar: se busca snapshot device-specific → desktop → genérico (fallback chain)
- Al exportar: se generan archivos HTML separados para desktop y mobile

## Regla 8: Flujo de Navegación
- El flujo de navegación se configura en el panel "Flujo de navegación"
- Se almacena como `__flow_config` dentro de `snapshots.json`
- En preview, los botones principales navegan según el flujo configurado
- Se usa `document.addEventListener('click', handler, true)` con capture para interceptar clics

## Regla 9: Al Abrir un Proyecto
- Siempre inicia con las pestañas existentes en el orden guardado
- Siempre muestra las pantallas finales (con snapshots ajustados)
- Se muestra un overlay de carga mientras se restaura el snapshot
- El iframe NO carga la URL base por defecto; espera a que se determine la página correcta

## Estructura de Almacenamiento por Proyecto
```
apps/api/data/projects/{id}/
├── meta.json          # Metadata del proyecto
├── versions.json      # Historial de versiones
├── logs.json          # Logs de actividad
├── pending.json       # Cambios pendientes
├── images.json        # Imágenes subidas
├── images/            # Archivos de imagen
├── snapshots.json     # Snapshots de cada página (desktop + mobile)
│                      # Claves especiales: __pages_order, __flow_config
└── export/            # ← CÓDIGO FINAL PARA DEVS
    ├── index.html     # Resumen de cambios
    ├── manifest.json  # Manifiesto de exportación
    ├── changes.json   # Todos los cambios
    ├── pages/         # HTML por página (desktop + mobile)
    ├── css/
    ├── js/
    └── assets/
```

## Servidores de Desarrollo
| Servicio | Puerto | Comando |
|----------|--------|---------|
| Hogar (experiencia base) | 3002 | `npx vite --config apps/hogar/vite.config.js` |
| Admin (editor) | 4000 | `npx vite --config apps/admin/vite.config.js` |
| API (persistencia) | 4001 | `node apps/api/server.js` |

## Convenciones de Código
- Font: Roboto Condensed (Google Fonts)
- Color primario: `#016D38`
- Color secundario: `#FFDC5D`
- Iconos locales: `apps/hogar/public/Iconos/`
- Elementos insertados: `z-index: 99999`
- Node.js path: `C:\Users\1143387374\.nodejs\node-v22.15.0-win-x64`
- `.npmrc` NO se commitea (contiene token secreto)
