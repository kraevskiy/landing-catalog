import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import Api, { TTypeFilter } from '../../API';
import { TTemplatesState } from './templatesState';

export const handleFilterTemplates: CaseReducer<TTemplatesState, PayloadAction<TTypeFilter>> = (state, action) => {
	return Api.getData(action.payload);
};

export const handlePageTemplates: CaseReducer<TTemplatesState, PayloadAction<number>> = (state, action) => {
	return Api.setPage(action.payload);
};

export const handlePerPageTemplates: CaseReducer<TTemplatesState, PayloadAction<number>> = (state, action) => {
	return Api.setPerPage(action.payload);
};
