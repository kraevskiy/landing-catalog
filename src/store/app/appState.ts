import { TTemplate } from '../templates/templatesState';

export type TContentModal = null | 'login' | 'registration' | 'preview';

export interface TAppState {
	openModal: boolean;
	typeModal: TContentModal;
	contentModal?: TTemplate;
}

export const initialAppState: TAppState = {
	openModal: false,
	typeModal: null,
};
