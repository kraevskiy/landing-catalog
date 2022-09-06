import React from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Logo from './../logo.svg';
import { handleModal, setRegistration, useAppDispatch, useAppSelector } from '../../../store';
import { NAME_TOKEN } from '../../../helpers/auth';

const Header = () => {
	const {user} = useAppSelector(state => state);
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = (openModal?: boolean) => {
		setAnchorElNav(null);
		if (openModal && !user.registered) {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		} else {
			localStorage.removeItem(NAME_TOKEN);
			dispatch(setRegistration(false));
		}
	};

	return (
		<AppBar position="fixed">
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{justifyContent: 'center'}}>
					<Box
						component="img"
						src={Logo}
						sx={{display: {xs: 'none', md: 'flex'}, mr: 1, ml: 'auto'}}
					/>
					<Box sx={{display: {xs: 'none', md: 'flex'}, mr: 'auto'}}>
						<Button
							onClick={() => handleCloseNavMenu(true)}
							sx={{my: 2, color: 'white', display: 'block'}}
						>
							Sign In
						</Button>
					</Box>

					<Box
						component="img"
						src={Logo}
						sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}
					/>
					<Box sx={{display: {xs: 'flex', md: 'none'}, ml: 'auto'}}>
						<IconButton
							size="large"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={() => handleCloseNavMenu()}
							sx={{
								display: {xs: 'block', md: 'none'},
							}}
						>
							<MenuItem onClick={() => handleCloseNavMenu(true)}>
								<Typography textAlign="center">{user.registered ? 'Sign Out' : 'Sign In'}</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
