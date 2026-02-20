import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	ButtonGroup,
	Button,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import './editor.scss';
import {
	ICON_COMPONENTS,
	IconRenderer,
	getSizeValue,
	SIZE_MAP,
} from './icons';

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

export default function Edit( { attributes, setAttributes } ) {
	const {
		iconType = 'mouse',
		iconSize = 'M',
		customSizeValue = '24px',
		hideAfterScrolling = false,
		showText = true,
		customText = 'Scroll down',
	} = attributes;

	const sizeValue = getSizeValue( iconSize, customSizeValue );

	const blockProps = useBlockProps( {
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
										isPressed={
											iconType === option.value
										}
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
						<legend>
							{ __( 'Size', 'scroll-indicator' ) }
						</legend>
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
							<UnitControl
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
								units={ [
									{
										value: 'px',
										label: 'px',
										default: 24,
									},
									{
										value: 'em',
										label: 'em',
										default: 1.5,
									},
									{
										value: 'rem',
										label: 'rem',
										default: 1.5,
									},
								] }
								min={ 0 }
							/>
						) }
					</fieldset>
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
							label={ __(
								'Custom Text',
								'scroll-indicator'
							) }
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
				<div className={ `scroll-indicator icon-${ iconType }` }>
					<IconRenderer iconType={ iconType } />
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
