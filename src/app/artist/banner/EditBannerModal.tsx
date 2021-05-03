import {
    Box, Button,
    createStyles,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    IconButton,
    makeStyles,
    Modal, Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import {Edit} from "@material-ui/icons";
import AppImageCrop from "../../component/AppImageCrop";
import AppDropzone from "../../component/AppDropzone";
import AppRemovableImage from "../../component/AppRemovableImage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

interface Props {
    open: boolean
    onClose: () => void
}

export default function EditBannerModal(props: Props)  {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle)
    const [file, setFile] = useState<File | null>(null);
    const [bannerfile, setBannerFile] = useState<File | null>(null);
    const onClickedCancel = useCallback(() => {

    }, [])

    const filesCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            files.length ? setFile(files[0]) : setFile(null)
        }, []);

    const onCroppedImg = useCallback(
        (file: File | null) => {
            // console.log(`base64Img:${base64Img?.length}`)
            console.log(`file:${file?.name}`)
            setBannerFile(file)
        }, [])

    const onClickDeleteImage = useCallback(
        () => {
            setFile(null)
            setBannerFile(null)
        }
        , [])

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                編輯橫額
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    拖放或選擇圖片
                </DialogContentText>
                {file
                    ? <AppImageCrop
                        file={file}
                        onClickDelete={onClickDeleteImage}
                        onCroppedImg={onCroppedImg}
                        preCropHeightPercent={50}
                        preCropWidthPercent={50}
                    />
                    : <AppDropzone onDrop={filesCallback}/>
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.onClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}
