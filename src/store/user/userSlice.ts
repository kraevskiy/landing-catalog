import { createSlice } from '@reduxjs/toolkit';
import { initialAppState } from './userState';
import { handleSetRegistration } from './userReducers';

export const userSlice = createSlice({
	name: 'user',
	initialState: initialAppState,
	reducers: {
		setRegistration: handleSetRegistration
	}
});

export const {
	setRegistration
} = userSlice.actions;

export default userSlice.reducer;
