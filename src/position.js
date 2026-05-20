const POSITION_MODE_MAP = {
	flow: 'flow',
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

export function getPositionClassNames( positionMode, screenPosition ) {
	if ( getPositionMode( positionMode ) !== 'absolute' ) {
		return '';
	}

	return `is-position-absolute is-screen-position-${ getScreenPosition(
		screenPosition
	) }`;
}
