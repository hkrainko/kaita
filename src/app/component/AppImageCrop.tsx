import 'react-image-crop/dist/ReactCrop.css';
import React, {useCallback, useEffect, useRef, useState} from "react";
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
    file: File,
    onClickDelete: () => void
    onCroppedImg: (file: File | null) => void
    preCropHeightPercent?: number
    preCropWidthPercent?: number
    circularCrop?: boolean
    aspect?: number
}

export default function AppImageCrop({...props}: AppImageCropProps) {
    const classes = useStyles();

    const [fileSrc, setFileSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({
        unit: '%' as '%',
        height: props.preCropHeightPercent,
        width: props.preCropWidthPercent,
        x: 25,
        aspect: props.aspect,
    });
    const imgRef = useRef<any>(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setFileSrc(reader.result as string)
        };
        reader.readAsDataURL(props.file);
    }, [props.file])

    const onImageLoaded = useCallback((img) => {
        imgRef.current = img;

    }, []);

    const onComplete = useCallback((crop: ReactCrop.Crop, percentCrop: ReactCrop.PercentCrop) => {
        console.log(`${crop.x}, ${crop.y}, ${crop.width}, ${crop.height}, ${imgRef.current}`)
        if (!imgRef.current || crop.x === undefined || crop.y === undefined || crop.width === undefined || crop.height === undefined) {
            return
        }
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = Math.ceil(crop.width*scaleX);
        tmpCanvas.height = Math.ceil(crop.height*scaleY);
        const ctx = tmpCanvas.getContext("2d");
        const image = imgRef.current;
        ctx!.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width*scaleX,
            crop.height*scaleY,
        );
        return new Promise<File | null>((resolve, reject) => {
            tmpCanvas.toBlob(blob => {
                if (!blob) {
                    return resolve(null)
                }
                const nameWithOutExt = props.file.name.split('.').slice(0, -1).join('.')
                resolve(new File([blob!], nameWithOutExt + '.jpg'))
            }, 'image/jpeg', 1);
        }).then((file: File | null) => {
            props.onCroppedImg(file)
        });
    }, [props]);

    return (
        <Box>
            <div className={classes.div}>
                <ReactCrop
                    src={fileSrc!}
                    onImageLoaded={onImageLoaded}
                    crop={crop}
                    onChange={(newCrop: any) => setCrop(newCrop)}
                    onComplete={onComplete}
                    circularCrop={props.circularCrop}
                    // locked={true}
                    keepSelection={true}
                />
                <IconButton aria-label="delete" className={classes.iconButton} onClick={props.onClickDelete}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </div>
        </Box>
    )
}
