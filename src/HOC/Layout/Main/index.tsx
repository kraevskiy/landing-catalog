import React, { lazy, Suspense } from 'react';
import { Container, LinearProgress } from '@mui/material';

const List = lazy(() => import('./../../../components/List'));
const Filter = lazy(() => import('./../../../components/Filter'));

const Main = () => {
	return (
		<Container
			component="main"
			sx={{
				pt: {xs: '84px', md: '88.5px'}
			}}
		>
			<Suspense fallback={<LinearProgress/>}>
				<Filter/>
			</Suspense>
			<Suspense fallback={<LinearProgress/>}>
				<List />
			</Suspense>
		</Container>
	);
};

export default Main;
