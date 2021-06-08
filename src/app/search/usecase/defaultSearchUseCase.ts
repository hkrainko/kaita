import {SearchSelection, SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";
import {SearchType} from "../../../domain/search/model/search-type";

@injectable()
export class DefaultSearchUseCase implements SearchUseCase {

    getSearchTypeName(type: SearchType): string {
        switch (type) {
            case SearchType.ALL:
                return "全部"
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
            default:
                return null
        }
    }


}
