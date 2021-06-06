import {SearchRepo} from "../../../../domain/search/search.repo";
import {injectable} from "inversify";
import {OpenCommissionsSearchFilter} from "../../../../domain/search/model/search-filter";
import {OpenCommissionsSearchSorter, SearchSorter, SortOrder} from "../../../../domain/search/model/search-sorter";
import {
    SearchOpenCommissionsRepoModel,
    SearchOpenCommissionsRepoModelMapper
} from "./model/search-open-commissions.repo.model";
import axios from "axios";
import {OpenCommissionsSearchResult} from "../../../../domain/search/model/search-result";
import {SearchType} from "../../../../domain/search/model/search-type";

@injectable()
export class HttpSearchRepo implements SearchRepo {

    apiPath = 'http://192.168.64.12:31398/api';

    searchOpenCommissionsRepoModelMapper = new SearchOpenCommissionsRepoModelMapper()

    searchOpenCommissions(text: string, filter: OpenCommissionsSearchFilter, sorter: OpenCommissionsSearchSorter, currentPage: number, pageSize: number): Promise<OpenCommissionsSearchResult> {

        const params = {
            s: text,
            t: SearchType.OpenCommissions,
            'price.from': filter.priceFromRange?.from,
            'price.to': filter.priceFromRange?.from,
            currency: filter.currency,
            'day-need.from': filter.dayNeed,
            'is-r18': filter.isR18,
            'allow-be-private': filter.allowBePrivate,
            'allow-anonymous': filter.allowAnonymous,
            'page.current': currentPage,
            'page.size': pageSize,
            'sort': this.getSorterStr(sorter)
        }

        return axios
            .get<SearchOpenCommissionsRepoModel>(`${this.apiPath}/search`,
            {params}
            )
            .then(resp => {
                return this.searchOpenCommissionsRepoModelMapper.mapFrom(resp.data)
            })
    }

    private getSorterStr(sorter: SearchSorter): string | undefined {
        switch (sorter.type) {
            case SearchType.OpenCommissions:
                if (sorter.artistId) {
                    return sorter.artistId === SortOrder.Descending ? '-artistId' : 'artistId'
                }
                if (sorter.priceFrom) {
                    return sorter.priceFrom === SortOrder.Descending ? '-price-from' : 'price-from'
                }
                if (sorter.priceTo) {
                    return sorter.priceTo === SortOrder.Descending ? '-price-to' : 'price-to'
                }
                if (sorter.dayNeedFrom) {
                    return sorter.dayNeedFrom === SortOrder.Descending ? '-day-need-from' : 'day-need-from'
                }
                if (sorter.dayNeedTo) {
                    return sorter.dayNeedTo === SortOrder.Descending ? '-day-need-to' : 'day-need-to'
                }
                if (sorter.createTime) {
                    return sorter.createTime === SortOrder.Descending ? '-create-time' : 'create-time'
                }
                if (sorter.lastUpdatedTime) {
                    return sorter.lastUpdatedTime === SortOrder.Descending ? '-last-updated-time' : 'last-updated-time'
                }
        }
        return undefined
    }

}
