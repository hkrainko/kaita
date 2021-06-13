import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles, IconButton,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {Artwork} from "../../domain/artwork/artwork";
import {Delete, Edit, ExpandMoreOutlined} from "@material-ui/icons";
import React, {SyntheticEvent, useState} from "react";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import {Skeleton} from "@material-ui/lab";

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
                    image={`http://192.168.64.12:31398/${artwork.path}`}
                    title="Contemplative Reptile"
                    onLoad={(event: SyntheticEvent) => setIsImageLoaded(true)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {artwork.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {artwork.id}
                    </Typography>
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
            <Box display={"flex"} px={1} paddingBottom={1}>
                <Typography variant={"body2"} color={"textSecondary"}>{artwork.artistId}</Typography>
            </Box>
        </Card>
    )

}
