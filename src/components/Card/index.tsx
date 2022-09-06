import React, { useState } from 'react';
import { Button, ButtonGroup, Card as MUICard, CardHeader, CardMedia, Skeleton, useTheme } from '@mui/material';
import { CardProps } from './Card.props';
import { handleModal, useAppDispatch, useAppSelector } from '../../store';

const Card: React.FC<CardProps> = ({
	data,
	...props
}) => {
	const theme = useTheme();
	const [loading, setLoading] = useState(true);
	const {user} = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const {name, preview, prelanding} = data;
	const onLoad = () => {
		setLoading(false);
	};

	const handleClickLp = () => {
		if(user.registered){
			console.log('handleClickLp');
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	const handleClickCreatives = () => {
		if(user.registered){
			console.log('handleClickCreatives');
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	const handlePreview = () => {
		if(user.registered){
			dispatch(handleModal({openModal: true, typeModal: 'preview', contentModal: data}));
			console.log('handlePreview');
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	return (
		<MUICard
			sx={{
				display: 'flex',
				flexDirection: 'column'
			}}
			{...props}
		>
			<CardHeader
				title={<span dangerouslySetInnerHTML={{__html: name}} style={!user.registered ? {
					filter: 'blur(4px)',
					pointerEvents: 'none',
					userSelect: 'none'
				} : {}}/>}
				titleTypographyProps={{fontSize: theme.typography.h6.fontSize}}
				sx={{
					marginBottom: 'auto',
					'&:hover': {
						cursor: 'pointer',
						textDecoration: 'underline'
					}
				}}
				onClick={handlePreview}
			/>
			{loading && <Skeleton sx={{height: 190}} animation="wave" variant="rectangular"/>}
			<CardMedia
				sx={{
					objectPosition: 'top',
					'&:hover': {
						cursor: 'pointer',
						opacity: 0.9
					}
				}}
				onClick={handlePreview}
				component="img"
				height={loading ? 0 : 190}
				image={preview}
				alt={name}
				loading="lazy"
				onLoad={onLoad}
			/>
			{
				loading
					? <Skeleton sx={{height: 38, width: '100%', mt: '4px'}} animation="wave" variant="rectangular"/>
					: <ButtonGroup
						variant="text"
						size={'large'}
						fullWidth
					>
						<Button
							variant={'contained'}
							color={'success'}
							onClick={handleClickLp}
							sx={{
								borderTopLeftRadius: 0
							}}
						>
							Get LP
						</Button>
						<Button
							variant={'contained'}
							color={'info'}
							onClick={handleClickCreatives}
							sx={{
								borderTopRightRadius: 0
							}}
							disabled={!prelanding}
						>
							Get Creatives
						</Button>
					</ButtonGroup>
			}
		</MUICard>
	);
};

export default Card;
