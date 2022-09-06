import { createSlice } from '@reduxjs/toolkit';
import { handleFilterTemplates, handlePageTemplates, handlePerPageTemplates } from './templatesReducers';
import { initialTemplateState } from './templatesState';

export const templatesSlice = createSlice({
	name: 'templates',
	initialState: initialTemplateState,
	reducers: {
		filterTemplates: handleFilterTemplates,
		setPageTemplate: handlePageTemplates,
		setPerPageTemplates: handlePerPageTemplates
	}
});

export const {
	filterTemplates,
	setPageTemplate,
	setPerPageTemplates
} = templatesSlice.actions;

export default templatesSlice.reducer;
