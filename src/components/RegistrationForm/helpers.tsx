import { TFieldProps, TFieldPropsData } from './Field';
import { AccountCircle, Apartment, Email, InsertLink, LocationOn, Map, Password, PersonPin, RecordVoiceOver } from '@mui/icons-material';
import { getCodeList } from 'country-list';
import React from 'react';

export enum FormField {
	firstName = 'firstName',
	lastName = 'lastName',
	email = 'email',
	password = 'password',
	iAm = 'iAm',
	companyName = 'companyName',
	website = 'website',
	address = 'address',
	country = 'country',
	messenger = 'messenger',
	messengerId = 'messengerId',
}

export type TUser = {
	[key in FormField]: string
};

export const initialUserState: TUser = {
	[FormField.firstName]: '',
	[FormField.lastName]: '',
	[FormField.email]: '',
	[FormField.password]: '',
	[FormField.iAm]: '',
	[FormField.companyName]: '',
	[FormField.website]: '',
	[FormField.address]: '',
	[FormField.country]: '',
	[FormField.messenger]: '',
	[FormField.messengerId]: '',
};

export const formFields: Omit<TFieldProps, 'handler' | 'value'>[] = [
	{
		label: 'First Name',
		keyName: FormField.firstName,
		icon: <AccountCircle/>
	},
	{
		label: 'Last Name',
		keyName: FormField.lastName,
		icon: <AccountCircle/>
	},
	{
		label: 'Email',
		keyName: FormField.email,
		icon: <Email/>
	},
	{
		label: 'I am',
		keyName: FormField.iAm,
		icon: null
	},
	{
		label: 'Company Name',
		keyName: FormField.companyName,
		icon: <Apartment/>
	},
	{
		label: 'Website',
		keyName: FormField.website,
		icon: <InsertLink/>
	},
	{
		label: 'Address',
		keyName: FormField.address,
		icon: <Map/>
	},
	{
		label: 'Country',
		keyName: FormField.country,
		icon: <LocationOn/>
	},
	{
		label: 'Messenger',
		keyName: FormField.messenger,
		icon: <RecordVoiceOver/>
	},
	{
		label: 'Messenger ID',
		keyName: FormField.messengerId,
		icon: <PersonPin/>
	},
];

export const dataToSelects: {
	[key: string]: TFieldPropsData
} = {
	[FormField.country]: getCodeList(),
	[FormField.messenger]: {
		telegram: 'Telegram',
		skype: 'Skype',
		viber: 'Viber',
		whatsApp: 'WhatsApp',
		messenger: 'Messenger'
	}
};
