import React, { lazy, Suspense } from 'react';
import { Box, BoxProps, Pagination } from '@mui/material';
import { handleModal, setPageTemplate, useAppDispatch, useAppSelector } from '../../store';

const Card = lazy(() => import('./../Card'));

interface ListProps extends BoxProps {
}

const List: React.FC<ListProps> = ({
	...props
}) => {
	const {templates, user} = useAppSelector(state => state);
	const dispatch = useAppDispatch();

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
		if(user.registered){
			scrollToTop();
			dispatch(setPageTemplate(page - 1));
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	return (
		<Box>
			<Box
				mb={5}
				display={'grid'}
				gridTemplateColumns={{
					xs: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(3, 1fr)',
					lg: 'repeat(4, 1fr)',
					xl: 'repeat(5, 1fr)',
				}}
				gap={{
					xs: '10px',
					sm: '15px',
					md: '20px',
				}}
				{...props}
			>
				<Suspense
					fallback={'....'}
				>
					{
						templates.list.map((item) => (
							<Card
								key={item.name + item.demo}
								data={item}
							/>
						))
					}
				</Suspense>
			</Box>
			<Box
				display={'flex'}
				justifyContent={'center'}
			>
				{!!templates.list.length && <Pagination
					page={templates.page + 1}
					count={Math.ceil(templates.count / templates.perPage)}
					onChange={handleChangePage}
					color="primary"/>
				}
			</Box>
		</Box>
	);
};

export default List;
