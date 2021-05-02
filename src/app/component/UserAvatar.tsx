import {Avatar, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            margin: 'auto',
            height: 100,
            width: 100
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function UserAvatar(props: Props) {

    const classes = useStyles(props.className)

    return (
        <Avatar
            alt="alt"
            src="https://https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            className={classes.avatar}
            // style={{alignSelf: "center"}}
        />
    )

}
