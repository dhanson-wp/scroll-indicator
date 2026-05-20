=== Scroll Indicator ===
Contributors: derekhanson
Tags: block, scroll, animation, indicator, gutenberg
Requires at least: 6.4
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add an animated, customizable scroll indicator block to guide visitors down the page.

== Description ==

Scroll Indicator adds a lightweight block that encourages visitors to continue scrolling. Choose from five icon styles, set the size and color, show optional text, and enable click-to-scroll behavior without adding animation libraries.

= Features =

* Five icon styles: mouse, arrow, chevron, dots, and hand.
* Preset sizes plus a custom CSS size value.
* Native block editor text color, spacing, typography, and alignment support.
* CSS-only animation that respects the visitor's reduced-motion preference.
* Optional text label.
* Optional hide-after-scrolling behavior.
* Keyboard-accessible click-to-scroll control on the front end.

== Installation ==

1. Upload the `scroll-indicator` folder to the `/wp-content/plugins/` directory, or install it through the WordPress Plugins screen.
2. Activate the plugin through the Plugins screen in WordPress.
3. Add the Scroll Indicator block to any post or page.

== Frequently Asked Questions ==

= Does this plugin require a JavaScript animation library? =

No. The animation is handled with CSS, and the small front-end script is only used for click-to-scroll and the optional hide-after-scrolling behavior.

= Can I change the icon color? =

Yes. The block uses WordPress core text color support, so colors can be managed through the block editor.

= Does it support reduced motion preferences? =

Yes. Animations only run when the visitor has not requested reduced motion.

== Screenshots ==

1. Scroll Indicator block controls in the editor.
2. Scroll Indicator block displayed on the front end.

== Changelog ==

= 1.0.0 =

* Initial release.
