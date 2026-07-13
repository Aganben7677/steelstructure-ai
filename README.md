# steelstructure.ai

Static GitHub Pages site for a steel structure industry information platform.

## Live Site

- Primary domain: https://steelstructure.ai/
- Itinerary archive: https://steelstructure.ai/itinerary.html
- GitHub Pages preview: https://aganben7677.github.io/steelstructure-ai/

## Launch Record

Steelstructure.ai officially launched on **June 18, 2026**.

- Launch log: [`docs/launch-log.md`](docs/launch-log.md)
- V1.1 roadmap: [`docs/v1.1-roadmap.md`](docs/v1.1-roadmap.md)
- Launch evidence archive: [`launch-evidence/`](launch-evidence/)

## Site Map

- `index.html` - integrated AI-agent capability hub, Daily Brief preview, roadmap, and main platform entry points
- `epc.html` - EPC contractor and project tracking
- `daily.html` - steel structure industry daily brief
- `supply-map.html` - supplier, mill, port, warehouse, and EPC office map
- `hot-projects-map.html` - global hot projects map
- `itinerary.html` - daily itinerary log, route map, local archive traces, and export files
- `knowledge.html` - technical knowledge base categories
- `resources.html` - standards, calculators, supplier directory, and reports
- `about.html` - platform positioning
- `contact.html` - contact information
- `sign-in.html` - sign-in placeholder

## Assets

- `css/style.css` - global layout, theme, cards, navigation, and responsive styles
- `css/home-capability-hub.css` - integrated homepage visual system and responsive component styles
- `js/main.js` - theme toggle, search overlay, mobile menu, itinerary navigation injection, homepage entry, and optional auth hook
- `js/i18n.js` - English and Chinese UI translations
- `js/home-capability-hub.js` - homepage interactions, bilingual dynamic content, and Daily Brief preview loading
- `assets/images/steel-hero.jpg` - generated homepage hero image for the steel structure workspace

## Maintenance Notes

- This is a no-build static site. Changes pushed to `main` are published by GitHub Pages.
- Keep page navigation consistent across all HTML files.
- When adding visible UI text, add matching keys in `js/i18n.js` if the page supports translation.
- Map pages currently keep their data inline. Move data into JSON files when the dataset grows or needs frequent updates.
- Homepage search is static and client-side. Update `searchPages` in `js/main.js` when adding top-level pages.
- Homepage project signals are loaded from `data/briefs/latest.json`; keep that file current when publishing a new Daily Brief.
- Use small, focused commits so content updates, layout changes, and data changes are easy to review separately.

## Current Priorities

1. Normalize shared header/footer markup across pages.
2. Move EPC and daily brief content into reusable data files.
3. Build V1.1: Steelstructure.ai Workbench Foundation.
4. Add a repeatable daily brief update workflow.
5. Improve SEO metadata and social preview tags.
6. Add lightweight link and syntax checks for future maintenance.
