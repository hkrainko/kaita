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
import {SearchUseCase} from "../../domain/search/search.usecase";
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
    filter: SearchFilter,
    sorter: SearchSorter
}

interface Props extends StandardProps<any, any> {

}

export default function Search(props: Props) {
    const classes = useStyles()

    const location = useLocation()
    const [filterSorter, setFilterSorter] = useState<FilterSorter | null>(null)
    const query = new URLSearchParams(location.search)
    const searchUseCase = useInjection<SearchUseCase>(TYPES.SearchUseCase)
    const searchType = query.get('t')
    const searchText = query.get('s')
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<number>(1)

    const fetchDataByType = useCallback((searchType: SearchType, currentPage: number) => {
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
                    }, currentPage,
                    pageSize: 9
                }))
                break
            default:
                break
        }
    }, [dispatch, filterSorter?.filter, filterSorter?.sorter, searchText])

    useEffect(() => {
        setPage(1)
    }, [searchType, searchText])

    useEffect(() => {
        if (!searchType) {
            return
        }
        fetchDataByType(searchType as SearchType, page)
    }, [fetchDataByType, page, searchType])

    const onConfirmSelection = useCallback(<T extends SearchFilter, U extends SearchSorter>(filter: T, sorter: U) => {
        setFilterSorter({
            filter, sorter
        })
        console.log(`filter: ${JSON.stringify(filter)}, sorter: ${JSON.stringify(sorter)}`)
    }, [])

    const getSelector = (): React.ReactNode => {
        switch (searchType) {
            case SearchType.OpenCommissions:
                return <SearchSelector searchSelection={searchUseCase.getOpenCommissionsSearchSelection()}
                                       onConfirm={onConfirmSelection}/>
            case SearchType.Artists:
                return <SearchSelector searchSelection={searchUseCase.getArtistsSearchSelection()}
                                       onConfirm={onConfirmSelection}/>
            case SearchType.Artworks:
                return <SearchSelector searchSelection={searchUseCase.getArtworksSearchSelection()}
                                       onConfirm={onConfirmSelection}/>
        }
    }

    return (
        <Container className={classes.root}>
            {getSelector()}
            <SearchResultList searchType={SearchType.OpenCommissions} onLoadMore={() => setPage(page + 1)}/>
        </Container>
    )
}
