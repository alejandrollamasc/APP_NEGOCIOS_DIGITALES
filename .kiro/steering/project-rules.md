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

## Estructura de Exportación por Proyecto
```
apps/api/data/projects/{id}/
├── meta.json          # Metadata del proyecto
├── versions.json      # Historial de versiones
├── logs.json          # Logs de actividad
├── pending.json       # Cambios pendientes
├── images.json        # Imágenes subidas
├── images/            # Archivos de imagen
└── export/            # ← CÓDIGO FINAL PARA DEVS
    ├── index.html
    ├── css/
    ├── js/
    └── assets/
```
