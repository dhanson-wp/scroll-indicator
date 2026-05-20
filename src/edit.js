import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import {
	desktop,
	dragHandle,
	positionCenter,
	positionLeft,
	positionRight,
} from '@wordpress/icons';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	ButtonGroup,
	Button,
	RangeControl,
} from '@wordpress/components';

import './editor.scss';
import {
	ICON_COMPONENTS,
	IconRenderer,
	getIconType,
	getSizeValue,
} from './icons';
import {
	getPositionClassNames,
	getPositionMode,
	getPositionStyle,
	getAbsoluteCoordinate,
	getScreenPosition,
} from './position';

const ICON_OPTIONS = [
	{ value: 'mouse', label: __( 'Mouse', 'scroll-indicator' ) },
	{ value: 'arrow-down', label: __( 'Arrow', 'scroll-indicator' ) },
	{
		value: 'chevron-bounce',
		label: __( 'Chevron', 'scroll-indicator' ),
	},
	{ value: 'scroll-dots', label: __( 'Dots', 'scroll-indicator' ) },
	{ value: 'hand-point', label: __( 'Hand', 'scroll-indicator' ) },
];

const SIZE_OPTIONS = [ 'S', 'M', 'L', 'XL', 'custom' ];

const POSITION_MODE_OPTIONS = [
	{ value: 'flow', label: __( 'Flow', 'scroll-indicator' ) },
	{ value: 'fixed', label: __( 'Fixed', 'scroll-indicator' ) },
	{ value: 'absolute', label: __( 'Absolute', 'scroll-indicator' ) },
];

const SCREEN_POSITION_OPTIONS = [
	{
		value: 'bottom-left',
		label: __( 'Bottom left', 'scroll-indicator' ),
		icon: positionLeft,
	},
	{
		value: 'bottom-center',
		label: __( 'Bottom center', 'scroll-indicator' ),
		icon: positionCenter,
	},
	{
		value: 'bottom-right',
		label: __( 'Bottom right', 'scroll-indicator' ),
		icon: positionRight,
	},
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		iconType = 'mouse',
		iconSize = 'M',
		customSizeValue = '24px',
		hideAfterScrolling = false,
		showText = true,
		customText = 'Scroll down',
		positionMode = 'flow',
		screenPosition = 'bottom-center',
		absoluteX = 50,
		absoluteY = 85,
	} = attributes;

	const blockRef = useRef();
	const normalizedIconType = getIconType( iconType );
	const sizeValue = getSizeValue( iconSize, customSizeValue );
	const normalizedPositionMode = getPositionMode( positionMode );
	const normalizedScreenPosition = getScreenPosition( screenPosition );
	const normalizedAbsoluteX = getAbsoluteCoordinate( absoluteX, 50 );
	const normalizedAbsoluteY = getAbsoluteCoordinate( absoluteY, 85 );

	function updateAbsolutePosition( event ) {
		const wrapper = blockRef.current;
		const canvas =
			wrapper?.closest( '.wp-block-cover' ) || wrapper?.parentElement;

		if ( ! canvas ) {
			return;
		}

		const canvasRect = canvas.getBoundingClientRect();

		if ( canvasRect.width === 0 || canvasRect.height === 0 ) {
			return;
		}

		setAttributes( {
			absoluteX: getAbsoluteCoordinate(
				( ( event.clientX - canvasRect.left ) / canvasRect.width ) *
					100,
				50
			),
			absoluteY: getAbsoluteCoordinate(
				( ( event.clientY - canvasRect.top ) / canvasRect.height ) *
					100,
				85
			),
		} );
	}

	function startAbsoluteDrag( event ) {
		if ( normalizedPositionMode !== 'absolute' || event.button !== 0 ) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		updateAbsolutePosition( event );

		const ownerDocument = event.currentTarget.ownerDocument;
		const handlePointerMove = ( moveEvent ) => {
			updateAbsolutePosition( moveEvent );
		};
		const handlePointerUp = () => {
			ownerDocument.removeEventListener(
				'pointermove',
				handlePointerMove
			);
			ownerDocument.removeEventListener( 'pointerup', handlePointerUp );
		};

		ownerDocument.addEventListener( 'pointermove', handlePointerMove );
		ownerDocument.addEventListener( 'pointerup', handlePointerUp );
	}

	const blockProps = useBlockProps( {
		ref: blockRef,
		className: getPositionClassNames(
			normalizedPositionMode,
			normalizedScreenPosition
		),
		style: {
			'--scroll-indicator-size': sizeValue,
			...getPositionStyle(
				normalizedPositionMode,
				normalizedAbsoluteX,
				normalizedAbsoluteY
			),
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'scroll-indicator' ) }
					initialOpen={ true }
				>
					<fieldset className="scroll-indicator-icon-picker">
						<legend>
							{ __( 'Icon Type', 'scroll-indicator' ) }
						</legend>
						<ButtonGroup className="scroll-indicator-icon-buttons">
							{ ICON_OPTIONS.map( ( option ) => {
								const IconComponent =
									ICON_COMPONENTS[ option.value ];
								return (
									<Button
										key={ option.value }
										className="scroll-indicator-icon-button"
										isPressed={ iconType === option.value }
										onClick={ () =>
											setAttributes( {
												iconType: option.value,
											} )
										}
										label={ option.label }
										showTooltip
									>
										<IconComponent />
									</Button>
								);
							} ) }
						</ButtonGroup>
					</fieldset>
					<fieldset className="scroll-indicator-size-picker">
						<legend>{ __( 'Size', 'scroll-indicator' ) }</legend>
						<ButtonGroup className="scroll-indicator-size-buttons">
							{ SIZE_OPTIONS.map( ( size ) => (
								<Button
									key={ size }
									isPressed={ iconSize === size }
									onClick={ () =>
										setAttributes( { iconSize: size } )
									}
								>
									{ size === 'custom'
										? __( 'Custom', 'scroll-indicator' )
										: size }
								</Button>
							) ) }
						</ButtonGroup>
						{ iconSize === 'custom' && (
							<TextControl
								label={ __(
									'Custom Size',
									'scroll-indicator'
								) }
								value={ customSizeValue }
								onChange={ ( value ) =>
									setAttributes( {
										customSizeValue: value,
									} )
								}
								help={ __(
									'Use a CSS size such as 24px, 2rem, or 3em.',
									'scroll-indicator'
								) }
							/>
						) }
					</fieldset>
				</PanelBody>
				<PanelBody
					title={ __( 'Position', 'scroll-indicator' ) }
					initialOpen={ false }
				>
					<fieldset className="scroll-indicator-position-picker">
						<legend>
							{ __( 'Position Mode', 'scroll-indicator' ) }
						</legend>
						<ButtonGroup className="scroll-indicator-mode-buttons">
							{ POSITION_MODE_OPTIONS.map( ( option ) => (
								<Button
									key={ option.value }
									isPressed={
										normalizedPositionMode === option.value
									}
									onClick={ () =>
										setAttributes( {
											positionMode: option.value,
										} )
									}
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</fieldset>
					{ normalizedPositionMode === 'fixed' && (
						<fieldset className="scroll-indicator-position-picker">
							<legend>
								{ __( 'Screen Position', 'scroll-indicator' ) }
							</legend>
							<ButtonGroup className="scroll-indicator-position-buttons">
								{ SCREEN_POSITION_OPTIONS.map( ( option ) => {
									const PositionIcon = option.icon;

									return (
										<Button
											key={ option.value }
											icon={ PositionIcon }
											label={ option.label }
											showTooltip
											isPressed={
												normalizedScreenPosition ===
												option.value
											}
											onClick={ () =>
												setAttributes( {
													screenPosition:
														option.value,
												} )
											}
										/>
									);
								} ) }
							</ButtonGroup>
						</fieldset>
					) }
					{ normalizedPositionMode === 'absolute' && (
						<div className="scroll-indicator-absolute-controls">
							<p>
								<span className="scroll-indicator-control-icon">
									{ dragHandle }
								</span>
								{ __(
									'Drag the indicator on the canvas, or fine-tune its position below.',
									'scroll-indicator'
								) }
							</p>
							<RangeControl
								label={ __( 'Horizontal', 'scroll-indicator' ) }
								value={ normalizedAbsoluteX }
								min={ 0 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { absoluteX: value } )
								}
							/>
							<RangeControl
								label={ __( 'Vertical', 'scroll-indicator' ) }
								value={ normalizedAbsoluteY }
								min={ 0 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { absoluteY: value } )
								}
							/>
						</div>
					) }
					{ normalizedPositionMode === 'fixed' && (
						<p className="scroll-indicator-position-note">
							<span className="scroll-indicator-control-icon">
								{ desktop }
							</span>
							{ __(
								"Fixed positioning pins the indicator to the visitor's screen.",
								'scroll-indicator'
							) }
						</p>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Text', 'scroll-indicator' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show text', 'scroll-indicator' ) }
						checked={ showText }
						onChange={ ( value ) =>
							setAttributes( { showText: value } )
						}
					/>
					{ showText && (
						<TextControl
							label={ __( 'Custom Text', 'scroll-indicator' ) }
							value={ customText }
							onChange={ ( value ) =>
								setAttributes( { customText: value } )
							}
							placeholder={ __(
								'Scroll down',
								'scroll-indicator'
							) }
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Behavior', 'scroll-indicator' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Hide after scrolling',
							'scroll-indicator'
						) }
						help={ __(
							'Hide the indicator once user starts scrolling',
							'scroll-indicator'
						) }
						checked={ hideAfterScrolling }
						onChange={ ( value ) =>
							setAttributes( { hideAfterScrolling: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div
					className={ `scroll-indicator icon-${ normalizedIconType }` }
					onPointerDown={ startAbsoluteDrag }
				>
					<IconRenderer iconType={ normalizedIconType } />
					{ showText && (
						<div className="scroll-text">
							{ customText ||
								__( 'Scroll down', 'scroll-indicator' ) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
