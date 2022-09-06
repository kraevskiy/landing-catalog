import React, { ChangeEvent, useMemo, useState } from 'react';
import { FilterProps } from './Filter.props';
import { Box, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Switch } from '@mui/material';
import { Search } from '@mui/icons-material';
import { handleModal, useAppDispatch, useAppSelector, filterTemplates } from '../../store';
import Api from '../../API';

type TFilter = {
	fullName?: string;
	searchName: string;
	prelanding: boolean;
};

const initialFilter: TFilter = {
	searchName: '',
	prelanding: false
};

const Filter: React.FC<FilterProps> = ({
	...props
}) => {
	const {templates, user} = useAppSelector(state => state);
	const [filter, setFilter] = useState<TFilter>(initialFilter);

	const dispatch = useAppDispatch();

	const names = useMemo(() => {
		return Api.getNames;
	}, []);

	const handleChangeSelect = (event: SelectChangeEvent) => {
		if(user.registered) {
			const value = event.target.value as string;
			setFilter(prevState => {
				const newState = {
					...prevState,
					fullName: value
				};
				dispatch(filterTemplates(newState));
				return newState;
			});
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
		if(user.registered) {
			const value = event.target.value as string;
			if (value !== ' ') setFilter(prevState => {
				const newState = {
					...prevState,
					searchName: value
				};
				dispatch(filterTemplates(newState));
				return newState;
			});
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
		if(user.registered) {
			const value = event.target.checked;
			setFilter(prevState => {
				const newState = {
					...prevState,
					prelanding: value
				};
				dispatch(filterTemplates(newState));
				return newState;
			});
		} else {
			dispatch(handleModal({openModal: true, typeModal: 'login'}));
		}
	};

	return (
		<Box
			component={'form'}
			noValidate
			autoComplete={'off'}
		>
			<Paper
				sx={{
					mb: 2,
					p: 1
				}}
				{...props}
			>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={12}
						sm={4}
					>
						<FormControl fullWidth>
							<InputLabel id="name-select">Name</InputLabel>
							<Select
								labelId="name-select"
								id="name-select-id"
								value={`${filter.fullName || ''}`}
								label="Name"
								onChange={handleChangeSelect}
							>
								<MenuItem value={''}>
									All
								</MenuItem>
								{
									names.map((n, i) => <MenuItem key={n+i} value={n} sx={!user.registered ? {
										filter: 'blur(4px)',
										userSelect: 'none'
									} : {}}>
										<span dangerouslySetInnerHTML={{__html: n.charAt(0).toUpperCase() + n.slice(1)}}/>
									</MenuItem>)
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
					>
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor="name_field">Name</InputLabel>
							<OutlinedInput
								label="Name"
								value={filter.searchName}
								onChange={handleChangeText}
								endAdornment={
									<InputAdornment position="end">
										<Search/>
									</InputAdornment>
								}
							/>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						alignItems={'center'}
						display={'flex'}
					>
						<FormControl fullWidth variant="outlined">
							<FormControlLabel control={<Switch checked={filter.prelanding} onChange={handleChangeSwitch}/>}
																label="Has prelanding"/>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

export default Filter;
