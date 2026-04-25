# HealthSync AI Error Fix Report

## Issue Observed
- On `.../assess`, the UI showed raw HTML (`<!DOCTYPE html> ...`) instead of a clean API error.
- This happened because the frontend attempted to call `/api/v1/...` on the frontend host, but backend routes were not deployed on that host.

## Root Cause
- `render.yaml` only deployed the Next.js frontend service.
- The frontend defaulted to relative API calls (`/api/v1`), which returned a Next.js HTML 404 page in production.
- The API client surfaced that HTML directly as an error message.

## Fixes Applied
1. Deployment config updated in `render.yaml`:
   - Added a Python backend web service (`healthsyncai-backend`).
   - Wired frontend `NEXT_PUBLIC_API_URL` from backend service URL.
2. Frontend API client hardened in `frontend/src/lib/api.ts`:
   - If `NEXT_PUBLIC_API_URL` is provided without `/api/v1`, append `/api/v1` automatically.
   - Detect HTML responses and return a helpful configuration/deployment error instead of dumping full HTML.

## Verification
- Ran frontend lint:
  - `npm --prefix "/Users/ayushsiddhant/Desktop/DSA/healthsync-ai/frontend" run lint`
  - Result: no lint errors.

## Notes
- Backend runtime still needs valid environment variables (for AI provider keys, etc.) in Render/hosting environment for full functionality.
