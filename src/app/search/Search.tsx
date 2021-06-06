import {
    Box,
    Button,
    Chip,
    Container,
    createStyles,
    Grid,
    makeStyles,
    MenuItem,
    Select,
    StandardProps,
    Theme
} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import SearchOpenCommissionsResult from "./SearchOpenCommissionsResult";
import {SearchType} from "../../domain/search/model/search-type";
import {useAppDispatch} from "../hooks";
import {searchOpenCommissions} from "./usecase/searchSlice";
import {useLocation} from "react-router-dom";
import {SortOrder} from "../../domain/search/model/search-sorter";
import {FilterList, Sort} from "@material-ui/icons";


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
        sortChip: {
            marginLeft: theme.spacing(1)
        }
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

    const onChangeFilter = useCallback((event: object) => {

    }, [])

    return (
        <Container className={classes.root}>
            <Box display="flex">
                <Button variant="outlined" size="medium" startIcon={<FilterList/>}>
                    篩選條件
                </Button>
                <Select
                    // native
                    // variant={"outlined"}
                    value={10}
                    onChange={onChangeFilter}
                    disableUnderline
                    className={classes.filterSelect}
                    startAdornment={<Sort/>}
                >
                    <MenuItem value={10}>更新日期</MenuItem>
                    <MenuItem value={20}>最低價格</MenuItem>
                    <MenuItem value={30}>最高價格</MenuItem>
                </Select>
            </Box>
            <Box display="flex" my={2}>
                <Chip
                    icon={<FilterList />}
                    label="日期 > 50"
                    onDelete={() => {}}
                    color="default"
                />
                <Chip
                    icon={<Sort/>}
                    label="更新日期"
                    color="default"
                    className={classes.sortChip}
                />
            </Box>
            <Grid item md={12}>
                <SearchOpenCommissionsResult onLoadMore={() => setPage(page + 1)}/>
            </Grid>
        </Container>
    )
}
