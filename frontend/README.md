# Edunomics Frontend

Modern responsive landing page for Edunomics Services built with Vite, React, TypeScript, and Tailwind CSS.

## Getting started

1. Install dependencies

```bash
npm install
```

2. Configure API URL (optional). Create `.env` with:

```bash
VITE_API_URL=http://localhost:5000
```

3. Run the dev server

```bash
npm run dev
```

The app proxies `/api` to `VITE_API_URL` in development.

## Build

```bash
npm run build
npm run preview
```

## Notes
- Features section loads from `/api/public/features` (backend already provides it).
- Tailwind is configured in `tailwind.config.js` and `postcss.config.js`.
