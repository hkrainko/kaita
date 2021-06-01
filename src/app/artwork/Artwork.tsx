import {Container, createStyles, Grid, makeStyles, StandardProps, Theme} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getArtwork} from "./usecase/artworkSlice";
import {Artwork as DArtwork} from "../../domain/artwork/artwork";
import AuthImage from "../component/AuthImage";
import ArtworkInfo from "./ArtworkInfo";
import ArtworkBoard from "./ArtworkBoard";
import NotFound from "../error/NotFound";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8)
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function Artwork(props: Props) {
    const classes = useStyles()

    let {id} = useParams<{ id: string }>()
    const artwork = useAppSelector<DArtwork | null>((state) => state.artwork.byId[id])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getArtwork({artworkId: id}))
    }, [dispatch, id])

    if (!artwork) {
        return <NotFound/>
    }

    return (
        <Container className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={9}>
                    <AuthImage src={`http://192.168.64.12:31398/${artwork.path}`}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <ArtworkInfo artwork={artwork}/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <ArtworkBoard artwork={artwork}/>
                </Grid>
            </Grid>
        </Container>
    )
}


