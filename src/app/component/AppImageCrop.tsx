import 'react-image-crop/dist/ReactCrop.css';
import React, {useCallback, useRef, useState} from "react";
import ReactCrop from "react-image-crop";
import {Box, createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

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
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

export interface AppImageCropProps {
    src: string,
    onClickDelete: () => void
    onCroppedImg: (base64Img?: string) => void
}

export default function AppImageCrop({src, onClickDelete, onCroppedImg}: AppImageCropProps) {
    const classes = useStyles();

    const [crop, setCrop] = useState({
        unit: '%' as '%',
        width: 50,
        x: 25,
        aspect: 1,
    });
    const imgRef = useRef<any>(null);

    const onImageLoaded = useCallback((img) => {
        imgRef.current = img;

    }, []);

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

        ctx!.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        onCroppedImg(base64Image)

    }, [onCroppedImg]);

    return (
        <Box>
            <div className={classes.div}>
                <ReactCrop
                    src={src}
                    onImageLoaded={onImageLoaded}
                    crop={crop}
                    onChange={(newCrop: any) => setCrop(newCrop)}
                    onComplete={onComplete}
                    circularCrop={true}
                    // locked={true}
                    keepSelection={true}
                />
                <IconButton aria-label="delete" className={classes.iconButton} onClick={onClickDelete}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </div>
        </Box>
    )
}
