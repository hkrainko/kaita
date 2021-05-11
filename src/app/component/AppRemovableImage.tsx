import React, {ReactNode, useEffect, useState} from "react";
import {Box, createStyles, IconButton, makeStyles, StandardProps, Theme} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        div: {
            position: 'relative'
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

export interface AppImageCropProps extends StandardProps<any, any> {
    src: File | string,
    onClickDelete: () => void
    key: number
}

export default function AppRemovableImage({className, src, onClickDelete, number}: AppImageCropProps) {
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
                <img src={fileSrc} alt="" width="100%"/>
                <IconButton aria-label="delete" className={classes.iconButton} onClick={onClickDelete}>
                    <CancelIcon/>
                </IconButton>
            </div>
        </Box>
    )
}
