# my-portfolio

The frontend for the portfolio site, built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This outputs a `dist/` folder — deploy it to Netlify, Vercel, GitHub Pages, or any static host.

## Files

- `src/PortfolioPro.jsx` — the entire site: hero, case studies, tech stack, process flow, commit activity, and contact form. All content is mock data — edit the constants near the top of the file (name, projects, skills) to make it yours.
- `src/main.jsx` — mounts `PortfolioPro` into the page.
- `index.html` — the HTML shell Vite serves.

## Connecting the contact form to a real inbox

The contact form posts to whatever `API_URL` is set to inside `PortfolioPro.jsx` (search for `API_URL`). Point it at the backend in the separate `portfolio-backend` project once that's deployed, so messages actually reach you and you can reply from the admin inbox.
