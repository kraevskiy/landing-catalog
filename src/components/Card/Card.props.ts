import {CardProps as CardMuiProps} from '@mui/material';
import { TTemplate } from '../../store/templates/templatesState';

export interface CardProps extends CardMuiProps {
	data: TTemplate
}
