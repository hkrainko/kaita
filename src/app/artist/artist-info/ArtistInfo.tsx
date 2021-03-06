import {
    Chip,
    createStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import {
    AlarmOnOutlined,
    BrushOutlined,
    CheckCircleOutline,
    PaymentOutlined,
    PhotoLibraryOutlined,
    QueryBuilderOutlined,
    RateReviewOutlined,
    SentimentSatisfiedAltOutlined
} from "@material-ui/icons";
import {Artist, CommissionDetails} from "../../../domain/artist/model/artist";
import moment from "moment";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('md')]: {
                margin: theme.spacing(2)
            }
        },
        listItem: {
            paddingTop: 0,
            paddingBottom: 0,
            fontsize: '10px'
        },
        listItemIcon: {}
    })
);

interface Props extends StandardProps<any, any> {
    artist: Artist | null
}

export default function ArtistInfo(props: Props) {
    const classes = useStyles()

    const getCommAcceptRequestText = (commDetails: CommissionDetails | undefined): string => {
        if (!commDetails?.commissionAcceptCount || !commDetails?.commissionRequestCount) {
            return "-"
        }
        const percent = commDetails.commissionAcceptCount / commDetails.commissionRequestCount * 100
        return `${commDetails.commissionAcceptCount}/${commDetails.commissionRequestCount}(${percent}%)`
    }

    const getCommSuccessPercentText = (commDetails: CommissionDetails | undefined): string => {
        if (!commDetails?.commissionSuccessCount || !commDetails.commissionAcceptCount) {
            return "-"
        }
        return (commDetails.commissionSuccessCount / commDetails.commissionAcceptCount * 100) + "%"
    }

    return (
        <Paper variant={"elevation"} className={classes.root}>
            <List>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <BrushOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="??????" secondary={!props.artist?.artistIntro.yearOfDrawing && "-"}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <PhotoLibraryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="????????????" secondary={
                        props.artists?.artistIntro.artTypes.length
                            ? props.artists?.artistIntro.artTypes.map((value: string, index: number) => {
                                return <Chip size="small" label={value}/>
                            })
                            : "-"

                    }/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <PaymentOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="????????????" secondary={
                        props.artists?.paymentMethod.length
                            ? props.artists?.paymentMethod.map((value: string, index: number) => {
                                return <Chip size="small" label={value}/>
                            })
                            : "-"
                    }/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <RateReviewOutlined/>
                    </ListItemIcon>
                    <ListItemText
                        primary="????????????/?????????"
                        secondary={getCommAcceptRequestText(props.artist?.commissionDetails)}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <CheckCircleOutline/>
                    </ListItemIcon>
                    <ListItemText
                        primary="???????????????"
                        secondary={getCommSuccessPercentText(props.artist?.commissionDetails)}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <SentimentSatisfiedAltOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="??????" secondary={!props.artist?.commissionDetails.avgRatings && "-"}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <AlarmOnOutlined/>
                    </ListItemIcon>
                    <ListItemText
                        primary="????????????????????????"
                        secondary={
                            props.artist?.commissionDetails.lastRequestTime
                                ? moment(props.artist?.commissionDetails.lastRequestTime).format('YYYY-MM-DD')
                                : "-"
                        }
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <QueryBuilderOutlined/>
                    </ListItemIcon>
                    <ListItemText
                        primary="????????????"
                        secondary={moment(props.artist?.regTime).format('YYYY-MM-DD')}
                    />
                </ListItem>
            </List>
        </Paper>
    )

}
