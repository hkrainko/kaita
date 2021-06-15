import {
    Avatar,
    Container,
    createStyles, Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import {useAppSelector} from "../hooks";
import {Artwork as DArtwork} from "../../domain/artwork/artwork";
import {AuthUser} from "../../domain/auth-user/auth-user";
import UserAvatar from "../component/UserAvatar";


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
                    <ListItem>
                        <ListItemText primary="用戶帳號" secondary={authUser?.userId}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="用戶名稱" secondary={authUser?.userName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="電郵地址" secondary={authUser?.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="出生日期" secondary={authUser?.birthday} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="姓別" secondary={authUser?.gender} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="站內繪師" secondary={authUser?.isArtist ? "是" : "否"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="註冊時間" secondary={authUser?.regTime} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="帳號狀態" secondary={authUser?.state} />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}
