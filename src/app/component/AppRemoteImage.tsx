import React, {ReactNode, useEffect, useState} from "react";
import {Box, createStyles, IconButton, makeStyles, StandardProps, Theme} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {CloudOff, CloudQueue} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        div: {
            position: 'relative'
        },
        img: {
            width: '100%'
        },
        dimmedImg: {
            filter: 'brightness(50%)',
            width: '100%'
        },
        iconButton: {
            margin: theme.spacing(1),
            position: 'absolute',
            top: "0",
            right: "0",
            padding: theme.spacing(0),
        },
    })
);

export interface Props extends StandardProps<any, any> {
    src: File | string
    toBeRemoved: boolean
    onClickDelete: () => void
    key: number
}

export default function AppRemoteImage({className, src, toBeRemoved, onClickDelete, number}: Props) {
    const classes = useStyles();

    const [fileSrc, setFileSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (typeof src === "string") {
            setFileSrc(src)
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                setFileSrc(reader.result as string)
            };
            reader.readAsDataURL(src);
        }
    }, [src])

    return (
        <Box className={className}>
            <div className={classes.div}>
                <img src={fileSrc} alt="" className={toBeRemoved ? classes.dimmedImg : classes.img}/>
                <IconButton aria-label="delete" className={classes.iconButton} onClick={onClickDelete}>
                    {toBeRemoved ? <CloudOff/> : <CloudQueue/>}
                </IconButton>
            </div>
        </Box>
    )
}
