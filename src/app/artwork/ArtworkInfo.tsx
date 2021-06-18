import {
    createStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import {
    AspectRatio,
    BrushOutlined,
    DataUsage,
    Event,
    EventAvailable,
    InsertDriveFile,
    Person,
    PhotoLibraryOutlined
} from "@material-ui/icons";
import moment from "moment";
import {Artwork} from "../../domain/artwork/artwork";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(0)
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
    artwork: Artwork | null
}

export default function ArtworkInfo({artwork, ...props}: Props) {
    const classes = useStyles()

    return (
        <Paper variant="elevation">
            <List className={classes.root}>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <BrushOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="繪師" secondary={`${artwork?.artistName}@${artwork?.artistId}`}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary="委托人" secondary={`${artwork?.requesterName}@${artwork?.requesterId}`}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <Event/>
                    </ListItemIcon>
                    <ListItemText primary="委托日期" secondary={
                        artwork?.startTime
                            ? moment(artwork.startTime).format("YYYY-MM-DD")
                            : "-"
                    }/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <EventAvailable/>
                    </ListItemIcon>
                    <ListItemText primary="完成日期" secondary={
                        artwork?.completedTime
                            ? moment(artwork.completedTime).format("YYYY-MM-DD")
                            : "-"
                    }/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <InsertDriveFile/>
                    </ListItemIcon>
                    <ListItemText primary="檔案類型" secondary={
                        artwork?.contentType
                    }/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <DataUsage/>
                    </ListItemIcon>
                    <ListItemText primary="檔案大小" secondary={
                        artwork?.volume
                    }/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <AspectRatio/>
                    </ListItemIcon>
                    <ListItemText primary={`寬度 x 高度`} secondary={
                        `${artwork?.size.width} x ${artwork?.size.height} ${artwork?.size.unit}`
                    }/>
                </ListItem>
            </List>
        </Paper>
    )

}
