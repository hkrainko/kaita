import {Button, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../hooks";
import axios, {AxiosResponse} from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
    }),
);

interface Props extends StandardProps<any, any> {
    src?: string
    alt?: string
}

export default function AuthFile({src, alt, ...props}: Props) {
    const classes = useStyles(props.className)

    const authUser = useAppSelector((state) => state.auth?.authUser)

    const onClick = useCallback(() => {
        if (!authUser || !src) {
            return
        }
        let word = src.split('/')
        let fileName = word[word.length - 1]
        axios.get(src, {
            headers: {Authorization: `Bearer ${authUser.apiToken}`},
            responseType: "arraybuffer"
        })
            .then((response) => {
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(
                    new Blob([response.data], {type: "application/octet-stream"})
                );
                link.download = fileName;

                document.body.appendChild(link);

                link.click();
                setTimeout(() => {
                    return window.URL.revokeObjectURL(link.href);
                }, 200);
            })
            .catch((error) => {
            });
    }, [authUser, src])

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            className={classes.root}
        >下載完成品</Button>
    )
}


