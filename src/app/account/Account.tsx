import {
    Container,
    createStyles,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../hooks";
import {AuthUser} from "../../domain/auth-user/model/auth-user";
import UserAvatar from "../component/UserAvatar";
import {EditOutlined} from "@material-ui/icons";
import React, {useCallback, useState} from "react";
import EditUserNameModal from "./EditUserNameModal";
import NotFound from "../error/NotFound";
import EditProfileModal from "./EditProfileModal";
import moment from "moment";
import {getAuthUser} from "../auth-user/usecase/authUserSlice";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";

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
    const dispatch = useAppDispatch()
    const [editingUserName, setEditingUserName] = useState(false)
    const [editingProfile, setEditingProfile] = useState(false)

    const onCloseEditUserNameModal = useCallback((success: boolean) => {
        if (success) {
            dispatch(getAuthUser({}))
        }
        setEditingUserName(false)
    }, [dispatch])

    const onCloseEditProfileModal = useCallback((success: boolean) => {
        if (success) {
            dispatch(getAuthUser({}))
        }
        setEditingProfile(false)
    }, [dispatch])

    if (!authUser) {
        return <NotFound/>
    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Paper className={classes.paper}>
                    <List>
                        <ListItem>
                            <UserAvatar
                                size={120}
                                path={authUser.profilePath && imgBySize(ImageSize.Middle, authUser.profilePath)}
                                onClick={() => setEditingProfile(true)}
                            />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="用戶帳號" secondary={authUser.userId}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="用戶名稱" secondary={authUser.userName}/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="edit" onClick={() => setEditingUserName(true)}>
                                    <EditOutlined/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="電郵地址" secondary={authUser.email}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="出生日期" secondary={authUser.birthday}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="姓別" secondary={authUser.gender}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="站內繪師" secondary={authUser.isArtist ? "是" : "否"}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="註冊時間" secondary={moment(authUser.regTime).format('YYYY-MM-DD')}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="帳號狀態" secondary={authUser.state}/>
                        </ListItem>
                    </List>
                </Paper>
            </Container>
            {
                editingUserName &&
                    <EditUserNameModal
                        currentUserName={authUser.userName}
                        open={editingUserName}
                        onClose={onCloseEditUserNameModal}
                    />
            }
            {
                editingProfile &&
                    <EditProfileModal
                        open={editingProfile}
                        onClose={onCloseEditProfileModal}
                    />
            }
        </React.Fragment>
    )
}
