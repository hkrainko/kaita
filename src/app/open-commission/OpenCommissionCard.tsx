import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    createStyles,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    StandardProps,
    Theme
} from "@material-ui/core";
import {DateRangeOutlined, ExpandMoreOutlined, MmsOutlined, RateReviewOutlined} from "@material-ui/icons";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import {useState} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginTop: 0,
            marginBottom: 0,
            fontSize: '16px',
        },
        listItem: {

        },
        listItemIcon: {

        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            marginLeft: 'auto',
            transform: 'rotate(180deg)',
        },
    }),
);

interface Props extends StandardProps<any, any> {
    openCommission: OpenCommission
}

export default function OpenCommissionCard({openCommission, ...props}: Props) {

    const classes = useStyles(props.className)
    const [expanded, setExpanded] = useState(false)

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    title={
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <p className={classes.title}>{openCommission.title}</p>
                            <Box display={"flex"}>
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
                    image={`http://192.168.64.12:31398/${openCommission.sampleImagePaths[0]}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <List>
                        <ListItem className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <DateRangeOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="需時" secondary={`${openCommission.dayNeed?.from} ~ ${openCommission.dayNeed?.to} 日`}/>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <RateReviewOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="草稿可修改次數" secondary={`${openCommission.timesAllowedDraftToChange} 次`}/>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <MmsOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="完成品可修改次數" secondary={`${openCommission.timesAllowedCompletionToChange} 次`}/>
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    123
                </CardContent>
            </Collapse>
            <CardActions>
                <IconButton
                    className={`${expanded ? classes.expandOpen: classes.expand}`}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreOutlined />
                </IconButton>
            </CardActions>
        </Card>
    )

}
