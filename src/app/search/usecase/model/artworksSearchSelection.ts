import {SearchSelection} from "../../../../domain/search/search.usecase";
import {ArtworksSearchFilter} from "../../../../domain/search/model/search-filter";
import {ArtworksSearchSorter, SortOrder} from "../../../../domain/search/model/search-sorter";
import {SearchType} from "../../../../domain/search/model/search-type";
import moment from "moment";


export class ArtworksSearchSelection implements SearchSelection<ArtworksSearchFilter, ArtworksSearchSorter> {

    type = SearchType.Artworks

    readonly groups = [
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
            title: "其它",
            multipleSelection: true,
            options: [
                {name: 'R18'},
                {name: '匿名委托'},
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

    getInitSelection = (): boolean[][] => {
        let result: boolean[][] = [[]]
        this.groups.forEach((gp, i) => {
            let tempCols: boolean[] = []
            gp.options.forEach((_, j) => {
                tempCols[j] = (i === 3 && j === 4)
            })
            result[i] = tempCols
        })
        return result
    }

    getFilter(selection: boolean[][]): ArtworksSearchFilter {
        let filter: ArtworksSearchFilter = {type: SearchType.Artworks}
        if (selection.length < 3) {
            return filter
        }
        // 耗時
        switch (selection[0].findIndex(l => l)) {
            case 0:
                filter.dayUsed = {
                    from: 0,
                    to: 1
                };
                break
            case 1:
                filter.dayUsed = {
                    from: 2,
                    to: 4
                };
                break
            case 2:
                filter.dayUsed = {
                    from: 4,
                    to: 7
                };
                break
            case 3:
                filter.dayUsed = {
                    from: 8,
                    to: 14
                };
                break
            case 4:
                filter.dayUsed = {
                    from: 15,
                    to: 10000
                };
                break
            default:
                break
        }
        // 完成時間
        switch (selection[1].findIndex(l => l)) {
            case 0:
                filter.completedTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(7, 'days').toDate().toDateString()
                };
                break
            case 1:
                filter.completedTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(1, 'months').toDate().toDateString()
                };
                break
            case 2:
                filter.completedTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(3, 'months').toDate().toDateString()
                };
                break
            case 3:
                filter.completedTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(6, 'months').toDate().toDateString()
                };
                break
            case 4:
                filter.completedTime = {
                    from: moment().toDate().toDateString(),
                    to: moment().subtract(1, 'years').toDate().toDateString()
                };
                break
            default:
                break
        }
        // 其它
        filter.isR18 = (selection[2].length > 0 && selection[2][0]) ? true : undefined
        filter.anonymous = (selection[2].length > 1 && selection[2][1]) ? true : undefined
        return filter
    }

    getSorter(selection: boolean[][]): ArtworksSearchSorter {
        let sorter: ArtworksSearchSorter = {type: SearchType.Artworks}
        if (selection.length < 4) {
            return sorter
        }
        switch (selection[3].findIndex(l => l)) {
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
