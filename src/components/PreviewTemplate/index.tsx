import React from 'react';
import { handleModal, useAppDispatch } from '../../store';
import { Box, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TTemplate } from '../../store/templates/templatesState';

const PreviewTemplate:React.FC<{content: TTemplate}> = ({
	content
}) => {
	const dispatch = useAppDispatch();

	const handleCloseModal = () => {
		dispatch(handleModal(false));
	};

	return (
		<>
			<DialogTitle>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
				>
					{content.name}
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleCloseModal}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<img
						src={content.demo}
						alt={content.name}
						style={{
							maxWidth: '100%'
						}}
					/>
				</Box>
			</DialogContent>
		</>
	);
};

export default PreviewTemplate;
