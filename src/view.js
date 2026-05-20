document.addEventListener( 'DOMContentLoaded', function () {
	const scrollIndicators = document.querySelectorAll( '.scroll-indicator' );

	if ( scrollIndicators.length === 0 ) {
		return;
	}

	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	);

	scrollIndicators.forEach( function ( indicator ) {
		const originalTabIndex = indicator.getAttribute( 'tabindex' );
		const hideThreshold = 16;
		let ticking = false;

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

		const hiddenTransition = prefersReducedMotion.matches
			? 'none'
			: 'opacity 0.45s ease, transform 0.45s ease, visibility 0s linear 0.45s';
		const visibleTransition = prefersReducedMotion.matches
			? 'none'
			: 'opacity 0.35s ease, transform 0.35s ease, visibility 0s';

		function setIndicatorVisibility( isVisible ) {
			indicator.style.transition = isVisible
				? visibleTransition
				: hiddenTransition;
			indicator.style.opacity = isVisible ? '1' : '0';
			indicator.style.visibility = isVisible ? 'visible' : 'hidden';
			indicator.style.pointerEvents = isVisible ? 'auto' : 'none';
			indicator.style.transform = isVisible
				? 'translateY(0)'
				: 'translateY(10px)';

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

		function handleScroll() {
			setIndicatorVisibility( window.scrollY <= hideThreshold );
		}

		function requestVisibilityUpdate() {
			if ( ticking ) {
				return;
			}

			ticking = true;
			window.requestAnimationFrame( function () {
				handleScroll();
				ticking = false;
			} );
		}

		function handleReducedMotionChange() {
			handleScroll();
		}

		handleScroll();

		window.addEventListener( 'scroll', requestVisibilityUpdate, {
			passive: true,
		} );

		if ( typeof prefersReducedMotion.addEventListener === 'function' ) {
			prefersReducedMotion.addEventListener(
				'change',
				handleReducedMotionChange
			);
		}
	} );
} );
