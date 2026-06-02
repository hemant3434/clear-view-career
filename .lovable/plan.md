## One-page portfolio for Hemant Bhanot

Clean, white-background, HR/EM-friendly single-page portfolio. No projects or technical skills sections.

### Sections (top to bottom)
1. **Slim top nav** — name wordmark left, anchor links right (About, Experience, Education, Contact)
2. **Hero** — name, current title, one-line value pitch, location, email/LinkedIn buttons, "Download resume" CTA
3. **About** — short professional summary (2–3 sentences) framed for HR & engineering managers
4. **Experience** — AWS SDE, AWS SDE Intern, Shopify, Flipp, Verto Health, RBC. Each: company, role, dates, location, 2–4 impact bullets
5. **Education** — University of Toronto, BSc Computer Science, Distinction
6. **Footer / Contact** — email, LinkedIn, copyright

### Design
- Pure white background, near-black text, single subtle accent (slate/indigo)
- Inter for body, tight sans for headings
- Max width ~960px, generous whitespace, subtle dividers between sections
- Single scroll, smooth anchor scrolling, semantic HTML, accessible
- No photo, no hero image; company names as text wordmarks

### Technical
- Replace `src/routes/index.tsx` with the portfolio page; update `head()` meta (title, description, og tags)
- Create small section components under `src/components/portfolio/` (Nav, Hero, About, Experience, Education, Footer)
- Use existing shadcn `Button` and `Badge` primitives; colors via tokens in `src/styles.css` (adjust tokens if needed to enforce white bg + dark text)
- Resume download links to a placeholder path in `public/` (file added later by user)
- LinkedIn URL = placeholder `#` for now
