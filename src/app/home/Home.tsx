import {Box, Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Footer from "../footer/Footer";
import React, {useEffect} from "react";
import Artwork from "../artwork/Artwork";
import ArtworkCard from "../artwork/ArtworkCard";
import {useAppDispatch} from "../hooks";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(12)
        },
    }),
);


export default function Home() {
    const classes = useStyles()

    const dispatch = useAppDispatch()

    useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>新加入繪師</Typography>
                    </Grid>
                    <Grid item xs={3}>ss</Grid>
                    <Grid item xs={3}>ss</Grid>
                    <Grid item xs={3}>ss</Grid>
                    <Grid item xs={3}>ss</Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>最新作品</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <ArtworkCard artwork={}/>
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
