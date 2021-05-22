import {createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useAppSelector} from "../hooks";
import axios, {AxiosResponse} from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    }),
);

interface Props extends StandardProps<any, any> {
    src?: string
    alt?: string
}

export default function AuthImage({src, alt, ...props}: Props) {
    const classes = useStyles(props.className)

    const authUser = useAppSelector((state) => state.auth?.authUser)
    const [imgData, setImgData] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!authUser || !src) {
            return
        }
        axios.get(src, {
            headers: { Authorization: `Bearer ${authUser.apiToken}` },
            responseType: "arraybuffer"
        }).then((resp: AxiosResponse<any>) => {
            const contentType = resp.headers['content-type']
            const base64 = Buffer.from(resp.data, 'binary').toString('base64')
            const data = `data:${contentType};base64,${base64}`
            setImgData(data)
        })
    }, [authUser, src])

    return (
        <img
            src={imgData}
            alt={alt}
            className={classes.root}
        />
    )
}


