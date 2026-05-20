import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	ButtonGroup,
	Button,
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

const SCREEN_POSITION_OPTIONS = [
	{ value: 'bottom-left', label: __( 'Bottom left', 'scroll-indicator' ) },
	{
		value: 'bottom-center',
		label: __( 'Bottom center', 'scroll-indicator' ),
	},
	{ value: 'bottom-right', label: __( 'Bottom right', 'scroll-indicator' ) },
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
	} = attributes;

	const normalizedIconType = getIconType( iconType );
	const sizeValue = getSizeValue( iconSize, customSizeValue );
	const normalizedPositionMode = getPositionMode( positionMode );
	const normalizedScreenPosition = getScreenPosition( screenPosition );

	const blockProps = useBlockProps( {
		className: getPositionClassNames(
			normalizedPositionMode,
			normalizedScreenPosition
		),
		style: {
			'--scroll-indicator-size': sizeValue,
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
					<ToggleControl
						label={ __(
							'Use absolute positioning',
							'scroll-indicator'
						) }
						help={ __(
							'Pin the indicator to the bottom of its containing section, such as a Cover block.',
							'scroll-indicator'
						) }
						checked={ normalizedPositionMode === 'absolute' }
						onChange={ ( value ) =>
							setAttributes( {
								positionMode: value ? 'absolute' : 'flow',
							} )
						}
					/>
					{ normalizedPositionMode === 'absolute' && (
						<fieldset className="scroll-indicator-position-picker">
							<legend>
								{ __( 'Screen Position', 'scroll-indicator' ) }
							</legend>
							<ButtonGroup className="scroll-indicator-position-buttons">
								{ SCREEN_POSITION_OPTIONS.map( ( option ) => (
									<Button
										key={ option.value }
										isPressed={
											normalizedScreenPosition ===
											option.value
										}
										onClick={ () =>
											setAttributes( {
												screenPosition: option.value,
											} )
										}
									>
										{ option.label }
									</Button>
								) ) }
							</ButtonGroup>
						</fieldset>
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
