import {Container, createStyles, Grid, makeStyles, StandardProps, Theme} from "@material-ui/core";
import UserAvatar from "../component/UserAvatar";
import {Artist} from "../../domain/artist/model/artist";

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
            <UserAvatar path={props.artist?.profilePath}/>
            <p className={classes.displayName}>{props.artist?.userName}</p>
            <p className={classes.userId}>{`@${props.artist?.artistId}`}</p>
        </Container>
    )
}
