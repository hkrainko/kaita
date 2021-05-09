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
    Theme,
    Typography
} from "@material-ui/core";
import {
    DateRangeOutlined,
    ExpandMoreOutlined,
    GavelOutlined,
    MmsOutlined,
    RateReviewOutlined,
    SubjectOutlined
} from "@material-ui/icons";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import {useState} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginTop: 0,
            marginBottom: 0,
            fontSize: '16px',
        },
        list: {
            padding: 0
        },
        listItem: {
            padding: 0,
        },
        listItemIcon: {
            minWidth: '40px'
        },
        ListItemTextPrimary: {
            fontSize: '14px'
        },
        ListItemTextSecondary: {
            fontSize: '12px'
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
                            <Typography>{openCommission.title}</Typography>
                            <Box display={"flex"}>
                                <Typography>
                                    {`${openCommission.price?.amount} ${openCommission.price?.currency}`}
                                </Typography>
                            </Box>
                        </Box>
                    }
                />
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={`http://192.168.64.12:31398/${openCommission.sampleImagePaths[0]}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <DateRangeOutlined/>
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{className: classes.ListItemTextPrimary}} primary="需時" secondary={`${openCommission.dayNeed?.from} ~ ${openCommission.dayNeed?.to} 日`}/>
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
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <GavelOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="訂金規則" secondary={openCommission.depositRule}/>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <SubjectOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="內容" secondary={openCommission.desc}/>
                            </ListItem>
                        </Collapse>
                    </List>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box display={"flex"} flexGrow={1} px={1}>
                    <Typography variant={"caption"}>@{openCommission.artistId}</Typography>
                </Box>
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
