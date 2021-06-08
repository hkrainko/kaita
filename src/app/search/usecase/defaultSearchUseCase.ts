import {SearchSelection, SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";
import {SearchType} from "../../../domain/search/model/search-type";
import {SearchFilter} from "../../../domain/search/model/search-filter";
import {SearchSorter} from "../../../domain/search/model/search-sorter";

@injectable()
export class DefaultSearchUseCase implements SearchUseCase {

    getSearchTypeName(type: SearchType): string {
        switch (type) {
            case SearchType.OpenCommissions:
                return "開放委托"
            case SearchType.Artists:
                return "繪師"
            case SearchType.Artworks:
                return "作品"
        }
    }

    getSearchSelection(type: SearchType): SearchSelection | null {
        switch (type) {
            case SearchType.OpenCommissions:
                return {
                    type: SearchType.OpenCommissions,
                    groups: [
                        {
                            title: "價錢",
                            multipleSelection: false,
                            options: [
                                {name: '0-50'},
                                {name: '50-200'},
                                {name: '200-500'},
                                {name: '500-1000'},
                                {name: '>1000'}
                            ]
                        },
                        {
                            title: "需時",
                            multipleSelection: false,
                            options: [
                                {name: '0-1日'},
                                {name: '2-4日'},
                                {name: '4-7日'},
                                {name: '7-14日'},
                                {name: '>14日'}
                            ]
                        },
                        {
                            title: "其它",
                            multipleSelection: true,
                            options: [
                                {name: 'R18'},
                                {name: '不公開完成品'},
                                {name: '匿名委托'},
                            ]
                        },
                        {
                            title: "排序",
                            multipleSelection: false,
                            options: [
                                {name: '最低價錢'},
                                {name: '完成日數'},
                                {name: '新增日期'},
                            ]
                        }
                    ]
                }
            case SearchType.Artists:
                return {
                    type: SearchType.Artists,
                    groups: [
                        {
                            title: "註冊時間",
                            multipleSelection: false,
                            options: [
                                {name: '本星期'},
                                {name: '本月'},
                                {name: '三個月內'},
                                {name: '半年內'},
                                {name: '一年內'}
                            ]
                        },
                        {
                            title: "付款方式",
                            multipleSelection: true,
                            options: [
                                {name: 'Paypal'},
                                {name: '銀行匯款'},
                                {name: 'Alipay'},
                                {name: 'PayMe'},
                                {name: '7-11 ibon'},
                                {name: '信用卡'}
                            ]
                        },
                        {
                            title: "最後活躍時間",
                            multipleSelection: false,
                            options: [
                                {name: '本星期'},
                                {name: '本月'},
                                {name: '三個月內'},
                                {name: '半年內'},
                                {name: '一年內'}
                            ]
                        },
                        {
                            title: "排序",
                            multipleSelection: false,
                            options: [
                                {name: '評分'},
                                {name: '用戶名稱'},
                                {name: '註冊時間'},
                                {name: '最近被委托時間'},
                                {name: '最近接受委托時間'},
                                {name: '最近完成委托時間'},
                                {name: '最後活躍時間'},
                            ]
                        }
                    ]
                }
            case SearchType.Artworks:
                return {
                    type: SearchType.Artworks,
                    groups: [
                        {
                            title: "耗時",
                            multipleSelection: true,
                            options: [
                                {name: '0-1日'},
                                {name: '2-4日'},
                                {name: '4-7日'},
                                {name: '7-14日'},
                                {name: '>14日'}
                            ]
                        },
                        {
                            title: "其它",
                            multipleSelection: true,
                            options: [
                                {name: 'R18'},
                                {name: '匿名委托'},
                            ]
                        },
                        {
                            title: "完成時間",
                            multipleSelection: true,
                            options: [
                                {name: '本星期'},
                                {name: '本月'},
                                {name: '三個月內'},
                                {name: '半年內'},
                                {name: '一年內'}
                            ]
                        },
                        {
                            title: "排序",
                            multipleSelection: false,
                            options: [
                                {name: '耗時'},
                                {name: '評分'},
                                {name: '瀏覧數'},
                                {name: '收藏數'},
                                {name: '完成時間'},
                            ]
                        }
                    ]
                }
            default:
                return null
        }
    }

    getFilterFromSelection(type: SearchType, selection: boolean[][]): SearchFilter {
        return {
            type: SearchType.OpenCommissions,
            allowAnonymous: false,
            allowBePrivate: false,
            anonymous: false,
            completedTime: undefined,
            currency: undefined,
            dayNeed: undefined,
            dayUsed: undefined,
            isR18: false,
            lastRequestTime: undefined,
            paymentMethods: [],
            priceFromRange: undefined,
            priceToRange: undefined,
            regTime: undefined,
        }
    }

    getSorterFromSelection(type: SearchType, selection: boolean[][]): SearchSorter {
        return {
            type: SearchType.OpenCommissions,
            artistId: undefined,
            avgRatings: undefined,
            commissionAcceptCount: undefined,
            commissionRequestCount: undefined,
            commissionSuccessCount: undefined,
            completedTime: undefined,
            createTime: undefined,
            dayNeedFrom: undefined,
            dayNeedTo: undefined,
            dayUsed: undefined,
            favorCount: undefined,
            lastRequestTime: undefined,
            lastUpdatedTime: undefined,
            priceFrom: undefined,
            priceTo: undefined,
            rating: undefined,
            regTime: undefined,
            userName: undefined,
            views: undefined
        }
    }


}
