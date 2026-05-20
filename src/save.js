import { useBlockProps } from '@wordpress/block-editor';
import { IconRenderer, getSizeValue } from './icons';

export default function save( { attributes } ) {
	const {
		iconType = 'mouse',
		iconSize = 'M',
		customSizeValue = '24px',
		hideAfterScrolling = false,
		showText = true,
		customText = 'Scroll down',
	} = attributes;

	const sizeValue = getSizeValue( iconSize, customSizeValue );

	const blockProps = useBlockProps.save( {
		style: {
			'--scroll-indicator-size': sizeValue,
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className={ `scroll-indicator icon-${ iconType }` }
				role="button"
				tabIndex="0"
				aria-label={ customText || 'Scroll down' }
				data-hide-after-scrolling={
					hideAfterScrolling ? 'true' : 'false'
				}
			>
				<IconRenderer iconType={ iconType } />
				{ showText && (
					<div className="scroll-text">
						{ customText || 'Scroll down' }
					</div>
				) }
			</div>
		</div>
	);
}
