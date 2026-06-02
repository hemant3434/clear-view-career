# Hemant Bhanot — Personal Portfolio

A clean, one-page personal portfolio built for software engineers targeting HR professionals and engineering managers. The design emphasizes clarity, professionalism, and ease of scanning — with a pure white background, tight typography, and generous whitespace.

---

## Project Purpose

This is a single-page portfolio website showcasing professional experience, education, and contact information. It is intentionally minimal — no projects gallery or technical skills section — focusing instead on career narrative and credibility signals that resonate with hiring teams.

Key design decisions:
- **One-page layout** — all content accessible without navigation jumps
- **White background + near-black text** — maximum readability, professional tone
- **No hero image or photo** — content-first, distraction-free
- **Company names as text** — clean wordmarks instead of logos
- **Generous whitespace** — lets each section breathe

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 — full-stack React with SSR/SSG |
| Build Tool | Vite 7 |
| React | React 19 |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS v4 with custom design tokens in `oklch` |
| UI Components | shadcn/ui (Button, Badge primitives) |
| Icons | [Lucide React](https://lucide.dev) |
| Package Manager | Bun |
| Language | TypeScript 5 (strict mode) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed (v1.2+)
- Node.js is not required — Bun handles everything

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <repo-name>

# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun dev
```

The dev server runs on `http://localhost:3000` by default (TanStack Start auto-detects the sandbox environment).

### Build

```bash
# Production build (Cloudflare Workers target by default)
bun run build

# Development mode build
bun run build:dev
```

### Preview

```bash
# Preview the production build locally
bun run preview
```

### Lint & Format

```bash
# Run ESLint
bun run lint

# Format with Prettier
bun run format
```

---

## Project Structure

```
.
├── src/
│   ├── routes/
│   │   ├── index.tsx          # Portfolio page (home)
│   │   ├── __root.tsx         # Root layout (HTML shell, providers)
│   │   └── ...                # Additional routes if added
│   ├── components/
│   │   └── ui/                # shadcn/ui components (Button, etc.)
│   ├── styles.css             # Tailwind v4 design tokens & theme
│   ├── router.tsx             # TanStack Router bootstrap
│   ├── server.ts              # SSR error wrapper entry
│   └── lib/                   # Shared utilities
├── public/
│   └── resume.pdf             # Downloadable resume (add your own)
├── vite.config.ts             # Vite + TanStack Start configuration
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript configuration (strict)
```

---

## Customization Guide

### Personal Information

Edit `src/routes/index.tsx` to update:

- **Name & title** — Hero section heading and subtitle
- **Tagline** — Opening paragraph under the name
- **Email** — Replace `hemant@example.com` with your real address
- **LinkedIn** — Replace `#` with your LinkedIn profile URL
- **Resume** — Add your PDF to `public/resume.pdf` and update the download link if needed

### Experience

The `experience` array in `src/routes/index.tsx` defines each role:

```typescript
const experience = [
  {
    company: "Company Name",
    role: "Job Title",
    dates: "Start — End",
    location: "City, Country",   // or empty string to hide
    bullets: [
      "Achievement or responsibility 1",
      "Achievement or responsibility 2",
    ],
  },
  // ...
];
```

### Education

Update the Education section in `src/routes/index.tsx` with your school, degree, dates, and location.

### SEO / Meta Tags

The `head()` function in `src/routes/index.tsx` controls page metadata:
- `title` — Browser tab title
- `description` — Search engine & social snippet
- `og:*` — Open Graph tags for social sharing

Update `src/routes/__root.tsx` for global meta (viewport, charset, site-wide defaults).

### Styling & Theme

Design tokens live in `src/styles.css` using `oklch` color format. The current theme is a neutral slate/indigo palette with light/dark mode support. To customize:

1. Edit `:root` (light mode) and `.dark` (dark mode) CSS variables
2. Update `@theme inline` to register new Tailwind utility classes

All colors must use `oklch()` per the project design system rules.

---

## Deployment

This project is configured for **Cloudflare Workers** by default (via `@lovable.dev/vite-tanstack-config`).

### Lovable Cloud

The project is built on Lovable's integrated platform. Deploy via the Lovable dashboard or CLI.

### Custom Domain

Set a custom domain in the Lovable publish settings. The app uses canonical tags and Open Graph meta for proper social sharing.

---

## Notes

- **Strict TypeScript** — All imports must resolve; unresolved imports cause hard build failures.
- **No `src/pages/`** — TanStack Start uses file-based routing in `src/routes/` only.
- **Auto-generated routes** — Do not edit `src/routeTree.gen.ts`; it is regenerated by the TanStack Router Vite plugin.
- **Server runtime** — Runs in a Cloudflare Worker (edge). Avoid Node-only APIs like `child_process`, `fs.watch`, or native binary dependencies.

---

## License

Private — personal portfolio. Not open source.
