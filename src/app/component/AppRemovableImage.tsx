import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactCrop from "react-image-crop";
import {Box, createStyles, IconButton, makeStyles, StandardProps, Theme, withStyles} from "@material-ui/core";
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

export interface AppImageCropProps extends StandardProps<any, any>{
    file: File,
    onClickDelete: () => void
    onCroppedImg: (file: File | null) => void
}

export default function AppRemovableImage({className, file, onClickDelete, onCroppedImg}: AppImageCropProps) {
    const props = { backgroundColor: 'black', color: 'white', width: '10px' };
    const classes = useStyles(props);

    const [fileSrc, setFileSrc] = useState<string | undefined>(undefined)
    const imgRef = useRef<any>(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setFileSrc(reader.result as string)
        };
        reader.readAsDataURL(file);
    }, [file])

    const onComplete = useCallback((crop: ReactCrop.Crop, percentCrop: ReactCrop.PercentCrop) => {
        console.log(`${crop.x}, ${crop.y}, ${crop.width}, ${crop.height}, ${imgRef.current}`)
        if (!imgRef.current || crop.x === undefined || crop.y === undefined || crop.width === undefined || crop.height === undefined) {
            return
        }
        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = crop.width as number;
        canvas.height = crop.height as number;
        const ctx = canvas.getContext('2d');

        return new Promise<File | null>((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    return resolve(null)
                }
                const nameWithOutExt = file.name.split('.').slice(0, -1).join('.')
                resolve(new File([blob!], nameWithOutExt + '.jpg'))
            }, 'image/jpeg', 1);
        }).then((file: File | null) => {
            onCroppedImg(file)
        });
    }, [file.name, onCroppedImg]);

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
