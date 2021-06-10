import {createStyles, Fab, Grid, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../hooks";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import OpenCommissionCard from "../open-commission/OpenCommissionCard";
import {PublishRounded} from "@material-ui/icons";
import {SearchResult} from "../../domain/search/model/search-result";
import {SearchType} from "../../domain/search/model/search-type";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        container: {
            width: '100%',
            margin: theme.spacing(0),
        },
        backToTopButton: {
            position: 'fixed',
            right: theme.spacing(3),
            bottom: theme.spacing(4)
        }
    }),
);

interface Props extends StandardProps<any, any> {
    searchType: SearchType
    onLoadMore: () => void
}

export default function SearchResultList({searchType, onLoadMore, ...props}: Props) {
    const classes = useStyles(props.className)

    const [showBackToTop, setShowBackToTop] = useState(false)

    const searchResult = useAppSelector<SearchResult | null>((state) => {
        switch (searchType) {
            case SearchType.OpenCommissions:
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
                return {
                    type: SearchType.OpenCommissions,
                    records: openCommissions,
                    page: {
                        current: state.search.forOpenCommissions.currentPage,
                        totalPage: state.search.forOpenCommissions.totalPage,
                        totalResult: state.search.forOpenCommissions.ids.length,
                        size: state.search.forOpenCommissions.size
                    },
                    filter: state.search.forOpenCommissions.filter,
                    sorter: state.search.forOpenCommissions.sorter,
                }
            case SearchType.Artists:
                return null
            case SearchType.Artworks:
                return null
            default:
                return null
        }
    })

    const onClickBackToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 300) {
                setShowBackToTop(true)
            } else if (scrolled <= 300) {
                setShowBackToTop(false)
            }
        });
    }, [])

    const onOpenCommissionMainAction = useCallback((openCommission: OpenCommission) => {

    }, [])

    const getRecordView = (searchResult: SearchResult) => {
        switch (searchResult.type) {
            case SearchType.OpenCommissions:
                return (
                    searchResult?.records.map(record => {
                        return (
                            <Grid item xs={12} md={3} key={record.id}>
                                <OpenCommissionCard openCommission={record} onMainAction={onOpenCommissionMainAction}/>
                            </Grid>
                        )
                    })
                )
            default:
                return null
        }
    }

    if (!searchResult) {
        return (
            <Typography>(無資料)</Typography>
        )
    }

    return (
        <React.Fragment>
            <InfiniteScroll
                next={onLoadMore}
                hasMore={searchResult.page.current < searchResult.page.totalPage}
                loader={<Typography>載入中...</Typography>}
                endMessage={
                    <Typography>{`共 ${searchResult.records.length} 項`}</Typography>
                }
                dataLength={searchResult.records.length}
                className={classes.root}
            >
                <Grid container spacing={2} className={classes.container}>
                    {
                        getRecordView(searchResult)
                    }
                </Grid>
                {
                    showBackToTop &&
                    <Fab color="default" size="medium" onClick={onClickBackToTop} className={classes.backToTopButton}>
                        <PublishRounded fontSize={"large"}/>
                    </Fab>
                }
            </InfiniteScroll>
        </React.Fragment>
    )
}
