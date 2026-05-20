const POSITION_MODE_MAP = {
	flow: 'flow',
	fixed: 'fixed',
	absolute: 'absolute',
};

const SCREEN_POSITION_MAP = {
	'bottom-left': 'bottom-left',
	'bottom-center': 'bottom-center',
	'bottom-right': 'bottom-right',
};

export function getPositionMode( positionMode ) {
	return POSITION_MODE_MAP[ positionMode ] || POSITION_MODE_MAP.flow;
}

export function getScreenPosition( screenPosition ) {
	return (
		SCREEN_POSITION_MAP[ screenPosition ] ||
		SCREEN_POSITION_MAP[ 'bottom-center' ]
	);
}

export function getAbsoluteCoordinate( coordinate, fallback ) {
	const numericCoordinate =
		typeof coordinate === 'number'
			? coordinate
			: Number.parseFloat( coordinate );

	if ( ! Number.isFinite( numericCoordinate ) ) {
		return fallback;
	}

	return Math.min( 100, Math.max( 0, numericCoordinate ) );
}

export function getPositionClassNames( positionMode, screenPosition ) {
	const normalizedPositionMode = getPositionMode( positionMode );

	if ( normalizedPositionMode === 'fixed' ) {
		return `is-position-fixed is-screen-position-${ getScreenPosition(
			screenPosition
		) }`;
	}

	if ( normalizedPositionMode === 'absolute' ) {
		return 'is-position-absolute';
	}

	return '';
}

export function getPositionStyle( positionMode, absoluteX, absoluteY ) {
	if ( getPositionMode( positionMode ) !== 'absolute' ) {
		return {};
	}

	return {
		'--scroll-indicator-x': `${ getAbsoluteCoordinate( absoluteX, 50 ) }%`,
		'--scroll-indicator-y': `${ getAbsoluteCoordinate( absoluteY, 85 ) }%`,
	};
}
