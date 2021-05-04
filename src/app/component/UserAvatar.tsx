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
    path?: string
}

export default function UserAvatar(props: Props) {

    const classes = useStyles(props.className)

    return (
        <Avatar
            alt="alt"
            src={props.path}
            className={classes.avatar}
            // style={{alignSelf: "center"}}
        />
    )

}
