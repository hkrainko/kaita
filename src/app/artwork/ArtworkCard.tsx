import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles,
    IconButton,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {Artwork} from "../../domain/artwork/artwork";
import {Delete, Edit} from "@material-ui/icons";
import React, {SyntheticEvent, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import UserCard from "../component/UserCard";
import moment from "moment";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

interface Props extends StandardProps<any, any> {
    artwork: Artwork
    onMainAction: (artwork: Artwork) => void
    onEdit?: (artwork: Artwork) => void
    onDelete?: (artwork: Artwork) => void
}

export default function ArtworkCard({artwork, onMainAction, onEdit, onDelete, ...props}: Props) {
    const classes = useStyles(props.className)

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <Card>
            <CardActionArea onClick={() => onMainAction(artwork)}>
                {
                    isImageLoaded ||
                    <Skeleton variant="rect" animation={"wave"} height={140}/>
                }
                <CardMedia
                    style={isImageLoaded ? {} : {display: 'none'}}
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={imgBySize(ImageSize.Middle, artwork.path)}
                    title="Contemplative Reptile"
                    onLoad={(event: SyntheticEvent) => setIsImageLoaded(true)}
                />
                <CardContent>
                    <Box display="flex">
                        <Typography gutterBottom variant="h6" component="h2" color={"textPrimary"}>
                            {artwork.title || "(沒有標題)"}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <Typography gutterBottom variant="subtitle2" component="h2" color={"textSecondary"}>
                            {`${artwork.rating} (${artwork.views})`}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                    onEdit &&
                    <IconButton onClick={() => onEdit && onEdit(artwork)}>
                        <Edit/>
                    </IconButton>
                }
                {
                    onDelete &&
                    <IconButton onClick={() => onDelete && onDelete(artwork)}>
                        <Delete/>
                    </IconButton>
                }
            </CardActions>
            <Box display={"flex"} px={1} paddingBottom={2} justifyContent={"space-between"} alignItems={"flex-end"}>
                <UserCard
                    width={30}
                    id={artwork.artistId}
                    name={artwork.artistName}
                    path={artwork.artistProfilePath && imgBySize(ImageSize.Small, artwork.artistProfilePath)}
                />
                <Typography variant={"body2"} color={"textSecondary"}>
                    {moment().calendar(artwork.completedTime)}
                </Typography>
            </Box>
        </Card>
    )

}
