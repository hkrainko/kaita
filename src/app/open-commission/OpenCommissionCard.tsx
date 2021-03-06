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
import moment from "moment";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";

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
                    isImageLoaded
                        ? null
                        : <Skeleton variant="rect" animation={"wave"} height={180}/>
                }
                <CardMedia
                    style={isImageLoaded ? {} : {display: 'none'}}
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={imgBySize(ImageSize.Middle, openCommission.sampleImagePaths[0])}
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
                            label="??????"
                            size="small"
                            color="default"
                            className={classes.chip}
                        />}
                        {openCommission.allowBePrivate && <Chip
                            icon={<Check/>}
                            label="?????????"
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
                            <ListItemText primaryTypographyProps={{className: classes.ListItemTextPrimary}} primary="??????"
                                          secondary={`${openCommission.dayNeed?.from} ~ ${openCommission.dayNeed?.to} ???`}/>
                        </ListItem>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <RateReviewOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="?????????????????????"
                                              secondary={`${openCommission.timesAllowedDraftToChange} ???`}/>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <MmsOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="????????????????????????"
                                              secondary={`${openCommission.timesAllowedCompletionToChange} ???`}/>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <GavelOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="????????????" secondary={openCommission.depositRule}/>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <SubjectOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="??????" secondary={openCommission.desc}/>
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
            <Box display={"flex"} px={1} paddingBottom={2} justifyContent={"space-between"} alignItems={"flex-end"}>
                <Typography variant="subtitle2" color="textSecondary">@{'artist_ss'}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {moment().calendar(openCommission.createDate)}
                </Typography>
            </Box>
        </Card>
    )

}
