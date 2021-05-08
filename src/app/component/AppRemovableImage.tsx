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
    file: File,
    onClickDelete: () => void
    key: number
}

export default function AppRemovableImage({className, file, onClickDelete, number}: AppImageCropProps) {
    const props = {backgroundColor: 'black', color: 'white', width: '10px'};
    const classes = useStyles(props);

    const [fileSrc, setFileSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setFileSrc(reader.result as string)
        };
        reader.readAsDataURL(file);
    }, [file])

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
