import {Box, createStyles, Grid, makeStyles, StandardProps, Theme} from "@material-ui/core";
import ArtworkCard from "./ArtworkCard";
import {useEffect, useState} from "react";
import {getCommissions} from "../commission/usecase/commissionSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getArtworks} from "./usecase/artworkSlice";
import {type} from "os";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}),
);

interface Props extends StandardProps<any, any> {

}

export default function Artworks(props: Props) {
    const classes = useStyles(props.className)

    let {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()

    const getArtworksResult = useAppSelector(state => {
        if (state.artwork.forArtist.artistId === id) {
            const artworks = state.artwork.forArtist.ids.map(id => {
                return state.artwork.byId[id]
            })
            return {
                artworks: artworks,
                offset: state.openCommission.forArtist.offset,
                fetchCount: state.openCommission.forArtist.fetchCount,
                total: state.openCommission.forArtist.total,
            }
        }
        return undefined
    })

    useEffect(() => {
        dispatch(getArtworks({
            filter: {
                artistId: id,
                count: 100,
                offset: 0,
            }, sorter: {
                lastUpdateTime: false
            }
        }))
    }, [id, dispatch])

    return (
        <Box>
            <Grid container spacing={2}>
                {
                    getArtworksResult &&
                    getArtworksResult.artworks.map((aw, index) => {
                        return <Grid item xs={6} md={4} key={index}>
                            <ArtworkCard artwork={aw}/>
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    )

}
