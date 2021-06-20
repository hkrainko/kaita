import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Footer from "../footer/Footer";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import ArtistCard from "../artist/ArtistCard";
import {getNewRegisterArtists} from "./usecase/homeSlice";


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
    const newRegArtists = useAppSelector((state) =>
        state.home.newRegisterArtistsIds.map(id => state.artist.byId[id])
    )


    useEffect(() => {
        dispatch(getNewRegisterArtists({count: 4}))
    }, [dispatch])

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid container spacing={4} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography align={"left"}>新加入繪師</Typography>
                    </Grid>
                    {
                        newRegArtists.map( artist =>
                            <Grid item xs={3} key={artist.artistId}>
                                <ArtistCard artist={artist} onMainAction={() => {}}/>
                            </Grid>
                        )
                    }
                </Grid>
                <Grid container spacing={4} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography align={"left"}>最新作品</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        ss
                    </Grid>
                    <Grid item xs={3}>ss</Grid>
                    <Grid item xs={3}>ss</Grid>
                    <Grid item xs={3}>ss</Grid>
                </Grid>
            </Container>
            <Footer/>
        </React.Fragment>

    )
}
