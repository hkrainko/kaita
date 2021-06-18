import {
    Box, Button,
    Container,
    createStyles, Divider,
    Grid,
    IconButton, List, ListItem, ListItemText,
    makeStyles,
    Popover,
    StandardProps,
    Theme, Typography
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {getArtwork} from "./usecase/artworkSlice";
import {Artwork as DArtwork} from "../../domain/artwork/artwork";
import AuthImage from "../component/AuthImage";
import ArtworkInfo from "./ArtworkInfo";
import ArtworkBoard from "./ArtworkBoard";
import NotFound from "../error/NotFound";
import {Facebook, FavoriteBorder, More, MoreVert, Share, Telegram, Twitter} from "@material-ui/icons";
import {
    FacebookIcon,
    FacebookShareButton,
    InstapaperShareButton,
    TelegramShareButton,
    TwitterShareButton
} from "react-share";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8)
        },
        shareButton: {
            height: '30px',
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5)
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
    // const [showShare, setShowShare] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const popOverId = anchorEl ? 'share-popover' : undefined;

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

                    <Box display="flex" justifyContent={"flex-end"} mt={1}>
                        <IconButton>
                            <FavoriteBorder/>
                        </IconButton>
                        <IconButton aria-describedby={popOverId} onClick={handleClick}>
                            <Share/>
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <ArtworkInfo artwork={artwork}/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <ArtworkBoard artwork={artwork}/>
                </Grid>
            </Grid>
            <Popover
                id={popOverId}
                open={anchorEl !== null}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List component="nav" disablePadding={true}>
                    <ListItem>
                        <Box px={1}>
                            <Typography variant={"subtitle1"} color={"textSecondary"}>分享作品到</Typography>
                        </Box>
                    </ListItem>
                    {/*<Divider light/>*/}
                    <ListItem dense>
                        <FacebookShareButton url={window.location.href}>
                            <Button variant="text" startIcon={<Facebook/>} style={{color: "#4064AD"}}>
                                Facebook
                            </Button>
                        </FacebookShareButton>
                    </ListItem>
                    <ListItem dense>
                        <TwitterShareButton url={window.location.href}>
                            <Button variant="text" startIcon={<Twitter/>} style={{color: "#1C9CEB"}}>
                                Twitter
                            </Button>
                        </TwitterShareButton>
                    </ListItem>
                    <ListItem dense>
                        <TelegramShareButton url={window.location.href}>
                            <Button variant="text" startIcon={<Telegram/>} style={{color: "#33A6DC"}}>
                                Telegram
                            </Button>
                        </TelegramShareButton>
                    </ListItem>
                </List>
            </Popover>
        </Container>
    )
}


