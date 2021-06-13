import {
    Box,
    Card,
    CardActionArea, CardContent,
    CardMedia,
    createStyles,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {Artist} from "../../domain/artist/model/artist";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import React, {SyntheticEvent, useState} from "react";
import UserAvatar from "../component/UserAvatar";
import {Skeleton} from "@material-ui/lab";

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

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <Card>
            <CardActionArea>
                {
                    isImageLoaded ||
                    <Skeleton variant="rect" animation={"wave"} height={150}/>
                }
                <CardMedia
                    style={isImageLoaded ? {} : {display: 'none'}}
                    component="img"
                    alt="Artist Card"
                    height="150"
                    image={`http://192.168.64.12:31398/${artist.artistBoard.bannerPath}`}
                    title="Artist Card"
                    onLoad={(event: SyntheticEvent) => setIsImageLoaded(true)}
                />
                <Box display="flex" justifyContent="center" className={classes.userAvatarBox}>
                    <UserAvatar size={100} path={`http://192.168.64.12:31398/${artist.profilePath}`}/>
                </Box>
                <Typography>{artist.userName}</Typography>
                <Typography>{artist.artistId}</Typography>
                <CardContent>
                    <Typography>{`paymentMethods:${artist.paymentMethods}`}</Typography>
                    <Typography>{`commissionRequestCount:${artist.commissionDetails.commissionRequestCount}`}</Typography>
                    <Typography>{`commissionAcceptCount:${artist.commissionDetails.commissionAcceptCount}`}</Typography>
                    <Typography>{`commissionSuccessCount:${artist.commissionDetails.commissionSuccessCount}`}</Typography>
                    <Typography>{`avgRatings:${artist.commissionDetails.avgRatings}`}</Typography>
                    <Typography>{`lastRequestTime:${artist.commissionDetails.lastRequestTime}`}</Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}
