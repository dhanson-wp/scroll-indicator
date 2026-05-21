export const SIZE_MAP = {
	S: '18px',
	M: '24px',
	L: '32px',
	XL: '48px',
};

const CSS_SIZE_PATTERN = /^(?:\d+|\d*\.\d+)(?:px|em|rem|vh|vw|vmin|vmax|%)$/;

export function getSizeValue( iconSize, customSizeValue ) {
	if ( iconSize === 'custom' ) {
		const sizeValue =
			typeof customSizeValue === 'string' ? customSizeValue.trim() : '';

		return CSS_SIZE_PATTERN.test( sizeValue ) ? sizeValue : '24px';
	}
	return SIZE_MAP[ iconSize ] || '24px';
}

export function MouseIcon() {
	return (
		<svg
			viewBox="0 0 24 38"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
			focusable="false"
		>
			<rect x="1" y="1" width="22" height="36" rx="11" ry="11" />
			<line
				x1="12"
				y1="8"
				x2="12"
				y2="16"
				strokeLinecap="round"
				className="scroll-wheel"
			/>
		</svg>
	);
}

export function ArrowDownIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M7 13l5 5 5-5" />
			<path d="M7 7l5 5 5-5" opacity="0.4" />
		</svg>
	);
}

export function ChevronBounceIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M6 9l6 6 6-6" />
		</svg>
	);
}

export function ScrollDotsIcon() {
	return (
		<svg
			viewBox="0 0 24 36"
			fill="currentColor"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="6" r="3" className="dot dot-1" />
			<circle cx="12" cy="18" r="3" className="dot dot-2" />
			<circle cx="12" cy="30" r="3" className="dot dot-3" />
		</svg>
	);
}

export function HandPointIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M9 11V6a2 2 0 0 1 4 0v5" />
			<path d="M13 11V8a2 2 0 0 1 4 0v5l1 3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-2a2 2 0 0 1 2-2h1" />
		</svg>
	);
}

export const ICON_COMPONENTS = {
	mouse: MouseIcon,
	'arrow-down': ArrowDownIcon,
	'chevron-bounce': ChevronBounceIcon,
	'scroll-dots': ScrollDotsIcon,
	'hand-point': HandPointIcon,
};

export function getIconType( iconType ) {
	return Object.prototype.hasOwnProperty.call( ICON_COMPONENTS, iconType )
		? iconType
		: 'mouse';
}

export function IconRenderer( { iconType } ) {
	const Component = ICON_COMPONENTS[ getIconType( iconType ) ];
	return <Component />;
}
