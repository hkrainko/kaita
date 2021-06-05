import {OpenCommissionsSearchFilter} from "./model/search-filter";
import {OpenCommissionsSearchSorter} from "./model/search-sorter";
import {OpenCommissionsSearchResult} from "./model/search-result";

export interface SearchRepo {
    searchOpenCommissions(text: string, filter: OpenCommissionsSearchFilter, sorter: OpenCommissionsSearchSorter): Promise<OpenCommissionsSearchResult>
}
