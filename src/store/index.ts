import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import templatesReducer from './templates/templatesSlice';
import userReducer from './user/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
	reducer: {
		app: appReducer,
		templates: templatesReducer,
		user: userReducer
	},
	// middleware: (getDefaultMiddleware) => {
	// 	return getDefaultMiddleware()
	// 		.concat(
	// 			apiPartner.middleware,
	// 			apiStatistic.middleware
	// 		);
	// }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export * from './templates/templatesSlice';
export * from './app/appSlice';
export * from './user/userSlice';
