## Plan: Italicize Job Descriptions

### What
Add italic styling to the description paragraph under each job in the Experience section.

### How
In `src/routes/index.tsx`, add the `italic` Tailwind utility class to the `<p>` element that renders `job.bullets[0]` within the experience map.

### Files changed
- `src/routes/index.tsx` — one class addition

This is a single-line, non-breaking visual tweak.