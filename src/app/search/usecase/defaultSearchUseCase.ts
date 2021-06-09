import {SearchSelection, SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";
import {SearchType} from "../../../domain/search/model/search-type";
import {
    ArtistsSearchFilter,
    ArtworksSearchFilter,
    OpenCommissionsSearchFilter,
    SearchFilter
} from "../../../domain/search/model/search-filter";
import {
    ArtistsSearchSorter,
    ArtworksSearchSorter,
    OpenCommissionsSearchSorter,
    SearchSorter,
    SortOrder
} from "../../../domain/search/model/search-sorter";
import moment from "moment";

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

    openCommissionSearchSelection: SearchSelection<OpenCommissionsSearchFilter, OpenCommissionsSearchSorter> = {
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
                ],
                compose: (filter: OpenCommissionsSearchFilter, selection: boolean[]): OpenCommissionsSearchFilter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return filter
                    }
                    switch (selectedIndex) {
                        case 0:
                            filter.priceFromRange = {from: 0, to: 50};
                            return filter
                        case 1:
                            filter.priceFromRange = {from: 0, to: 50};
                            return filter
                        case 2:
                            filter.priceFromRange = {from: 0, to: 50};
                            return filter
                        case 3:
                            filter.priceFromRange = {from: 0, to: 50};
                            return filter
                        case 4:
                            filter.priceFromRange = {from: 0, to: 50};
                            return filter
                        default:
                            return filter
                    }
                }
            },
            {
                title: "需時",
                multipleSelection: false,
                options: [
                    {name: '0-1日'},
                    {name: '2-4日'},
                    {name: '4-7日'},
                    {name: '8-14日'},
                    {name: '>14日'}
                ],
                compose: (filter: OpenCommissionsSearchFilter, selection: boolean[]): OpenCommissionsSearchFilter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return filter
                    }
                    switch (selectedIndex) {
                        case 0:
                            filter.dayNeed = {from: 0, to: 1};
                            return filter
                        case 1:
                            filter.dayNeed = {from: 2, to: 4};
                            return filter
                        case 2:
                            filter.dayNeed = {from: 4, to: 7};
                            return filter
                        case 3:
                            filter.dayNeed = {from: 8, to: 14};
                            return filter
                        case 4:
                            filter.dayNeed = {from: 14, to: 1000};
                            return filter
                        default:
                            return filter
                    }
                }
            },
            {
                title: "其它",
                multipleSelection: true,
                options: [
                    {name: 'R18'},
                    {name: '不公開完成品'},
                    {name: '匿名委托'},
                ],
                compose: (filter: OpenCommissionsSearchFilter, selection: boolean[]): OpenCommissionsSearchFilter => {
                    filter.isR18 = selection.length > 0 ? selection[0] : false
                    filter.allowBePrivate = selection.length > 1 ? selection[1] : false
                    filter.allowAnonymous = selection.length > 2 ? selection[2] : false
                    return filter
                }
            },
            {
                title: "排序",
                multipleSelection: false,
                options: [
                    {name: '最低價錢'},
                    {name: '完成日數'},
                    {name: '新增日期'},
                ],
                compose: (sorter: OpenCommissionsSearchSorter, selection: boolean[]): OpenCommissionsSearchSorter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 3) {
                        return sorter
                    }
                    switch (selectedIndex) {
                        case 0:
                            sorter.priceFrom = SortOrder.Ascending
                            return sorter
                        case 1:
                            sorter.dayNeedFrom = SortOrder.Ascending
                            return sorter
                        case 2:
                            sorter.createTime = SortOrder.Descending
                            return sorter
                        default:
                            return sorter
                    }
                }
            }
        ]
    }

    artistsSearchSelection: SearchSelection<ArtistsSearchFilter, ArtistsSearchSorter> = {
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
                ],
                compose: (filter: ArtistsSearchFilter, selection: boolean[]): ArtistsSearchFilter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return filter
                    }
                    switch (selectedIndex) {
                        case 0:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(7, 'days').toDate().toDateString()
                            };
                            return filter
                        case 1:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(1, 'months').toDate().toDateString()
                            };
                            return filter
                        case 2:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(3, 'months').toDate().toDateString()
                            };
                            return filter
                        case 3:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(6, 'months').toDate().toDateString()
                            };
                            return filter
                        case 4:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(1, 'years').toDate().toDateString()
                            };
                            return filter
                        default:
                            return filter
                    }
                }
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
                ],
                compose: (filter: ArtistsSearchFilter, selection: boolean[]): ArtistsSearchFilter => {
                    let methods: string[] = []
                    selection.forEach((s, i) => {
                        if (s) {
                            switch (i) {
                                case 0:
                                    methods.push('Paypal')
                                    break
                                case 1:
                                    methods.push('銀行匯款')
                                    break
                                case 2:
                                    methods.push('Alipay')
                                    break
                                case 3:
                                    methods.push('PayMe')
                                    break
                                case 4:
                                    methods.push('7-11 ibon')
                                    break
                                case 5:
                                    methods.push('信用卡')
                                    break
                            }
                        }
                    })
                    filter.paymentMethods = methods.length > 0 ? methods : undefined
                    return filter
                }
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
                ],
                compose: (filter: ArtistsSearchFilter, selection: boolean[]): ArtistsSearchFilter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return filter
                    }
                    switch (selectedIndex) {
                        case 0:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(7, 'days').toDate().toDateString()
                            };
                            return filter
                        case 1:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(1, 'months').toDate().toDateString()
                            };
                            return filter
                        case 2:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(3, 'months').toDate().toDateString()
                            };
                            return filter
                        case 3:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(6, 'months').toDate().toDateString()
                            };
                            return filter
                        case 4:
                            filter.regTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(1, 'years').toDate().toDateString()
                            };
                            return filter
                        default:
                            return filter
                    }
                }
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
                ],
                compose: (sorter: ArtistsSearchSorter, selection: boolean[]): ArtistsSearchSorter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 7) {
                        return sorter
                    }
                    switch (selectedIndex) {
                        case 0:
                            sorter.avgRatings = SortOrder.Descending
                            return sorter
                        case 1:
                            sorter.userName = SortOrder.Ascending
                            return sorter
                        case 2:
                            sorter.regTime = SortOrder.Descending
                            return sorter
                        case 3:
                            sorter.commissionRequestCount = SortOrder.Descending
                            return sorter
                        case 4:
                            sorter.commissionAcceptCount = SortOrder.Descending
                            return sorter
                        case 5:
                            sorter.commissionSuccessCount = SortOrder.Descending
                            return sorter
                        case 6:
                            sorter.lastRequestTime = SortOrder.Descending
                            return sorter
                        default:
                            return sorter
                    }
                }
            }
        ]
    }

    artworksSearchSelection: SearchSelection<ArtworksSearchFilter, ArtworksSearchSorter> = {
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
                ],
                compose: (filter: ArtworksSearchFilter, selection: boolean[]): ArtworksSearchFilter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return filter
                    }
                    switch (selectedIndex) {
                        case 0:
                            filter.dayUsed = {
                                from: 0,
                                to: 1
                            };
                            return filter
                        case 1:
                            filter.dayUsed = {
                                from: 2,
                                to: 4
                            };
                            return filter
                        case 2:
                            filter.dayUsed = {
                                from: 4,
                                to: 7
                            };
                            return filter
                        case 3:
                            filter.dayUsed = {
                                from: 8,
                                to: 14
                            };
                            return filter
                        case 4:
                            filter.dayUsed = {
                                from: 15,
                                to: 10000
                            };
                            return filter
                        default:
                            return filter
                    }
                }
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
                ],
                compose: (filter: ArtworksSearchFilter, selection: boolean[]): ArtworksSearchFilter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return filter
                    }
                    switch (selectedIndex) {
                        case 0:
                            filter.completedTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(7, 'days').toDate().toDateString()
                            };
                            return filter
                        case 1:
                            filter.completedTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(1, 'months').toDate().toDateString()
                            };
                            return filter
                        case 2:
                            filter.completedTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(3, 'months').toDate().toDateString()
                            };
                            return filter
                        case 3:
                            filter.completedTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(6, 'months').toDate().toDateString()
                            };
                            return filter
                        case 4:
                            filter.completedTime = {
                                from: moment().toDate().toDateString(),
                                to: moment().subtract(1, 'years').toDate().toDateString()
                            };
                            return filter
                        default:
                            return filter
                    }
                }
            },
            {
                title: "其它",
                multipleSelection: true,
                options: [
                    {name: 'R18'},
                    {name: '匿名委托'},
                ],
                compose: (filter: ArtworksSearchFilter, selection: boolean[]): ArtworksSearchFilter => {
                    filter.isR18 = selection.length > 0 ? selection[0] : false
                    filter.anonymous = selection.length > 1 ? selection[1] : false
                    return filter
                }
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
                ],
                compose: (sorter: ArtworksSearchSorter, selection: boolean[]): ArtworksSearchSorter => {
                    let selectedIndex = selection.findIndex(l => l)
                    if (selectedIndex >= 5) {
                        return sorter
                    }
                    switch (selectedIndex) {
                        case 0:
                            sorter.dayUsed = SortOrder.Ascending
                            return sorter
                        case 1:
                            sorter.rating = SortOrder.Descending
                            return sorter
                        case 2:
                            sorter.views = SortOrder.Descending
                            return sorter
                        case 3:
                            sorter.favorCount = SortOrder.Descending
                            return sorter
                        case 4:
                            sorter.completedTime = SortOrder.Descending
                            return sorter
                        default:
                            return sorter
                    }
                }
            }
        ]
    }

    // getSearchSelection<T extends SearchFilter, U extends SearchSorter>(type: SearchType): SearchSelection<T, U> | null {
    //     switch (type) {
    //         case SearchType.OpenCommissions:
    //             return this.openCommissionSearchSelection
    //     }
    //     return null;
    // }
}
