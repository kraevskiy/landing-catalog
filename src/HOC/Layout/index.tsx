import React, { lazy, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import Modal from '../../components/Modal';
import { setRegistration, useAppDispatch } from '../../store';

const Header = lazy(() => import('./Header'));
const Main = lazy(() => import('./Main'));
const Footer = lazy(() => import('./Footer'));


const Layout = () => {
	const dispatch = useAppDispatch();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window['registerMe'] = () => dispatch(setRegistration());
	return (
		<>
			<Modal/>
			<Suspense fallback={<LinearProgress/>}>
				<Header/>
			</Suspense>
			<Suspense fallback={<LinearProgress/>}>
				<Main/>
			</Suspense>
			<Suspense fallback={<LinearProgress/>}>
				<Footer/>
			</Suspense>
		</>
	);
};

export default Layout;
