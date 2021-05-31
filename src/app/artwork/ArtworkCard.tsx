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
import React from "react";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

interface Props extends StandardProps<any, any> {
    artwork: Artwork
    onEdit?: (artwork: Artwork) => void
    onDelete?: (artwork: Artwork) => void
}

export default function ArtworkCard({artwork, onEdit, onDelete, ...props}: Props) {

    const classes = useStyles(props.className)

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={`http://192.168.64.12:31398/${artwork.path}`}
                    title="Contemplative Reptile"
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
                <Box display={"flex"} flexGrow={1} px={1}>
                    <Typography variant={"subtitle2"}>@{artwork.artistId}</Typography>
                </Box>
                <IconButton onClick={() => onEdit && onEdit(artwork)}>
                    <Edit/>
                </IconButton>
                <IconButton onClick={() => onDelete && onDelete(artwork)}>
                    <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    )

}
