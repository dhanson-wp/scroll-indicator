![Scroll Indicator brand banner](assets/banner-1544x500.png)

# Scroll Indicator

Scroll Indicator is a lightweight WordPress block for adding a “keep scrolling” cue to landing pages, editorial layouts, hero sections, and long-form content.

Site builders can choose an icon style, tune the size and color, add optional text, and let visitors click or keyboard-activate the indicator to move one viewport down the page.

## Highlights

- Five animated icon styles: mouse, arrow, chevron, dots, and hand.
- Preset sizes plus a custom CSS size value.
- Native block editor support for text color, spacing, typography, and alignment.
- CSS-only animation that respects `prefers-reduced-motion`.
- Optional helper text beneath the icon.
- Optional hide-after-scrolling behavior.
- Keyboard-accessible click-to-scroll behavior on the front end.
- No animation libraries or heavy runtime dependencies.

## Installation

1. Download or build the plugin ZIP.
2. Upload the ZIP from **Plugins → Add Plugin → Upload Plugin** in WordPress.
3. Activate **Scroll Indicator**.
4. Add the **Scroll Indicator** block to any post or page.

## Development

Install dependencies:

```bash
npm install
```

Start the development build:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Create a local plugin ZIP:

```bash
npm run plugin-zip
```

PressShip is the preferred WordPress.org submission path for this repo:

```bash
npx pressship pack .
npx pressship publish . --dry-run
```

## Quality Checks

```bash
npm run lint:js
npm run lint:css
php -l scroll-indicator.php
npm audit --omit=dev --audit-level=high
```

## WordPress.org Assets

The `assets/` directory contains WordPress.org plugin directory artwork:

- `banner-1544x500.png`
- `banner-772x250.png`
- `icon-256x256.png`
- `icon-128x128.png`

These are intended for the WordPress.org SVN `assets` directory after the plugin is approved. They are not required inside the installable plugin ZIP.

The compiled block files live in `compiled/` so PressShip includes them in the installable ZIP by default.

## License

GPLv2 or later.
