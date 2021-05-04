import {Box, Container, createStyles, Grid, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import {Link, Route, Switch, useRouteMatch, useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import ArtistBanner from "./banner/ArtistBanner";
import ArtistNameCard from "./ArtistNameCard";
import ArtistInfo from "./artist-info/ArtistInfo";
import React, {useEffect} from "react";
import Artworks from "../artwork/Artworks";
import OpenCommissions from "../open-commission/OpenCommissions";
import NotFound from "../error/NotFound";
import {getArtist} from "./usecase/artistSlice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        banner: {
            height: 160,
            backgroundColor: 'blue',
        },
        artistNameCardGrid: {
            marginTop: '-50px',
        }
    }),
);


function Artist() {
    const classes = useStyles()
    const routeMatch = useRouteMatch()
    const location = useLocation()
    let {id} = useParams<{ id: string }>()
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const artist = useAppSelector((state) => {
        return state.artist.byId[id]
    })
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getArtist({artistId: id}))
    }, [dispatch, id, artist?.artistId])

    if (!artist) {
        return <NotFound/>
    }
    const isOwner = artist.artistId === userId

    return (
        <React.Fragment>
            <ArtistBanner className={classes.banner} editable={isOwner} path={artist.artistBoard.bannerPath}/>
            <Container>
                <Grid container>
                    <Grid item xs={12} md={3} className={classes.artistNameCardGrid}>
                        <ArtistNameCard artist={artist}/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box my={2}>
                            <Typography variant={"body1"}>
                                {artist.artistBoard.desc}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <ArtistInfo/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Tabs value={location.pathname}>
                            <Tab label="開放委托"
                                 value={routeMatch.url}
                                 component={Link}
                                 to={routeMatch.url}/>
                            <Tab label="過去作品"
                                 value={`${routeMatch.url}/artworks`}
                                 component={Link}
                                 to={`${routeMatch.url}/artworks`}/>
                        </Tabs>
                        <Box mt={2}>
                            <Switch>
                                <Route exact path={routeMatch.path} component={OpenCommissions}/>
                                <Route path={`${routeMatch.path}/artworks`} component={Artworks}/>
                            </Switch>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}


export default Artist;
