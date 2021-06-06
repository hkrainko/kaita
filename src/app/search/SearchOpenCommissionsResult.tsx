import {createStyles, Grid, makeStyles, StandardProps, Theme} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useCallback} from "react";
import {useAppSelector} from "../hooks";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import {OpenCommissionsSearchFilter} from "../../domain/search/model/search-filter";
import {OpenCommissionsSearchSorter} from "../../domain/search/model/search-sorter";
import OpenCommissionCard from "../open-commission/OpenCommissionCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        container: {
            width: '100%',
            margin: theme.spacing(0),
        }
    }),
);

interface SearchResult {
    openCommissions: OpenCommission[]
    currentPage: number
    totalPage: number
    filter: OpenCommissionsSearchFilter
    sorter: OpenCommissionsSearchSorter
}

interface Props extends StandardProps<any, any> {
    onLoadMore: () => void
}

export default function SearchOpenCommissionsResult({onLoadMore, ...props}: Props) {
    const classes = useStyles(props.className)

    const searchResult = useAppSelector<SearchResult | null>(state => {
        if (!state.search.forOpenCommissions.currentPage
            || !state.search.forOpenCommissions.totalPage
            || !state.search.forOpenCommissions.filter
            || !state.search.forOpenCommissions.sorter
        ) {
            return null
        }

        let openCommissions: OpenCommission[] = []
        state.search.forOpenCommissions.ids.forEach(id => {
            if (state.search.forOpenCommissions.byId[id]) {
                openCommissions.push(state.search.forOpenCommissions.byId[id])
            }
        })
        console.log(`AAA: openCommissions count:${openCommissions.length}`)

        return {
            openCommissions,
            currentPage: state.search.forOpenCommissions.currentPage,
            totalPage: state.search.forOpenCommissions.totalPage,
            filter: state.search.forOpenCommissions.filter,
            sorter: state.search.forOpenCommissions.sorter,
        }
    })

    const onOpenCommissionMainAction = useCallback((openCommission: OpenCommission) => {

    }, [])

    if (!searchResult) {
        return (
            <div>No result</div>
        )
    }

    return (
        <InfiniteScroll
            next={onLoadMore}
            hasMore={searchResult.currentPage < searchResult.totalPage}
            loader={<div>Loading</div>}
            dataLength={searchResult.openCommissions.length}
            className={classes.root}
        >
            <Grid container spacing={2} className={classes.container}>
                {
                    searchResult?.openCommissions.map(oc => {
                        return (
                            <Grid item xs={12} md={4} key={oc.id}>
                                <OpenCommissionCard openCommission={oc} onMainAction={onOpenCommissionMainAction}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </InfiniteScroll>
    )
}
