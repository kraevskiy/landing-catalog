import React from 'react';
import { Box, Grid } from '@mui/material';
import Logo from '../logo.svg';

const Footer = () => {

	return (
		<Box
			component="footer"
		>
			<Grid
				container
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
				pt={7}
				pb={5}
			>
				<Grid
					component={'img'}
					item
					src={Logo}
					mb={2}
				/>
				<Grid
					component={'a'}
					item
					mb={2}
					href={'mailto:info@g33.media'}
					sx={{
						color: '#ffffff',
						textDecoration: 'none',
						'&:hover': {
							color: '#868e96',
						}
					}}
				>
					info@g33.media
				</Grid>
				<Grid
					component={'p'}
					item
					color={'#868e96'}
					fontSize={'80%'}
				>
					© 2022 G33.Media
				</Grid>

			</Grid>
		</Box>
	);
};

export default Footer;
