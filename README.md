# Scroll Indicator Block

A WordPress block that adds an animated scroll indicator to your pages — nudging visitors to keep scrolling. Choose from five icon styles, pick a size, set a color, and drop it anywhere in the block editor.

### Features

- **Five icon styles** — Mouse, Arrow, Chevron, Dots, Hand
- **T-shirt sizing** — S / M / L / XL, plus a custom size with unit control
- **Core color support** — uses the block editor's native color picker; all icons render with `currentColor`
- **CSS-only animations** — no JavaScript animation libraries; respects `prefers-reduced-motion`
- **Click to scroll** — clicking the indicator smoothly scrolls down one viewport height
- **Optional text label** — show or hide a customizable label beneath the icon
- **Hide after scrolling** — optionally fade the indicator out once the user starts scrolling
- **Accessible** — decorative SVGs are `aria-hidden`, keyboard navigation preserved

### Development

1. Clone the repository into your WordPress plugins directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.
4. Activate the plugin on your local WordPress site.
5. Add the Scroll Indicator block to any page or post.

### Building
```bash
npm run build
```

### How it works

The block renders an inline SVG icon sized via a `--scroll-indicator-size` CSS custom property. Color is inherited from WordPress's core text color support — no inline styles, no hardcoded values.

Animation is handled entirely in CSS. The `view.js` file is vanilla JavaScript that handles click-to-scroll and the optional hide-after-scrolling behavior. It loads only when the block is present on the page.
```css
@media (prefers-reduced-motion: no-preference) {
    .scroll-indicator svg {
        animation: bounce 2s infinite;
    }
}
```

### License

GPLv2 or later — see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html).
