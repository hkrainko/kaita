import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    createStyles,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {AttachMoneyOutlined} from "@material-ui/icons";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";

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
    openCommission: OpenCommission
}

export default function OpenCommissionCard({openCommission, ...props}: Props) {

    const classes = useStyles(props.className)

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    title={
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <p className={classes.title}>{openCommission.title}</p>
                            <Box display={"flex"}>
                                <AttachMoneyOutlined/>
                                <p className={classes.title}>
                                    {`${openCommission.price?.amount} ${openCommission.price?.currency}`}
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
                        {openCommission.desc}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {openCommission.dayNeed?.from}~{openCommission.dayNeed?.to} 天
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
