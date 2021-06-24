import {Box, Button, Container, createStyles, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import UserAvatar from "../component/UserAvatar";
import {Artist} from "../../domain/artist/model/artist";
import {Bookmark} from "@material-ui/icons";
import {SiPlurk} from "react-icons/si";
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import NotFound from "../error/NotFound";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 0
        },
        userAvatar: {
            borderWidth: '10px',
            borderColor: 'white',
            borderStyle: 'solid'
        },
        displayName: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(0),
            color: theme.palette.text.primary
        },
        userId: {
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(0),
            color: theme.palette.text.secondary
        },
        bookMark: {
            color: theme.palette.grey.A200,
            marginTop: theme.spacing(2)
        },
        socialMediaIcon: {
            fontsize: "24px",
            height: "24px",
            width: "24px",
            color: theme.palette.grey.A200,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
    }),
);

interface Props extends StandardProps<any, any> {
    artist?: Artist
}

export default function ArtistNameCard({artist, ...props}: Props) {
    const classes = useStyles()

    if (!artist) {
        return (
            <NotFound/>
        )
    }

    return (
        <Container className={classes.root}>
            <Box display="flex" justifyContent="center">
                <UserAvatar size={140} showBorder path={artist.profilePath && imgBySize(ImageSize.Middle, artist.profilePath)} className={classes.userAvatar}/>
            </Box>
            <Typography variant={"h6"} className={classes.displayName}>{artist.userName}</Typography>
            <Typography className={classes.userId}>@{artist.artistId}</Typography>
            <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.bookMark}
                startIcon={<Bookmark/>}>
                加入書籤
            </Button>
            <Box display="flex" justifyContent="center" mt={3}>
                <FaTwitter className={classes.socialMediaIcon} color={"#1C9CEB"}/>
                <FaFacebook className={classes.socialMediaIcon} color={"#4064AD"}/>
                <FaInstagram className={classes.socialMediaIcon} color={"#E93F58"}/>
                <SiPlurk className={classes.socialMediaIcon} color={"#F7544A"}/>
                <FaYoutube className={classes.socialMediaIcon} color={"#FF0101"}/>
            </Box>
        </Container>
    )
}
