# Pothole Detection Frontend (React + Vite)

## Quick Start (Install & Run)

1) Install Node.js (LTS recommended).
2) Install dependencies (recommended):
	- `npm install`
3) Start the dev server:
	- `npm run dev`

### If you want explicit npm install commands

Runtime dependencies:

- `npm install @turf/turf axios bootstrap bootstrap-icons leaflet lucide-react react react-dom react-bootstrap react-leaflet react-leaflet-cluster react-router-dom recharts`

Dev dependencies:

- `npm install -D @eslint/js @tailwindcss/postcss @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss vite`

## Backend API (Where data comes from)

This frontend fetches data from a .NET API. By default it expects:

- API base URL: https://localhost:7099/

The API base URL is configured in:

- [Api/PrivateAxios.jsx](Api/PrivateAxios.jsx) (base URL for authenticated calls)
- [src/Function.jsx](src/Function.jsx) (general data endpoints)

If you run a different backend URL (e.g., Azure), update the `apilink` / `baseURL` values in those files.

## Login & Refresh Token

Auth uses HttpOnly refresh cookies. Ensure your backend login endpoint sets the refresh cookie and supports:

- `POST /Account/Login`
- `GET /Account/Refresh-Token`

If the refresh cookie is missing, the frontend will show 400 errors on refresh.

## Build

- `npm run build`

## Lint

- `npm run lint`
