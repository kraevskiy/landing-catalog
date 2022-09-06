export const NAME_TOKEN = 'auth-token';
export const REGISTER_TOKEN = 'register-token';

const decodeDate = (date: string): string => {
	return date.replaceAll('-', '*').replaceAll(':', '$');
};

const encodeDate = (date: string): string => {
	return date.replaceAll('*', '-').replaceAll('$', ':');
};

type TParsedJson = {
	data: {
		[key: string]: string | number
	};
	endDate: Date;
};

type RegisterData = {
	email: string;
	firstName: string;
	lastName: string;
};

type RegisterStorageDate = {
	user: RegisterData;
	registerDate: Date
};

interface TDataToConstructor {
	period?: number;
}

class Auth {
	countDate = 10;

	constructor(data?: TDataToConstructor) {
		if (data?.period) this.countDate = data.period;
	}

	createToken(data: { [key: string]: string | number }): void {
		const dataToString = JSON.stringify(data);
		const date = new Date();
		date.setDate(this.countDate);
		const finishDate = decodeDate(date.toISOString());
		const jsonRes = JSON.stringify({
			data: dataToString,
			endDate: finishDate
		});
		localStorage.setItem(NAME_TOKEN, window.btoa(jsonRes));
	}

	private static parseToken(): TParsedJson | null {
		const storageData = localStorage.getItem(NAME_TOKEN);
		if (!storageData) return null;
		const parsedRes = JSON.parse(window.atob(storageData));
		if (!('data' in parsedRes)) return null;
		if (!('endDate' in parsedRes)) return null;
		return {
			data: JSON.parse(parsedRes.data),
			endDate: new Date(encodeDate(parsedRes.endDate))
		};
	}

	getToken(): TParsedJson | null {
		return Auth.parseToken();
	}

	isRegistered(): boolean {
		const finishDate = this.getToken()?.endDate;
		const user = this.getToken()?.data;
		if (!finishDate) return false;
		const isExp: boolean = new Date() < new Date(finishDate);
		if (isExp && user) {
			this.createToken(user);
			return true;
		} else {
			return false;
		}
	}

	setRegisterDate(data: RegisterData): void {
		const dataToString = JSON.stringify(data);
		const finishDate = decodeDate(new Date().toISOString());
		const jsonRes = JSON.stringify({
			user: dataToString,
			registerDate: finishDate
		});
		localStorage.setItem(REGISTER_TOKEN, window.btoa(jsonRes));
	}

	private static parseRegisterToken(): RegisterStorageDate | null {
		const registerData = localStorage.getItem(REGISTER_TOKEN);
		if (!registerData) return null;
		const parsedRes = JSON.parse(window.atob(registerData));
		if (!('user' in parsedRes)) return null;
		if (!('registerDate' in parsedRes)) return null;
		return {
			registerDate: new Date(encodeDate(parsedRes.registerDate)),
			user: JSON.parse(parsedRes.user)
		};
	}

	getRegisterToken(): RegisterStorageDate | null {
		return Auth.parseRegisterToken();
	}

	isExpRegisterDate(user: RegisterData): boolean {
		const token = this.getRegisterToken();
		if(token){
			const userFromStorage = token.user;
			const checkFieldUser: boolean[] = [];
			for (const item in userFromStorage){
				const key = item as keyof RegisterData;
				checkFieldUser.push(userFromStorage[key] === user[key]);
			}
			const isCurrentUser = checkFieldUser.every(f => f);
			const isDateExp = new Date() < new Date(token.registerDate);
			if(isCurrentUser){
				if (isDateExp) {
					this.setRegisterDate(user);
					return true;
				} else {
					return false;
				}
			} else {
				this.setRegisterDate(user);
				return true;
			}
		} else {
			this.setRegisterDate(user);
			return true;
		}
	}
}

const auth = new Auth();

export default auth;
