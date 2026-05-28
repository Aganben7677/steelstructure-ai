# steelstructure.ai

Static GitHub Pages site for a steel structure industry information platform.

## Site Map

- `index.html` - homepage and main entry points
- `epc.html` - EPC contractor and project tracking
- `daily.html` - steel structure industry daily brief
- `supply-map.html` - supplier, mill, port, warehouse, and EPC office map
- `hot-projects-map.html` - global hot projects map
- `knowledge.html` - technical knowledge base categories
- `resources.html` - standards, calculators, supplier directory, and reports
- `about.html` - platform positioning
- `contact.html` - contact information
- `sign-in.html` - sign-in placeholder

## Assets

- `css/style.css` - global layout, theme, cards, navigation, and responsive styles
- `js/main.js` - theme toggle, search overlay, mobile menu, and optional auth hook
- `js/i18n.js` - English and Chinese UI translations

## Maintenance Notes

- This is a no-build static site. Changes pushed to `main` are published by GitHub Pages.
- Keep page navigation consistent across all HTML files.
- When adding visible UI text, add matching keys in `js/i18n.js` if the page supports translation.
- Map pages currently keep their data inline. Move data into JSON files when the dataset grows or needs frequent updates.
- Use small, focused commits so content updates, layout changes, and data changes are easy to review separately.

## Current Priorities

1. Normalize shared header/footer markup across pages.
2. Move EPC and daily brief content into reusable data files.
3. Add a repeatable daily brief update workflow.
4. Improve SEO metadata and social preview tags.
5. Add lightweight link and syntax checks for future maintenance.