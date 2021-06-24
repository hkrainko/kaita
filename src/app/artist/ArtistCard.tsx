import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Chip,
    createStyles,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {Artist} from "../../domain/artist/model/artist";
import React, {SyntheticEvent, useState} from "react";
import UserAvatar from "../component/UserAvatar";
import {Skeleton} from "@material-ui/lab";
import moment from "moment";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userAvatarBox: {
            marginTop: '-50px',
            position: 'relative'
        },
        artTypeChip: {
            marginLeft: '4px'
        },
        paymentMethodChip: {
            marginRight: '4px'
        }
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
            <CardActionArea onClick={() => onMainAction(artist)}>
                {
                    isImageLoaded
                        ? null
                        : <Skeleton variant="rect" animation={"wave"} height={150}/>
                }
                <CardMedia
                    style={isImageLoaded ? {} : {display: 'none'}}
                    component="img"
                    alt="Artist Card"
                    height="150"
                    image={artist.artistBoard.bannerPath && imgBySize(ImageSize.Middle, artist.artistBoard.bannerPath)}
                    title="Artist Card"
                    onLoad={(event: SyntheticEvent) => setIsImageLoaded(true)}
                />
                {
                    <Box display="flex" position="absolute" top={8} right={8}>
                        {
                            artist.artistIntro.artTypes.map((artType, index) =>
                                <Chip
                                    key={index}
                                    variant="default"
                                    color="primary"
                                    size="small"
                                    label={artType}
                                    className={classes.artTypeChip}
                                />
                            )
                        }
                    </Box>
                }
                <Box display="flex" justifyContent="center" className={classes.userAvatarBox}>
                    <UserAvatar size={100} path={artist.profilePath && imgBySize(ImageSize.Middle, artist.profilePath)}/>
                </Box>
                <Box my={1}>
                    <Typography>{artist.userName}</Typography>
                    <Typography>@{artist.artistId}</Typography>
                </Box>
                <Box mb={1}>
                    <Typography>{`${artist.commissionDetails.avgRatings ?? "-"}`}</Typography>
                    <Typography>
                        {getMark(
                            artist.commissionDetails.commissionRequestCount,
                            artist.commissionDetails.commissionAcceptCount,
                            artist.commissionDetails.commissionSuccessCount
                        )}
                    </Typography>
                </Box>
            </CardActionArea>
            <Box display={"flex"} px={2} paddingBottom={2} justifyContent={"space-between"} alignItems={"center"}>
                {
                    artist.paymentMethods?.map(method =>
                        <Chip variant="outlined" size="small" label={method} className={classes.paymentMethodChip}/>
                    )
                }
                <Typography variant={"body2"} color={"textSecondary"}>
                    {moment().calendar(artist.lastUpdatedTime)}
                </Typography>
            </Box>
        </Card>
    )
}
