import {Avatar, createStyles, makeStyles, PropTypes, StandardProps, Theme} from "@material-ui/core";
import React, {MouseEventHandler, ReactEventHandler} from "react";

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
    onClick?: (event: React.MouseEvent) => void
}

export default function UserAvatar({size, path, onClick, ...props}: Props) {

    const classes = useStyles({size})

    return (
        <Avatar
            alt="alt"
            src={path}
            className={classes.avatar}
            onClick={(event) => {
                if (onClick) {
                    onClick(event)
                }
            }}
            // style={{alignSelf: "center"}}
        />
    )

}
