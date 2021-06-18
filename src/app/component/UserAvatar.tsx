import {Avatar, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: (props: Props) => {
            if (props.showBorder) {
                return ({
                    width: props.size,
                    height: props.size,
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "white"
                })
            } else {
                return ({
                    width: props.size,
                    height: props.size,
                })
            }
        }
    }),
);

interface Props extends StandardProps<any, any> {
    size: number
    showBorder?: boolean
    path?: string
    onClick?: (event: React.MouseEvent) => void
}

export default function UserAvatar({size, showBorder, path, onClick, ...props}: Props) {

    const classes = useStyles({size, showBorder})

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
