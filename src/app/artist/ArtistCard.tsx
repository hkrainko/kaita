import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    createStyles,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {Artist} from "../../domain/artist/model/artist";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import React from "react";
import UserAvatar from "../component/UserAvatar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userAvatarBox: {
            marginTop: '-50px',
            position: 'relative'
        },
    })
)

interface Props extends StandardProps<any, any> {
    artist: Artist
    onMainAction: (artist: Artist) => void
}

export default function ArtistCard({artist, onMainAction, ...props}: Props) {
    const classes = useStyles(props.className)


    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={`http://192.168.64.12:31398/${artist.artistBoard.bannerPath}`}
                    title="Artist Card"
                />
                <Box display="flex" justifyContent="center" className={classes.userAvatarBox}>
                    <UserAvatar size={100} path={`http://192.168.64.12:31398/${artist.profilePath}`}/>
                </Box>
                <Typography>{artist.userName}</Typography>
                <Typography>{artist.artistId}</Typography>
            </CardActionArea>

        </Card>
    )
}
