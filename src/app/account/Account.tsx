import {
    Avatar,
    Container,
    createStyles, Divider, IconButton,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import {useAppSelector} from "../hooks";
import {Artwork as DArtwork} from "../../domain/artwork/artwork";
import {AuthUser} from "../../domain/auth-user/model/auth-user";
import UserAvatar from "../component/UserAvatar";
import {EditOutlined} from "@material-ui/icons";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8)
        },
        paper: {
            // paddingTop: theme.spacing(4),
            // paddingLeft: theme.spacing(4),
            // paddingBottom: theme.spacing(4)
            padding: theme.spacing(4)
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function Account(props: Props) {
    const classes = useStyles()

    const authUser = useAppSelector<AuthUser | null>((state) => state.auth.authUser)

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <List>
                    <ListItem>
                        <UserAvatar size={120} path={`http://192.168.64.12:31398/${authUser?.profilePath}`}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="用戶帳號" secondary={authUser?.userId}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="用戶名稱" secondary={authUser?.userName}/>
                        <ListItemSecondaryAction>
                            <IconButton aria-label="edit"><EditOutlined/></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="電郵地址" secondary={authUser?.email}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="出生日期" secondary={authUser?.birthday}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="姓別" secondary={authUser?.gender}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="站內繪師" secondary={authUser?.isArtist ? "是" : "否"}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="註冊時間" secondary={authUser?.regTime}/>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="帳號狀態" secondary={authUser?.state}/>
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}
