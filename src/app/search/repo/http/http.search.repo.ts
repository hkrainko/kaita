import {SearchRepo} from "../../../../domain/search/search.repo";
import {injectable} from "inversify";
import {
    ArtistsSearchFilter,
    ArtworksSearchFilter,
    OpenCommissionsSearchFilter
} from "../../../../domain/search/model/search-filter";
import {
    ArtistsSearchSorter,
    ArtworksSearchSorter,
    OpenCommissionsSearchSorter,
    SearchSorter,
    SortOrder
} from "../../../../domain/search/model/search-sorter";
import {
    SearchOpenCommissionsRepoModel,
    SearchOpenCommissionsRepoModelMapper
} from "./model/search-open-commissions.repo.model";
import axios from "axios";
import {
    ArtistsSearchResult,
    ArtworksSearchResult,
    OpenCommissionsSearchResult
} from "../../../../domain/search/model/search-result";
import {SearchType} from "../../../../domain/search/model/search-type";
import {SearchArtistsRepoModel, SearchArtistsRepoModelMapper} from "./model/search-artists.repo.model";
import {SearchArtworksRepoModel, SearchArtworksRepoModelMapper} from "./model/search-artworks.repo.model";
import config from "../../../config";

@injectable()
export class HttpSearchRepo implements SearchRepo {

    apiPath = config.API_PATH;

    searchOpenCommissionsRepoModelMapper = new SearchOpenCommissionsRepoModelMapper()
    searchArtistsRepoModelMapper = new SearchArtistsRepoModelMapper()
    searchArtworksRepoModelMapper = new SearchArtworksRepoModelMapper()

    searchOpenCommissions(text: string, filter: OpenCommissionsSearchFilter, sorter: OpenCommissionsSearchSorter, currentPage: number, pageSize: number): Promise<OpenCommissionsSearchResult> {

        const params = {
            s: text,
            t: SearchType.OpenCommissions,
            'price.from': filter.priceFromRange?.from,
            'price.to': filter.priceFromRange?.to,
            currency: filter.currency,
            'day-need.from': filter.dayNeed?.from,
            'day-need.to': filter.dayNeed?.to,
            'is-r18': filter.isR18,
            'allow-be-private': filter.allowBePrivate,
            'allow-anonymous': filter.allowAnonymous,
            'page.current': currentPage,
            'page.size': pageSize,
            'sort': HttpSearchRepo.getSorterStr(sorter)
        }

        return axios
            .get<SearchOpenCommissionsRepoModel>(`${this.apiPath}/search`,
                {params}
            )
            .then(resp => {
                return this.searchOpenCommissionsRepoModelMapper.mapFrom(resp.data)
            })
    }

    searchArtists(text: string, filter: ArtistsSearchFilter, sorter: ArtistsSearchSorter, currentPage: number, pageSize: number): Promise<ArtistsSearchResult> {

        const params = {
            s: text,
            t: SearchType.Artists,
            'reg-time.from': filter.regTime?.from,
            'reg-time.to': filter.regTime?.to,
            'payment-methods': filter.paymentMethods && filter.paymentMethods.length > 0 ? filter.paymentMethods.join(',') : undefined,
            'last-request-time.from': filter.lastRequestTime?.from,
            'last-request-time.to': filter.lastRequestTime?.to,
            'page.current': currentPage,
            'page.size': pageSize,
            'sort': HttpSearchRepo.getSorterStr(sorter)
        }

        return axios
            .get<SearchArtistsRepoModel>(`${this.apiPath}/search`,
                {params}
            )
            .then(resp => {
                return this.searchArtistsRepoModelMapper.mapFrom(resp.data)
            })
    }

    searchArtworks(text: string, filter: ArtworksSearchFilter, sorter: ArtworksSearchSorter, currentPage: number, pageSize: number): Promise<ArtworksSearchResult> {
        const params = {
            s: text,
            t: SearchType.Artworks,
            'day-used.from': filter.dayUsed?.from,
            'day-used.to': filter.dayUsed?.to,
            'is-r18': filter.isR18,
            'anonymous': filter.anonymous,
            'completed-time.from': filter.completedTime?.from,
            'completed-time.to': filter.completedTime?.to,
            'page.current': currentPage,
            'page.size': pageSize,
            'sort': HttpSearchRepo.getSorterStr(sorter)
        }

        return axios
            .get<SearchArtworksRepoModel>(`${this.apiPath}/search`,
                {params}
            )
            .then(resp => {
                return this.searchArtworksRepoModelMapper.mapFrom(resp.data)
            })
    }

    private static getSorterStr(sorter: SearchSorter): string | undefined {
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
                return undefined
            case SearchType.Artists:
                if (sorter.userName) {
                    return sorter.userName === SortOrder.Descending ? '-account-name' : 'account-name'
                }
                if (sorter.regTime) {
                    return sorter.regTime === SortOrder.Descending ? '-reg-time' : 'reg-time'
                }
                if (sorter.commissionRequestCount) {
                    return sorter.commissionRequestCount === SortOrder.Descending ? '-commission-request-count' : 'commission-request-count'
                }
                if (sorter.commissionAcceptCount) {
                    return sorter.commissionAcceptCount === SortOrder.Descending ? '-commission-accept-count' : 'commission-accept-count'
                }
                if (sorter.commissionSuccessCount) {
                    return sorter.commissionSuccessCount === SortOrder.Descending ? '-commission-success-count' : 'commission-success-count'
                }
                if (sorter.avgRatings) {
                    return sorter.avgRatings === SortOrder.Descending ? '-avg-ratings' : 'avg-ratings'
                }
                if (sorter.lastRequestTime) {
                    return sorter.lastRequestTime === SortOrder.Descending ? '-last-request-time' : 'last-request-time'
                }
                return undefined
            case SearchType.Artworks:
                if (sorter.dayUsed) {
                    return sorter.dayUsed === SortOrder.Descending ? '-day-used' : 'day-used'
                }
                if (sorter.rating) {
                    return sorter.rating === SortOrder.Descending ? '-rating' : 'rating'
                }
                if (sorter.views) {
                    return sorter.views === SortOrder.Descending ? '-views' : 'views'
                }
                if (sorter.favorCount) {
                    return sorter.favorCount === SortOrder.Descending ? '-favor-count' : 'favor-count'
                }
                if (sorter.completedTime) {
                    return sorter.completedTime === SortOrder.Descending ? '-completed-time' : 'completed-time'
                }
                return undefined
            default:
                break
        }
        return undefined
    }
}
