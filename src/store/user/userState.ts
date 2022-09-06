import auth from '../../helpers/auth';

export type TUser = {
	registered: boolean;
};

export const initialAppState: TUser = {
	registered: auth.isRegistered()
};
