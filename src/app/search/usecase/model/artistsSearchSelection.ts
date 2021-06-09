import {SearchSelection} from "../../../../domain/search/search.usecase";
import {ArtistsSearchFilter} from "../../../../domain/search/model/search-filter";
import {ArtistsSearchSorter, SortOrder} from "../../../../domain/search/model/search-sorter";
import {SearchType} from "../../../../domain/search/model/search-type";
import moment from "moment";

export class ArtistsSearchSelection implements SearchSelection<ArtistsSearchFilter, ArtistsSearchSorter> {

    type = SearchType.Artists

    groups = [
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
        }
    ]

    getFilter(selection: boolean[][]): ArtistsSearchFilter {
        let filter: ArtistsSearchFilter = {type: SearchType.Artists}
        if (selection.length <= 3) {
            return filter
        }
        // 註冊時間
        switch (selection[0].findIndex(l => l)) {
            case 0:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(7, 'days').toDate().toDateString()
                };
                break
            case 1:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(1, 'months').toDate().toDateString()
                };
                break
            case 2:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(3, 'months').toDate().toDateString()
                };
                break
            case 3:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(6, 'months').toDate().toDateString()
                };
                break
            case 4:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(1, 'years').toDate().toDateString()
                };
                break
        }
        // 付款方式
        let paymentMethods = selection[1].flatMap((v, i) => {
            if (v) {
                switch (i) {
                    case 0:
                        return ['Paypal']
                    case 1:
                        return ['銀行匯款']
                    case 2:
                        return ['Alipay']
                    case 3:
                        return ['PayMe']
                    case 4:
                        return ['7-11 ibon']
                    case 5:
                        return ['信用卡']
                    default:
                        break
                }
            }
            return []
        })
        filter.paymentMethods = paymentMethods && paymentMethods

        // 最後活躍時間
        switch (selection[2].findIndex(l => l)) {
            case 0:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(7, 'days').toDate().toDateString()
                };
                break
            case 1:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(1, 'months').toDate().toDateString()
                };
                break
            case 2:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(3, 'months').toDate().toDateString()
                };
                break
            case 3:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(6, 'months').toDate().toDateString()
                };
                break
            case 4:
                filter.regTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(1, 'years').toDate().toDateString()
                };
                break
            default:
                break
        }
        return filter
    }

    getSorter(selection: boolean[][]): ArtistsSearchSorter {
        let sorter: ArtistsSearchSorter = {type: SearchType.Artists}
        if (selection.length <= 4) {
            return sorter
        }
        switch (selection[3].findIndex(l => l)) {
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
