import {Box, createStyles, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import React from "react";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}),
);

interface Props extends StandardProps<any, any> {
    width: number
    name: string
    id: string
    path?: string
}

export default function UserCard({name, id, path, ...props}: Props) {

    const classes = useStyles({size: props.size})

    console.log(`CCC:${path}`)

    return (
        <Box display="flex">
            <UserAvatar
                path={path}
                size={36}/>
            <Box textAlign={"start"} ml={1}>
                <Typography variant={"subtitle2"} color={"textSecondary"}>{name}</Typography>
                <Typography variant={"subtitle2"} color={"textSecondary"}>@{id}</Typography>
            </Box>
        </Box>
    )

}
