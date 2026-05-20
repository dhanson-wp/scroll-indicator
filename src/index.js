import { registerBlockType } from '@wordpress/blocks';
import { arrowDown } from '@wordpress/icons';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: arrowDown,
	edit: Edit,
	save,
} );
