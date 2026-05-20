import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import { MouseIcon } from './icons';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: <MouseIcon />,
	edit: Edit,
	save,
} );
