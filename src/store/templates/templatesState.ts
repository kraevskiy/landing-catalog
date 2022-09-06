import Api from '../../API';

export type TTemplate = {
	id: string | number;
	name: string;
	prelanding: boolean;
	demo: string;
	preview: string;
};

export interface TTemplatesState {
	page: number;
	perPage: number;
	count: number;
	list: TTemplate[];
}

export const initialTemplateState: TTemplatesState = Api.getData();
