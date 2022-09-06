import _ from 'lodash';
import { TTemplate } from '../store/templates/templatesState';
import dataFromJson from './data.json';

interface TTypePagination {
	page?: number;
	perPage?: number;
}

export interface TTypeFilter extends TTypePagination {
	fullName?: string;
	searchName?: string;
	prelanding?: boolean
}

type TTypeAnswer = {
	list: TTemplate[];
	count: number;
	page: number;
	perPage: number;
};

class API {
	page = 0;
	perPage = 20;
	data: TTemplate[] = dataFromJson;
	filter: TTypeFilter | null = null;

	setPage(number: number): TTypeAnswer {
		this.page = number;
		return this.getData(this.filter);
	}

	setPerPage(number: number): TTypeAnswer {
		this.perPage = number;
		return this.getData(this.filter);
	}

	getData(filter?: TTypeFilter | null): TTypeAnswer {
		let resultFilter = [...this.data];
		if(filter){
			this.filter = filter;
			if('page' in filter && typeof filter.page === 'number') this.page = filter.page;
			if('perPage' in filter && typeof filter.perPage === 'number') this.perPage = filter.perPage;
			if('prelanding' in filter) {
				if(filter.prelanding){
					resultFilter = _.filter(resultFilter, (i) => i.prelanding === true);
				}
			}
			if('fullName' in filter) {
				if(filter.fullName?.length) resultFilter = _.filter(resultFilter, ['name', filter.fullName]);
			}
			if('searchName' in filter) {
				if((filter.searchName as string).includes(' ')) {
					const multipleRe = (filter.searchName as string).split(' ');
					multipleRe.forEach(mR => {
						if(mR.length){
							resultFilter = _.filter(resultFilter, (t) => t.name.includes(mR as string));
						}
					});
				} else {
					resultFilter = _.filter(resultFilter, (t) => t.name.includes(filter.searchName as string));
				}
			}
		}
		const result = resultFilter.length ? _.chunk<TTemplate>(resultFilter, filter?.perPage || this.perPage)[filter?.page || this.page] : [];
		return {
			list: result,
			count: resultFilter.length,
			page: this.page,
			perPage: this.perPage
		};
	}

	get getNames(): string[] {
		return this.data.map(item => item.name);
	}
}

const Api = new API();

export default Api;
