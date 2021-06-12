import {Container, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import SearchResultList from "./SearchResultList";
import {SearchType} from "../../domain/search/model/search-type";
import {useAppDispatch} from "../hooks";
import {searchOpenCommissions} from "./usecase/searchSlice";
import {useLocation} from "react-router-dom";
import {SearchSorter, SortOrder} from "../../domain/search/model/search-sorter";
import SearchSelector from "./SearchSelector";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {SearchSelection, SearchUseCase} from "../../domain/search/search.usecase";
import {SearchFilter} from "../../domain/search/model/search-filter";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(5),
        },
        form: {
            width: '100%'
        },
        filterSelect: {
            marginLeft: 'auto',
            // width: '80px'
        },
    }),
);

interface FilterSorter {
    type: SearchType
    filter: SearchFilter,
    sorter: SearchSorter,
    currentPage: number
}

const getInitFilterSorter = (type: SearchType): FilterSorter => {
    switch (type) {
        case SearchType.OpenCommissions:
            return {
                type: SearchType.OpenCommissions,
                filter: {
                    type: SearchType.OpenCommissions
                },
                sorter: {
                    type: SearchType.OpenCommissions,
                    createTime: SortOrder.Descending // 3, 2
                },
                currentPage: 1
            }
        case SearchType.Artists:
            return {
                type: SearchType.Artists,
                filter: {
                    type: SearchType.Artists
                },
                sorter: {
                    type: SearchType.Artists,
                    regTime: SortOrder.Descending // 3, 2
                },
                currentPage: 1
            }
        case SearchType.Artworks:
            return {
                type: SearchType.Artworks,
                filter: {
                    type: SearchType.Artworks
                },
                sorter: {
                    type: SearchType.Artworks,
                    completedTime: SortOrder.Descending // 3, 4
                },
                currentPage: 1
            }
    }
}

interface Props extends StandardProps<any, any> {

}

export default function Search(props: Props) {
    const classes = useStyles()

    const location = useLocation()
    const [filterSorter, setFilterSorter] = useState<FilterSorter>(getInitFilterSorter(SearchType.OpenCommissions))
    const query = new URLSearchParams(location.search)
    const searchUseCase = useInjection<SearchUseCase>(TYPES.SearchUseCase)
    const searchType = query.get('t')
    const searchText = query.get('s')
    const dispatch = useAppDispatch()
    // const [page, setPage] = useState<number>(1)

    const fetchDataByType = useCallback((filterSorter: FilterSorter) => {
        if (!searchText) {
            return
        }
        switch (searchType) {
            case SearchType.OpenCommissions:
                dispatch(searchOpenCommissions({
                    text: searchText,
                    filter: filterSorter?.filter.type === SearchType.OpenCommissions ? filterSorter.filter : {type: SearchType.OpenCommissions},
                    sorter: filterSorter?.sorter.type === SearchType.OpenCommissions ? filterSorter.sorter : {
                        lastUpdatedTime: SortOrder.Descending,
                        type: SearchType.OpenCommissions
                    }, currentPage: filterSorter.currentPage,
                    pageSize: 9
                }))
                break
            default:
                break
        }
    }, [dispatch, searchText])

    useEffect(() => {
        setFilterSorter({...filterSorter, currentPage: 1})
    }, [searchType, searchText])

    useEffect(() => {
        if (!searchType) {
            return
        }
        fetchDataByType(filterSorter)
    }, [fetchDataByType, filterSorter, searchType])

    const onConfirmSelection = useCallback(<T extends SearchFilter, U extends SearchSorter>(filter: T, sorter: U) => {
        setFilterSorter({
            type: searchType as SearchType,
            filter,
            sorter,
            currentPage: 1
        })
        console.log(`filter: ${JSON.stringify(filter)}, sorter: ${JSON.stringify(sorter)}`)
    }, [])

    const getSelector = (): React.ReactNode => {
        switch (searchType) {
            case SearchType.OpenCommissions:
                let openCommissionsSearchSelection = searchUseCase.getOpenCommissionsSearchSelection()
                return <SearchSelector searchSelection={openCommissionsSearchSelection}
                                       onConfirm={onConfirmSelection}/>
            case SearchType.Artists:
                let artistsSearchSelection = searchUseCase.getArtistsSearchSelection()
                return <SearchSelector searchSelection={artistsSearchSelection}
                                       onConfirm={onConfirmSelection}/>
            case SearchType.Artworks:
                let artworksSearchSelection = searchUseCase.getArtworksSearchSelection()
                return <SearchSelector searchSelection={artworksSearchSelection}
                                       onConfirm={onConfirmSelection}/>
        }
    }

    return (
        <Container className={classes.root}>
            {getSelector()}
            <SearchResultList searchType={SearchType.OpenCommissions} onLoadMore={() => setFilterSorter({...filterSorter, currentPage: filterSorter.currentPage + 1})}/>
        </Container>
    )
}
