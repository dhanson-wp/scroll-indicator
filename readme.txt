=== Scroll Indicator ===
Contributors: derekhanson
Tags: block, scroll, animation, indicator, gutenberg
Requires at least: 6.4
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add an animated scroll indicator block that encourages visitors to keep moving through your page.

== Description ==

Scroll Indicator adds a focused block for landing pages, hero sections, editorial layouts, and long-form content. It gives visitors a clear visual cue that there is more to explore below the fold.

Choose from multiple icon styles, adjust the size, use native WordPress text color controls, add optional helper text, and let visitors click or keyboard-activate the indicator to move smoothly down the page.

The block is intentionally lightweight. Animations are handled with CSS, respect reduced-motion preferences, and the front-end script is limited to click-to-scroll and optional hide-after-scrolling behavior.

= Key Features =

* Five icon styles: mouse, arrow, chevron, dots, and hand.
* Preset sizes plus a custom CSS size value.
* Native block editor controls for text color, spacing, typography, and alignment.
* CSS-only animation that respects the visitor's reduced-motion preference.
* Optional text label beneath the icon.
* Optional hide-after-scrolling behavior.
* Keyboard-accessible click-to-scroll interaction.
* No animation libraries or heavy runtime dependencies.

= Development =

Source code and build tooling are maintained at https://github.com/dhanson-wp/scroll-indicator.

= Good For =

* Landing page hero sections.
* Editorial introductions.
* Long-form stories and portfolios.
* Product pages where visitors should continue below the fold.
* Any layout that needs a subtle, branded scroll cue.

== Installation ==

1. Upload the `scroll-indicator` folder to the `/wp-content/plugins/` directory, or install it through the WordPress Plugins screen.
2. Activate the plugin through the Plugins screen in WordPress.
3. Open the block editor and add the Scroll Indicator block.
4. Choose an icon style, size, color, and optional label.

== Frequently Asked Questions ==

= Does this plugin require a JavaScript animation library? =

No. Animations are handled with CSS. The front-end script only powers click-to-scroll and the optional hide-after-scrolling behavior.

= Can I change the icon color? =

Yes. The block uses WordPress core text color support, so colors can be managed through the block editor.

= Does it support reduced motion preferences? =

Yes. The animated effects only run when the visitor has not requested reduced motion.

= Is the indicator keyboard accessible? =

Yes. The front-end indicator is saved as a keyboard-focusable button-like control with an accessible label.

= Will the block work without JavaScript? =

The icon and optional text still render without JavaScript. JavaScript is only needed for click-to-scroll and hide-after-scrolling behavior.

== Changelog ==

= 1.0.0 =

* Initial release.
