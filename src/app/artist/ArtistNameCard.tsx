import {Box, Button, Container, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import UserAvatar from "../component/UserAvatar";
import {Artist} from "../../domain/artist/model/artist";
import {Bookmark} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 0
        },
        userAvatarBox: {
            marginTop: '-50px',
            position: 'relative'
        },
        displayName: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(0)
        },
        userId: {
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(0)
        },
        bookMark: {
            color: theme.palette.grey.A200,
            marginTop: theme.spacing(2)
        }
    }),
);

interface Props extends StandardProps<any, any> {
    artist?: Artist
}

export default function ArtistNameCard(props: Props) {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Box display="flex" justifyContent="center">
                <UserAvatar size={100} path={props.artist?.profilePath}/>
            </Box>
            <p className={classes.displayName}>{props.artist?.userName}</p>
            <p className={classes.userId}>{`@${props.artist?.artistId}`}</p>
            <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.bookMark}
                startIcon={<Bookmark/>}>
                加入書籤
            </Button>
        </Container>
    )
}
