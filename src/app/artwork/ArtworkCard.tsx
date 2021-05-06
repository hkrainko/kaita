import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

interface Props extends StandardProps<any, any> {

}

export default function ArtworkCard(props: Props) {

    const classes = useStyles(props.className)

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    )

}
