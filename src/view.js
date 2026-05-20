document.addEventListener( 'DOMContentLoaded', function () {
	const scrollIndicators = document.querySelectorAll( '.scroll-indicator' );

	if ( scrollIndicators.length === 0 ) {
		return;
	}

	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	);

	scrollIndicators.forEach( function ( indicator ) {
		const hideAfterScrolling =
			indicator.getAttribute( 'data-hide-after-scrolling' ) === 'true';
		const blockElement = indicator.closest(
			'.wp-block-scroll-indicator-scroll-indicator'
		);
		const originalTabIndex = indicator.getAttribute( 'tabindex' );

		function scrollOneViewport() {
			const windowHeight = window.innerHeight;
			const targetY = window.scrollY + windowHeight;

			window.scrollTo( {
				top: targetY,
				behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
			} );
		}

		indicator.addEventListener( 'click', scrollOneViewport );

		indicator.style.cursor = 'pointer';

		if ( hideAfterScrolling && blockElement ) {
			let blockTop = blockElement.offsetTop;
			let blockBottom = blockTop + blockElement.offsetHeight;

			function updateBlockPosition() {
				blockTop = blockElement.offsetTop;
				blockBottom = blockTop + blockElement.offsetHeight;
			}

			function setIndicatorVisibility( isVisible ) {
				indicator.style.transition = isVisible
					? 'opacity 0.3s ease-in'
					: 'opacity 0.3s ease-out';
				indicator.style.opacity = isVisible ? '1' : '0';
				indicator.style.visibility = isVisible ? 'visible' : 'hidden';
				indicator.style.pointerEvents = isVisible ? 'auto' : 'none';

				if ( isVisible ) {
					indicator.removeAttribute( 'aria-hidden' );

					if ( originalTabIndex === null ) {
						indicator.removeAttribute( 'tabindex' );
					} else {
						indicator.setAttribute( 'tabindex', originalTabIndex );
					}
				} else {
					indicator.setAttribute( 'aria-hidden', 'true' );
					indicator.setAttribute( 'tabindex', '-1' );

					if ( indicator.ownerDocument.activeElement === indicator ) {
						indicator.blur();
					}
				}
			}

			window.addEventListener( 'resize', function () {
				updateBlockPosition();
				handleScroll();
			} );

			function handleScroll() {
				const scrollTop = window.scrollY;
				const viewportHeight = window.innerHeight;
				const viewportBottom = scrollTop + viewportHeight;

				if (
					scrollTop <= blockTop ||
					( blockTop < viewportBottom && blockBottom > scrollTop )
				) {
					setIndicatorVisibility( true );
				} else {
					setIndicatorVisibility( false );
				}
			}

			handleScroll();

			window.addEventListener( 'scroll', handleScroll, {
				passive: true,
			} );
		}
	} );
} );
