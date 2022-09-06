import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent } from '@mui/material';
import { FormField } from './helpers';

export type TFieldPropsData = { [key: string]: string };

export type TFieldProps = {
	label: string;
	keyName: FormField;
	handler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
	icon: React.ReactNode;
	value: string;
	data?: TFieldPropsData;
};

const Field: React.FC<TFieldProps> = React.memo(({
	label,
	keyName,
	handler,
	icon,
	data,
	value
}) => {
	return <Grid
		item
		xs={12}
		sm={keyName === FormField.iAm ? 12 : 6}
	>
		<FormControl
			fullWidth
			variant="outlined"
		>
			{
				keyName === FormField.iAm
					? <>
						<FormLabel id={`${FormField[keyName]}_field`} sx={{textAlign: 'center'}}>{label}</FormLabel>
						<RadioGroup
							row
							aria-labelledby={`${FormField[keyName]}_field`}
							name={`${FormField[keyName]}_field`}
							sx={{
								width: '100%',
								justifyContent: 'center'
							}}
							value={value}
							onChange={handler}
						>
							<FormControlLabel value="Individual / Affiliates Team" control={<Radio/>}
																label="Individual / Affiliates Team"/>
							<FormControlLabel value="Company" control={<Radio/>} label="Company"/>
						</RadioGroup>
					</>
					: <>
						<InputLabel htmlFor={`${FormField[keyName]}_field`}>{label}</InputLabel>
						{
							data
								? <Select
									labelId={`${FormField[keyName]}_field`}
									id={`${FormField[keyName]}_field`}
									value={value}
									label={label}
									onChange={handler}
									endAdornment={<InputAdornment position="end" children={icon}/>}
									sx={{
										'.MuiSelect-icon': {
											right: '40px'
										}
									}}
								>
									<MenuItem value={''}>None</MenuItem>
									{
										Object.entries(data || {})?.map(d => <MenuItem key={d[0] + d[1]} value={d[1]}>{d[1]}</MenuItem>)
									}
								</Select>
								: <OutlinedInput
									id={`${FormField[keyName]}_field`}
									onChange={handler}
									value={value}
									label={label}
									endAdornment={
										<InputAdornment position="end" children={icon}/>
									}
								/>
						}
					</>
			}

		</FormControl>
	</Grid>;
});

export default Field;
