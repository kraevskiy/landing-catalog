import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from './userState';

export const handleSetRegistration: CaseReducer<TUser, PayloadAction<boolean | undefined>> = (state, action) => {
	return {...state, registered: typeof action.payload == 'boolean' ? action.payload : !state.registered};
};
