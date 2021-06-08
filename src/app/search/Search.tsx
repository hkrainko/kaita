import {Container, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import SearchOpenCommissionsResult from "./SearchOpenCommissionsResult";
import {SearchType} from "../../domain/search/model/search-type";
import {useAppDispatch} from "../hooks";
import {searchOpenCommissions} from "./usecase/searchSlice";
import {useLocation} from "react-router-dom";
import {SortOrder} from "../../domain/search/model/search-sorter";
import SearchSelector from "./SearchSelector";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {SearchUseCase} from "../../domain/search/search.usecase";


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
                    filter: {
                        type: SearchType.OpenCommissions,
                        allowAnonymous: undefined,
                        allowBePrivate: undefined,
                        currency: undefined,
                        dayNeed: undefined,
                        isR18: undefined,
                        priceFromRange: undefined,
                        priceToRange: undefined
                    }, sorter: {
                        artistId: undefined,
                        createTime: undefined,
                        dayNeedFrom: undefined,
                        dayNeedTo: undefined,
                        lastUpdatedTime: SortOrder.Descending,
                        priceFrom: undefined,
                        priceTo: undefined,
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

    const onConfirmSelection = useCallback((result: boolean[][]) => {

    }, [])

    return (
        <Container className={classes.root}>
            <SearchSelector
                searchSelection={searchUseCase.getSearchSelection(SearchType.OpenCommissions)!}
                onConfirm={onConfirmSelection}
            />
            <SearchOpenCommissionsResult onLoadMore={() => setPage(page + 1)}/>
        </Container>
    )
}
