import {Container, createStyles, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import Footer from "../footer/Footer";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import ArtistCard from "../artist/ArtistCard";
import {getNewArtworks, getNewRegisterArtists} from "./usecase/homeSlice";
import {useHistory} from "react-router-dom";
import ArtworkCard from "../artwork/ArtworkCard";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(12)
        },
        container: {
            paddingTop: theme.spacing(4)
        }
    }),
);


export default function Home() {
    const classes = useStyles()

    const dispatch = useAppDispatch()
    const history = useHistory();
    const newRegArtists = useAppSelector((state) =>
        state.home.newRegisterArtistsIds.map(id => state.artist.byId[id])
    )
    const newArtworks = useAppSelector((state) =>
        state.home.newArtworkIds.map(id => state.artwork.byId[id]))


    useEffect(() => {
        dispatch(getNewRegisterArtists({count: 4}))
        dispatch(getNewArtworks({count: 4}))
    }, [dispatch])

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid container spacing={2} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"left"}>新加入繪師</Typography>
                    </Grid>
                    {
                        newRegArtists.map( artist =>
                            <Grid item xs={6} md={3} key={artist.artistId}>
                                <ArtistCard artist={artist} onMainAction={artist => {
                                    history.push(`/artists/${artist.artistId}`)
                                }}/>
                            </Grid>
                        )
                    }
                </Grid>
                <Grid container spacing={4} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"left"}>最新作品</Typography>
                    </Grid>
                    {
                        newArtworks.map( artwork =>
                            <Grid item xs={6} md={3} key={artwork.id}>
                                <ArtworkCard artwork={artwork} onMainAction={artwork => {
                                    history.push(`/artworks/${artwork.id}`)
                                }}/>
                            </Grid>
                        )
                    }
                </Grid>
                <Grid container spacing={4} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"left"}>站內公告</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            fff
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </React.Fragment>

    )
}
