import {Container, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import SearchOpenCommissionsResult from "./SearchOpenCommissionsResult";
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

interface Props extends StandardProps<any, any> {

}

type Inputs = {
    price: number[],
    dayNeed: number[],
}

export default function Search(props: Props) {
    const classes = useStyles()

    const location = useLocation()
    const [filter, setFilter] = useState<SearchFilter | null>(null)
    const [sorter, setSorter] = useState<SearchSorter | null>(null)
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
                    filter: filter?.type === SearchType.OpenCommissions ? filter : {type: SearchType.OpenCommissions},
                    sorter: sorter?.type === SearchType.OpenCommissions ? sorter : {
                        lastUpdatedTime: SortOrder.Descending,
                        type: SearchType.OpenCommissions
                    }, currentPage,
                    pageSize: 9
                }))
                break
            default:
                break
        }
    }, [dispatch, searchText])

    useEffect(() => {
        setPage(1)
    }, [searchType, searchText])

    useEffect(() => {
        if (!searchType) {
            return
        }
        fetchDataByType(searchType as SearchType, page)
    }, [fetchDataByType, page, searchType])

    const getSelector = (): React.ReactNode => {
        switch (searchType) {
            case SearchType.OpenCommissions:
                return <SearchSelector searchSelection={searchUseCase.getOpenCommissionsSearchSelection()} onConfirm={onConfirmSelection}/>
            case SearchType.Artists:
                return <SearchSelector searchSelection={searchUseCase.getArtistsSearchSelection()} onConfirm={onConfirmSelection}/>
            case SearchType.Artworks:
                return <SearchSelector searchSelection={searchUseCase.getArtworksSearchSelection()} onConfirm={onConfirmSelection}/>
        }
    }

    const onConfirmSelection = useCallback(<T extends SearchFilter, U extends SearchSorter>(filter: T, sorter: U) => {
        fetchDataByType(searchType as SearchType, page)
        // setFilterSelection(selection)
    }, [])

    return (
        <Container className={classes.root}>
            {getSelector()}
            <SearchOpenCommissionsResult onLoadMore={() => setPage(page + 1)}/>
        </Container>
    )
}
