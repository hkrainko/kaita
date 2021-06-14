import {
    Box,
    Card,
    CardActionArea, CardContent,
    CardMedia, Chip,
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
import UserCard from "../component/UserCard";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userAvatarBox: {
            marginTop: '-50px',
            position: 'relative'
        },
    })
)

const getMark = (requestCount: number, acceptCount: number, successCount: number): string => {

    const acceptPct = requestCount > 0 ? acceptCount/requestCount : '-'
    const successPct = successCount > 0 ? successCount/requestCount : '-'

    return `${requestCount} / ${acceptPct} / ${successPct}`
}

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
                <Typography>@{artist.artistId}</Typography>
                <CardContent>
                    <Typography>{`${artist.commissionDetails.avgRatings ?? "-"}`}</Typography>
                    <Typography>
                        {getMark(
                            artist.commissionDetails.commissionRequestCount,
                            artist.commissionDetails.commissionAcceptCount,
                            artist.commissionDetails.commissionSuccessCount
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Box display={"flex"} px={2} paddingBottom={2} justifyContent={"space-between"} alignItems={"flex-end"}>
                {
                    artist.paymentMethods.map(method =>
                        <Chip variant="outlined" size="small" label={method}/>
                    )
                }
                <Typography variant={"body2"} color={"textSecondary"}>
                    {moment().calendar(artist.lastUpdatedTime)}
                </Typography>
            </Box>
        </Card>
    )
}
