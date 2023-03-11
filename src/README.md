# Dashboard

The following components have been created using the Dashboard components as a foundation.
Extending these components (building blocks) will make it more efficient to generate Workspaces, and Widgets for customizing
the Dashboard.

```
Dashboard (main application)
-- Workspace
---- Layout Grid
------ Widget (Ex: Search, Report, Analyze, Ingest, etc)
```

## Workspace

Each Workspace is in essence a new "page" or "canvas" that as user can create using the Dashboard.

Each Workspace has a custom Layout, configured by the user and stored in the Workspace json configuration file.

Each Workspace may contain different Widgets depending on the "type" of Workspace (potentially).

Example: The Ingestion Workspace can only include Ingest Widgets

## Widgets

Each Widget is a Child of the Base Widget Component. Widgets are extensible via Plugins based on the Widget type. The Plugin Extension points will be determined by the Widget type.

### Types of Widgets

-   Search (Query)
-   Analytics (Reporting)
-   Ingest (Indexing)
-   Configure (Admin)
