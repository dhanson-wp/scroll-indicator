import { useBlockProps } from '@wordpress/block-editor';
import { IconRenderer, getIconType, getSizeValue } from './icons';
import {
	getPositionClassNames,
	getPositionStyle,
	getFlowAlignment,
	getScreenPosition,
	getScreenPositionFromAlignment,
	getAlignmentClassName,
} from './position';

export default function save( { attributes } ) {
	const {
		iconType = 'mouse',
		iconSize = 'M',
		customSizeValue = '24px',
		align,
		showText = true,
		customText = 'Scroll down',
		positionMode = 'flow',
		screenPosition = 'bottom-center',
		absoluteX = 50,
		absoluteY = 85,
		flowAlign = 'center',
	} = attributes;

	const normalizedIconType = getIconType( iconType );
	const sizeValue = getSizeValue( iconSize, customSizeValue );
	const label = customText || 'Scroll down';
	const hasCoreAlignment = [ 'left', 'center', 'right' ].includes( align );
	const normalizedScreenPosition = hasCoreAlignment
		? getScreenPositionFromAlignment( align )
		: getScreenPosition( screenPosition );
	const normalizedFlowAlign = getFlowAlignment(
		hasCoreAlignment ? align : flowAlign
	);

	const blockProps = useBlockProps.save( {
		className: getPositionClassNames(
			positionMode,
			normalizedScreenPosition,
			normalizedFlowAlign
		)
			.concat( ' ', getAlignmentClassName( align ) )
			.trim(),
		style: {
			'--scroll-indicator-size': sizeValue,
			...getPositionStyle( positionMode, absoluteX, absoluteY ),
		},
	} );

	return (
		<div { ...blockProps }>
			<button
				type="button"
				className={ `scroll-indicator icon-${ normalizedIconType }` }
				aria-label={ label }
				data-hide-after-scrolling="true"
			>
				<IconRenderer iconType={ normalizedIconType } />
				{ showText && <div className="scroll-text">{ label }</div> }
			</button>
		</div>
	);
}
