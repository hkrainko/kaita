import {
    Box,
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent, CardHeader,
    CardMedia,
    createStyles,
    makeStyles,
    StandardProps,
    Theme, Typography
} from "@material-ui/core";
import {AttachMoneyOutlined, LocalOfferOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginTop: 0,
            marginBottom: 0,
            fontSize: '16px',
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function ArtworkCard(props: Props) {

    const classes = useStyles(props.className)

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    title={
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <p className={classes.title}>Q版頭像</p>
                            <Box display={"flex"}>
                                <AttachMoneyOutlined/>
                                <p className={classes.title}>
                                    5,000 HKD
                                </p>
                            </Box>
                        </Box>
                    }
                />
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
