import {Avatar, createStyles, makeStyles, PropTypes, StandardProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: (props: {size: number}) => ({
            width: props.size,
            height: props.size
        })
    }),
);

interface Props extends StandardProps<any, any> {
    size: number
    path?: string
}

export default function UserAvatar(props: Props) {

    const classes = useStyles({size: props.size})

    return (
        <Avatar
            alt="alt"
            src={props.path}
            className={classes.avatar}
            // style={{alignSelf: "center"}}
        />
    )

}
