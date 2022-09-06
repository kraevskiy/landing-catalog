import React, { lazy, Suspense } from 'react';
import { CircularProgress, Dialog } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { handleModal } from '../../store';
import { TContentModal } from '../../store/app/appState';
import { TTemplate } from '../../store/templates/templatesState';

const LogIn = lazy(() => import('../LogInForm'));
const Registration = lazy(() => import('../RegistrationForm'));
const PreviewTemplate = lazy(() => import('../PreviewTemplate'));

const Content: React.FC<{
	typeModal: TContentModal,
	content?: TTemplate
}> = ({typeModal, content}) => {
	switch (typeModal) {
		case 'login':
			return <LogIn />;
		case 'registration':
			return <Registration/>;
		case 'preview':
			return content ? <PreviewTemplate content={content}/> : null;
		default:
			return null;
	}
};

const Modal = () => {
	const {openModal, contentModal, typeModal} = useAppSelector(state => state.app);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(handleModal());
	};


	return (
		<Dialog
			onClose={handleClose}
			open={openModal}
			fullScreen={typeModal === 'preview'}
		>
			<Suspense fallback={<CircularProgress />}>
				<Content typeModal={typeModal} content={contentModal}/>
			</Suspense>
		</Dialog>
	);
};

export default Modal;
