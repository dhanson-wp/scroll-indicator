import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import {
	desktop,
	dragHandle,
	moveTo,
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
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';

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
	getFlowAlignment,
	getScreenPosition,
	getAlignmentFromScreenPosition,
	getScreenPositionFromAlignment,
	getAlignmentClassName,
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

const ICON_SIZE_OPTIONS = [
	{ value: 'S', label: __( 'Small', 'scroll-indicator' ), text: 'S' },
	{ value: 'M', label: __( 'Medium', 'scroll-indicator' ), text: 'M' },
	{ value: 'L', label: __( 'Large', 'scroll-indicator' ), text: 'L' },
	{ value: 'XL', label: __( 'Extra Large', 'scroll-indicator' ), text: 'XL' },
	{
		value: 'custom',
		label: __( 'Custom', 'scroll-indicator' ),
		text: __( 'Custom', 'scroll-indicator' ),
	},
];

const CUSTOM_SIZE_MIN = 12;
const CUSTOM_SIZE_MAX = 96;
const CUSTOM_SIZE_DEFAULT = 24;

const POSITION_MODE_OPTIONS = [
	{ value: 'flow', label: __( 'Flow', 'scroll-indicator' ) },
	{ value: 'fixed', label: __( 'Fixed', 'scroll-indicator' ) },
	{ value: 'absolute', label: __( 'Absolute', 'scroll-indicator' ) },
];

const FLOW_ALIGNMENT_OPTIONS = [
	{
		value: 'left',
		label: __( 'Align left', 'scroll-indicator' ),
		icon: positionLeft,
	},
	{
		value: 'center',
		label: __( 'Align center', 'scroll-indicator' ),
		icon: positionCenter,
	},
	{
		value: 'right',
		label: __( 'Align right', 'scroll-indicator' ),
		icon: positionRight,
	},
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

export default function Edit( { attributes, setAttributes, clientId } ) {
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

	const blockRef = useRef();
	const { selectBlock } = useDispatch( 'core/block-editor' );
	const normalizedIconType = getIconType( iconType );
	const sizeValue = getSizeValue( iconSize, customSizeValue );
	const normalizedPositionMode = getPositionMode( positionMode );
	const hasCoreAlignment = [ 'left', 'center', 'right' ].includes( align );
	const normalizedScreenPosition = hasCoreAlignment
		? getScreenPositionFromAlignment( align )
		: getScreenPosition( screenPosition );
	const normalizedAbsoluteX = getAbsoluteCoordinate( absoluteX, 50 );
	const normalizedAbsoluteY = getAbsoluteCoordinate( absoluteY, 85 );
	const normalizedFlowAlign = getFlowAlignment(
		hasCoreAlignment ? align : flowAlign
	);
	const toolbarAlignment = hasCoreAlignment ? align : normalizedFlowAlign;
	const customSizeNumber = getCustomSizeNumber( customSizeValue );

	function getCustomSizeNumber( value ) {
		const numericValue =
			typeof value === 'number' ? value : Number.parseFloat( value );

		if ( ! Number.isFinite( numericValue ) ) {
			return CUSTOM_SIZE_DEFAULT;
		}

		return Math.min(
			CUSTOM_SIZE_MAX,
			Math.max( CUSTOM_SIZE_MIN, numericValue )
		);
	}

	function setIconSize( nextIconSize ) {
		const nextAttributes = {
			iconSize: nextIconSize,
		};

		if ( nextIconSize === 'custom' ) {
			nextAttributes.customSizeValue = `${ customSizeNumber }px`;
		}

		setAttributes( nextAttributes );
	}

	function setAlignment( nextAlignment ) {
		const alignment = getFlowAlignment( nextAlignment || 'center' );

		if ( normalizedPositionMode === 'fixed' ) {
			setAttributes( {
				align: alignment,
				screenPosition: getScreenPositionFromAlignment( alignment ),
			} );
			return;
		}

		setAttributes( {
			align: alignment,
			flowAlign: alignment,
		} );
	}

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
		selectBlock( clientId );
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
			normalizedScreenPosition,
			normalizedFlowAlign
		)
			.concat( ' ', getAlignmentClassName( align ) )
			.trim(),
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
			<BlockControls group="block">
				{ normalizedPositionMode === 'absolute' ? (
					<ToolbarGroup>
						<ToolbarButton
							icon={ moveTo }
							label={ __(
								'Drag on canvas to position',
								'scroll-indicator'
							) }
							onClick={ () => selectBlock( clientId ) }
						/>
					</ToolbarGroup>
				) : (
					<AlignmentToolbar
						value={ toolbarAlignment }
						onChange={ setAlignment }
					/>
				) }
			</BlockControls>
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
										<span
											className={ `scroll-indicator-icon-preview icon-${ option.value }` }
										>
											<IconComponent />
										</span>
									</Button>
								);
							} ) }
						</ButtonGroup>
					</fieldset>
					<fieldset className="scroll-indicator-size-picker">
						<legend>
							{ __( 'Icon Size', 'scroll-indicator' ) }
						</legend>
						<ButtonGroup className="scroll-indicator-size-buttons">
							{ ICON_SIZE_OPTIONS.map( ( option ) => (
								<Button
									key={ option.value }
									isPressed={ iconSize === option.value }
									label={ option.label }
									showTooltip
									onClick={ () =>
										setIconSize( option.value )
									}
								>
									{ option.text }
								</Button>
							) ) }
						</ButtonGroup>
						{ iconSize === 'custom' && (
							<RangeControl
								label={ __(
									'Custom size',
									'scroll-indicator'
								) }
								value={ customSizeNumber }
								min={ CUSTOM_SIZE_MIN }
								max={ CUSTOM_SIZE_MAX }
								step={ 1 }
								renderTooltipContent={ ( value ) =>
									`${ value }px`
								}
								onChange={ ( value ) =>
									setAttributes( {
										customSizeValue: `${
											value || CUSTOM_SIZE_DEFAULT
										}px`,
									} )
								}
							/>
						) }
					</fieldset>
					<ToggleControl
						label={ __( 'Show text', 'scroll-indicator' ) }
						checked={ showText }
						onChange={ ( value ) =>
							setAttributes( { showText: value } )
						}
					/>
					{ showText && (
						<TextControl
							__next40pxDefaultSize
							label={ __( 'Text', 'scroll-indicator' ) }
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
					{ normalizedPositionMode === 'flow' && (
						<fieldset className="scroll-indicator-position-picker">
							<legend>
								{ __( 'Alignment', 'scroll-indicator' ) }
							</legend>
							<ButtonGroup className="scroll-indicator-position-buttons">
								{ FLOW_ALIGNMENT_OPTIONS.map( ( option ) => {
									const AlignmentIcon = option.icon;

									return (
										<Button
											key={ option.value }
											icon={ AlignmentIcon }
											label={ option.label }
											showTooltip
											isPressed={
												normalizedFlowAlign ===
												option.value
											}
											onClick={ () =>
												setAttributes( {
													flowAlign: option.value,
													align: option.value,
												} )
											}
										/>
									);
								} ) }
							</ButtonGroup>
						</fieldset>
					) }
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
													align: getAlignmentFromScreenPosition(
														option.value
													),
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
