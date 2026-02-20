document.addEventListener( 'DOMContentLoaded', function () {
	const scrollIndicators = document.querySelectorAll( '.scroll-indicator' );

	if ( scrollIndicators.length === 0 ) {
		return;
	}

	scrollIndicators.forEach( function ( indicator ) {
		const hideAfterScrolling =
			indicator.getAttribute( 'data-hide-after-scrolling' ) === 'true';
		const blockElement = indicator.closest(
			'.wp-block-scroll-indicator-scroll-indicator'
		);

		indicator.addEventListener( 'click', function () {
			const windowHeight = window.innerHeight;
			const targetY = window.scrollY + windowHeight;

			window.scrollTo( {
				top: targetY,
				behavior: 'smooth',
			} );
		} );

		indicator.style.cursor = 'pointer';

		if ( hideAfterScrolling && blockElement ) {
			let blockTop = blockElement.offsetTop;
			let blockBottom = blockTop + blockElement.offsetHeight;

			function updateBlockPosition() {
				blockTop = blockElement.offsetTop;
				blockBottom = blockTop + blockElement.offsetHeight;
			}

			window.addEventListener( 'resize', updateBlockPosition );

			function handleScroll() {
				const scrollTop = window.scrollY;
				const viewportHeight = window.innerHeight;
				const viewportBottom = scrollTop + viewportHeight;

				if (
					scrollTop <= blockTop ||
					( blockTop < viewportBottom && blockBottom > scrollTop )
				) {
					indicator.style.transition = 'opacity 0.3s ease-in';
					indicator.style.opacity = '1';
				} else {
					indicator.style.transition = 'opacity 0.3s ease-out';
					indicator.style.opacity = '0';
				}
			}

			handleScroll();

			window.addEventListener( 'scroll', handleScroll, {
				passive: true,
			} );
		}
	} );
} );
