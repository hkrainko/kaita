import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
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
    Check,
    Delete,
    Edit,
    ExpandMoreOutlined,
    GavelOutlined,
    MmsOutlined,
    RateReviewOutlined,
    ScheduleOutlined,
    SubjectOutlined
} from "@material-ui/icons";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import React, {SyntheticEvent, useState} from "react";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginTop: 0,
            marginBottom: 0,
            fontSize: '16px',
        },
        cardContent: {
            paddingBottom: 0
        },
        list: {},
        chip: {
            marginRight: theme.spacing(1)
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
    onMainAction: (openCommission: OpenCommission) => void
    onEdit?: (openCommission: OpenCommission) => void
    onDelete?: (openCommission: OpenCommission) => void
}

export default function OpenCommissionCard({openCommission, onMainAction, onEdit, onDelete, ...props}: Props) {

    const classes = useStyles(props.className)
    const [expanded, setExpanded] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <Card>
            <CardActionArea onClick={() => onMainAction(openCommission)}>
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
                {
                    isImageLoaded ||
                    <Skeleton variant="rect" animation={"wave"} height={180}/>
                }
                <CardMedia
                    style={isImageLoaded ? {} : {display: 'none'}}
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={`http://192.168.64.12:31398/${openCommission.sampleImagePaths[0]}`}
                    // image={'https://news.cgtn.com/news/77416a4e3145544d326b544d354d444d3355444f31457a6333566d54/img/37d598e5a04344da81c76621ba273915/37d598e5a04344da81c76621ba273915.jpg'}
                    title="Open Commission Sample Image"
                    onLoad={(event: SyntheticEvent) => setIsImageLoaded(true)}
                />
                <CardContent className={classes.cardContent}>
                    <Box display="flex">
                        {openCommission.isR18 && <Chip
                            icon={<Check/>}
                            label="R18"
                            size="small"
                            color="secondary"
                            className={classes.chip}
                        />}
                        {openCommission.allowAnonymous && <Chip
                            icon={<Check/>}
                            label="匿名"
                            size="small"
                            color="default"
                            className={classes.chip}
                        />}
                        {openCommission.allowBePrivate && <Chip
                            icon={<Check/>}
                            label="不公開"
                            size="small"
                            color="default"
                            className={classes.chip}
                        />}
                    </Box>
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <ScheduleOutlined/>
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{className: classes.ListItemTextPrimary}} primary="需時"
                                          secondary={`${openCommission.dayNeed?.from} ~ ${openCommission.dayNeed?.to} 日`}/>
                        </ListItem>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <RateReviewOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="草稿可修改次數"
                                              secondary={`${openCommission.timesAllowedDraftToChange} 次`}/>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <MmsOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="完成品可修改次數"
                                              secondary={`${openCommission.timesAllowedCompletionToChange} 次`}/>
                            </ListItem>
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
                <Box display={"flex"} flexGrow={1}/>
                {
                    onEdit &&
                    <IconButton onClick={() => onEdit && onEdit(openCommission)}>
                        <Edit/>
                    </IconButton>
                }
                {
                    onDelete &&
                    <IconButton onClick={() => onDelete && onDelete(openCommission)}>
                        <Delete/>
                    </IconButton>
                }
                <IconButton
                    className={`${expanded ? classes.expandOpen : classes.expand}`}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreOutlined/>
                </IconButton>
            </CardActions>
            <Box display={"flex"} px={1} paddingBottom={1}>
                <Typography variant={"body2"} color={"textSecondary"}>{openCommission.id}</Typography>
            </Box>
        </Card>
    )

}
