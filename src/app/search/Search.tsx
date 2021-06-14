import {Container, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import SearchResultList from "./SearchResultList";
import {SearchType} from "../../domain/search/model/search-type";
import {useAppDispatch} from "../hooks";
import {searchArtists, searchArtworks, searchOpenCommissions} from "./usecase/searchSlice";
import {useLocation} from "react-router-dom";
import {SearchSorter} from "../../domain/search/model/search-sorter";
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
    type: SearchType,
    filter: SearchFilter,
    sorter: SearchSorter,
    currentPage: number
}

const getInitFilterSorter = (useCase: SearchUseCase, type: SearchType): FilterSorter => {
    switch (type) {
        case SearchType.OpenCommissions:
            const openCommissionsSearchSelection = useCase.getOpenCommissionsSearchSelection()
            return {
                type: SearchType.OpenCommissions,
                filter: openCommissionsSearchSelection.getFilter(openCommissionsSearchSelection.getInitSelection()),
                sorter: openCommissionsSearchSelection.getSorter(openCommissionsSearchSelection.getInitSelection()),
                currentPage: 1
            }
        case SearchType.Artists:
            const artistsSearchSelection = useCase.getArtistsSearchSelection()
            return {
                type: SearchType.Artists,
                filter: artistsSearchSelection.getFilter(artistsSearchSelection.getInitSelection()),
                sorter: artistsSearchSelection.getSorter(artistsSearchSelection.getInitSelection()),
                currentPage: 1
            }
        case SearchType.Artworks:
            const artworksSearchSelection = useCase.getArtworksSearchSelection()
            return {
                type: SearchType.Artworks,
                filter: artworksSearchSelection.getFilter(artworksSearchSelection.getInitSelection()),
                sorter: artworksSearchSelection.getSorter(artworksSearchSelection.getInitSelection()),
                currentPage: 1
            }
    }
}

interface Props extends StandardProps<any, any> {

}

export default function Search(props: Props) {
    const classes = useStyles()

    const searchUseCase = useInjection<SearchUseCase>(TYPES.SearchUseCase)
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searchText = query.get('s')
    const searchType: SearchType = query.get('t') as SearchType
    const [filterSorter, setFilterSorter] = useState<FilterSorter>(getInitFilterSorter(searchUseCase, searchType))
    const dispatch = useAppDispatch()

    const fetchDataByType = useCallback((filterSorter: FilterSorter) => {
        if (!searchText) {
            return
        }
        switch (searchType) {
            case SearchType.OpenCommissions:
                if (filterSorter.filter.type !== SearchType.OpenCommissions || filterSorter.sorter.type !== SearchType.OpenCommissions) {
                    return;
                }
                dispatch(searchOpenCommissions({
                    text: searchText,
                    filter: filterSorter.filter,
                    sorter: filterSorter.sorter,
                    currentPage: filterSorter.currentPage,
                    pageSize: 9
                }))
                break
            case SearchType.Artists:
                if (filterSorter.filter.type !== SearchType.Artists || filterSorter.sorter.type !== SearchType.Artists) {
                    return
                }
                dispatch(searchArtists({
                    text: searchText,
                    filter: filterSorter.filter,
                    sorter: filterSorter.sorter,
                    currentPage: filterSorter.currentPage,
                    pageSize: 9
                }))
                break
            case SearchType.Artworks:
                if (filterSorter.filter.type !== SearchType.Artworks || filterSorter.sorter.type !== SearchType.Artworks) {
                    return
                }
                dispatch(searchArtworks({
                    text: searchText,
                    filter: filterSorter.filter,
                    sorter: filterSorter.sorter,
                    currentPage: filterSorter.currentPage,
                    pageSize: 9
                }))
                break
            default:
                break
        }
    }, [dispatch, searchText, searchType])

    useEffect(() => {
        fetchDataByType(filterSorter)
    }, [fetchDataByType, filterSorter])

    const onConfirmSelection = useCallback(<T extends SearchFilter, U extends SearchSorter>(filter: T, sorter: U) => {
        setFilterSorter({
            type: filterSorter.type,
            filter,
            sorter,
            currentPage: 1
        })
        console.log(`filter: ${JSON.stringify(filter)}, sorter: ${JSON.stringify(sorter)}`)
    }, [filterSorter.type])

    const getSelector = useCallback((): React.ReactNode => {
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
    }, [onConfirmSelection, searchType, searchUseCase])

    if (filterSorter.type !== searchType) {
        setFilterSorter(getInitFilterSorter(searchUseCase, searchType))
    }

    return (
        <Container className={classes.root}>
            {getSelector()}
            <SearchResultList searchType={searchType} onLoadMore={() => setFilterSorter({
                ...filterSorter,
                currentPage: filterSorter.currentPage + 1
            })}/>
        </Container>
    )
}
