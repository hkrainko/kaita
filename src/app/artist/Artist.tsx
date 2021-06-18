import {
    Box,
    Container,
    createStyles,
    Grid,
    makeStyles,
    StandardProps,
    Tab,
    Tabs,
    Theme,
    Typography
} from "@material-ui/core";
import {Link, Route, Switch, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import ArtistBanner from "./banner/ArtistBanner";
import ArtistNameCard from "./ArtistNameCard";
import ArtistInfo from "./artist-info/ArtistInfo";
import React, {useEffect} from "react";
import Artworks from "../artwork/Artworks";
import OpenCommissions from "../open-commission/OpenCommissions";
import NotFound from "../error/NotFound";
import {getArtist} from "./usecase/artistSlice";
import ArtistDesc from "./artist-intro/ArtistDesc";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        banner: {
            height: 185,
        },
        artistDescGrid: {
            minHeight: '100px',
            marginTop: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                marginTop: theme.spacing(4)
            },
        },
        artistNameCardGrid: {
            marginTop: '-50px',
        },
        artistInfoGrid: {
            marginTop: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                marginTop: theme.spacing(6)
            },
        },
        itemsContentGrid: {
            marginTop: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                marginTop: theme.spacing(0)
            },
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function Artist(props: Props) {
    const classes = useStyles()
    const routeMatch = useRouteMatch()
    const location = useLocation()
    let {id} = useParams<{ id: string }>()
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const artist = useAppSelector((state) => state.artist.byId[id])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getArtist({artistId: id}))
    }, [dispatch, id])

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
                    <Grid item xs={12} md={9} className={classes.artistDescGrid}>
                        <Box my={2}>
                            <ArtistDesc desc={artist.artistBoard.desc} editable={isOwner}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} className={classes.artistInfoGrid}>
                        <ArtistInfo artist={artist}/>
                    </Grid>
                    <Grid item xs={12} md={9} className={classes.itemsContentGrid}>
                        <Tabs value={location.pathname} TabIndicatorProps={{style: {backgroundColor: "black"}}}>
                            <Tab label={
                                <Typography variant={"subtitle1"}>開放委托</Typography>
                            }
                                 value={routeMatch.url}
                                 component={Link}
                                 to={routeMatch.url}/>
                            <Tab label={
                                <Typography variant={"subtitle1"}>過去作品</Typography>
                            }
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
