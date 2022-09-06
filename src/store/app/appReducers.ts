import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { TTemplate } from '../templates/templatesState';
import { TAppState, TContentModal } from './appState';

interface THandleOpenModalPayload {
	openModal?: boolean;
	contentModal?: TTemplate;
	typeModal?: TContentModal;
}

type TPayloadActionHandleOpenModal = undefined | boolean | THandleOpenModalPayload;

export const handleOpenModal: CaseReducer<TAppState, PayloadAction<TPayloadActionHandleOpenModal>> = (state, action) => {
	if(typeof action.payload === 'object') return {...state, ...action.payload};
	if(typeof action.payload === 'boolean') return {...state, openModal: action.payload};
	return {...state, openModal: action.payload ? action.payload : !state.openModal};
};
