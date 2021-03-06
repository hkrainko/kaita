import {SearchSelection} from "../../../../domain/search/search.usecase";
import {SearchType} from "../../../../domain/search/model/search-type";
import {OpenCommissionsSearchFilter} from "../../../../domain/search/model/search-filter";
import {OpenCommissionsSearchSorter, SortOrder} from "../../../../domain/search/model/search-sorter";
import {Currency} from "../../../../domain/price/price";


export class OpenCommissionsSearchSelection implements SearchSelection<OpenCommissionsSearchFilter, OpenCommissionsSearchSorter> {

    type = SearchType.OpenCommissions

    readonly groups = [
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
            title: "最快需時",
            multipleSelection: false,
            options: [
                {name: '0-1日'},
                {name: '2-4日'},
                {name: '5-7日'},
                {name: '8-14日'},
                {name: '15-30日'}
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
            ],
        }
    ]

    getInitSelection = (): boolean[][] => {
        let result: boolean[][] = [[]]
        this.groups.forEach((gp, i) => {
            let tempCols: boolean[] = []
            gp.options.forEach((_, j) => {
                tempCols[j] = (i === 3 && j === 2)
            })
            result[i] = tempCols
        })
        return result
    }

    getFilter(selection: boolean[][]): OpenCommissionsSearchFilter {
        let filter: OpenCommissionsSearchFilter = {type: SearchType.OpenCommissions}
        if (selection.length < 3) {
            return filter
        }
        // 價錢
        switch (selection[0].findIndex(l => l)) {
            case 0:
                filter.priceFromRange = {from: 0, to: 50};
                filter.currency = Currency.HKD
                break
            case 1:
                filter.priceFromRange = {from: 50, to: 200};
                filter.currency = Currency.HKD
                break
            case 2:
                filter.priceFromRange = {from: 200, to: 500};
                filter.currency = Currency.HKD
                break
            case 3:
                filter.priceFromRange = {from: 500, to: 1000};
                filter.currency = Currency.HKD
                break
            case 4:
                filter.priceFromRange = {from: 1000, to: 9999999};
                filter.currency = Currency.HKD
                break
            default:
                break
        }
        // 需時
        switch (selection[1].findIndex(l => l)) {
            case 0:
                filter.dayNeed = {from: 0, to: 1};
                break
            case 1:
                filter.dayNeed = {from: 2, to: 4};
                break
            case 2:
                filter.dayNeed = {from: 5, to: 7};
                break
            case 3:
                filter.dayNeed = {from: 8, to: 14};
                break
            case 4:
                filter.dayNeed = {from: 15, to: 30};
                break
            default:
                break
        }
        // 其它
        filter.isR18 = (selection[2].length > 0 && selection[2][0]) ? true : undefined
        filter.allowBePrivate = (selection[2].length > 1 && selection[2][1]) ? true : undefined
        filter.allowAnonymous = (selection[2].length > 2 && selection[2][2]) ? true : undefined
        return filter
    }

    getSorter(selection: boolean[][]): OpenCommissionsSearchSorter {
        let sorter: OpenCommissionsSearchSorter = {type: SearchType.OpenCommissions}
        if (selection.length < 4) {
            return sorter
        }
        switch (selection[3].findIndex(l => l)) {
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
                break
        }
        return sorter
    }

    isAllowUnselectAll(i: number): boolean {
        return i !== 3
    }

}
