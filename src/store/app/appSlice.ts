import { createSlice } from '@reduxjs/toolkit';
import { handleOpenModal } from './appReducers';
import { initialAppState } from './appState';

export const appSlice = createSlice({
	name: 'app',
	initialState: initialAppState,
	reducers: {
		handleModal: handleOpenModal
	}
});

export const {
	handleModal
} = appSlice.actions;

export default appSlice.reducer;
