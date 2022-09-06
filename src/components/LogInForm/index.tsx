import React, { useRef, useState } from 'react';
import { Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { handleModal, setRegistration, useAppDispatch } from '../../store';
import { request } from '../../helpers/request';
import auth from '../../helpers/auth';

type TUser = {
	login: string;
	password: string;
};

interface TAuthError {
	code: 403;
	message: string;
}

interface TAuthSuccess {
	user: string;
}

const LogInForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const loginRef = useRef<null | HTMLInputElement>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [user, setUser] = useState<TUser>({
		login: '',
		password: ''
	});
	const dispatch = useAppDispatch();

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleChange = (prop: keyof TUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user, [prop]: event.target.value
		});
	};

	const handleSignIn = async () => {
		setLoading(true);
		try {
			const res = await request<TAuthError | TAuthSuccess>('/auth.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({user})
			});
			if('code' in res && res.code === 403){
				alert(res.message);
			} else {
				auth.createToken(user);
				dispatch(setRegistration(true));
			}
		} catch (err){
			console.log(err);
		}
		setLoading(false);
	};

	const handleOpenRegistration = () => {
		dispatch(handleModal({typeModal: 'registration'}));
	};

	return (
		<>
			<DialogTitle>
				Log In
			</DialogTitle>
			<DialogContent>
				<Box
					component={'form'}
					noValidate
				>
					<FormControl
						sx={{
							marginTop: 2,
							marginBottom: 2,
						}}
						fullWidth
						variant="outlined"
					>
						<InputLabel htmlFor="login_field">Login</InputLabel>
						<OutlinedInput
							id="login_field"
							inputRef={loginRef}
							onChange={handleChange('login')}
							value={user.login}
							endAdornment={
								<InputAdornment position="start">
									<IconButton
										edge="end"
										onClick={() => {
											loginRef?.current?.focus();
										}}
									>
										<AccountCircle/>
									</IconButton>
								</InputAdornment>
							}
							label="Login"
						/>
					</FormControl>
					<FormControl fullWidth variant="outlined">
						<InputLabel htmlFor="password_field">Password</InputLabel>
						<OutlinedInput
							id="password_field"
							autoComplete={'off'}
							onChange={handleChange('password')}
							type={showPassword ? 'text' : 'password'}
							value={user.password}
							endAdornment={
								<InputAdornment position="start">
									<IconButton
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff/> : <Visibility/>}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
				</Box>
			</DialogContent>
			<DialogActions>
				<Grid container flexDirection={'column'} rowGap={1}>
					<Button
						onClick={handleSignIn}
						autoFocus color={'success'}
						variant={'contained'}
					>
						Log In
						{
							loading && <CircularProgress size={16} color={'warning'} sx={{marginRight: 1}}/>
						}
					</Button>
					<Divider>
						Or
					</Divider>
					<Button
						onClick={handleOpenRegistration}
						autoFocus color={'info'}
						variant={'contained'}
					>
						Registration
					</Button>
				</Grid>
			</DialogActions>
		</>
	);
};

export default LogInForm;
