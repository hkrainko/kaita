import {Box, Container, createStyles, Grid, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import {Link, Route, Switch, useRouteMatch, useLocation, useParams} from "react-router-dom";
import {useAppSelector} from "../hooks";
import ArtistBanner from "./banner/ArtistBanner";
import ArtistNameCard from "./ArtistNameCard";
import ArtistInfo from "./artist-info/ArtistInfo";
import React from "react";
import Artworks from "../artwork/Artworks";
import OpenCommissions from "../open-commission/OpenCommissions";

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
    const auth = useAppSelector((state) => state.auth)

    let {id} = useParams<{ id: string }>()

    return (
        <React.Fragment>
            <ArtistBanner className={classes.banner} editable={true}/>
            <Container>
                <Grid container>
                    <Grid item xs={12} md={3} className={classes.artistNameCardGrid}>
                        <ArtistNameCard/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box my={2}>
                            <Typography variant={"body1"}>
                                可用於個人收藏、網路發佈、同人與中小型獨立遊戲販售
                                價格不含人設，若需做角色設計，依複雜度與需求酌量加價
                                插圖發佈時需附上繪師名
                                如要用在授權範圍之外的地方請事先詢問
                                非買斷制，我方保有公開與收錄作品集之權利
                                一般公司企業商用委託、整套企畫用圖請另外來信詢價
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
                                 to={routeMatch.url} />
                            <Tab label="過去作品"
                                 value={`${routeMatch.url}/artworks`}
                                 component={Link}
                                 to={`${routeMatch.url}/artworks`} />
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


export default Artist
