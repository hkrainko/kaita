import {Box, createStyles, Grid, makeStyles, StandardProps, Theme} from "@material-ui/core";
import ArtworkCard from "./ArtworkCard";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getArtworks} from "./usecase/artworkSlice";
import {useHistory, useParams} from "react-router-dom";
import {Artwork} from "../../domain/artwork/artwork";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}),
);

interface Props extends StandardProps<any, any> {

}

export default function Artworks(props: Props) {
    const classes = useStyles(props.className)

    let {id} = useParams<{ id: string }>()
    const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null)
    const [deletingArtwork, setDeletingArtwork] = useState<Artwork | null>(null)
    const history = useHistory();
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

    const onMainAction = useCallback((artwork: Artwork) => {
        history.push(`/artworks/${artwork.id}`)
    }, [history])

    const onEdit = useCallback((artwork: Artwork) => {
        setEditingArtwork(artwork)
    }, [])

    const onDelete = useCallback((artwork: Artwork) => {
        setDeletingArtwork(artwork)
    }, [])

    return (
        <Box>
            <Grid container spacing={2}>
                {
                    getArtworksResult &&
                    getArtworksResult.artworks.map((aw, index) => {
                        return <Grid item xs={6} md={4} key={index}>
                            <ArtworkCard
                                onMainAction={onMainAction}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                artwork={aw}
                            />
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    )

}
