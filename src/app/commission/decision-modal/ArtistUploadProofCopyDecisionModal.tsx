import {Commission} from "../../../domain/commission/model/commission";
import {
    Button,
    createStyles, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme
} from "@material-ui/core";
import {useAppDispatch} from "../../hooks";
import React, {useCallback, useState} from "react";
import AppImageCrop from "../../component/AppImageCrop";
import AppDropzone from "../../component/AppDropzone";
import AppRemovableImage from "../../component/AppRemovableImage";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: theme.palette.grey["400"],
            width: '100%',
            borderStyle: 'solid',
        },
    }),
);

interface Props {
    commission: Commission
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    content: string
}

export default function ArtistUploadProofCopyDecisionModal({
                                                               open,
                                                               onClose,
                                                               onConfirm,
                                                               title,
                                                               content,
                                                               ...props
                                                           }: Props) {
    const classes = useStyles()

    const [file, setFile] = useState<File | null>(null);
    const [proofCopyFile, setProofCopyFile] = useState<File | null>(null);
    const dispatch = useAppDispatch()

    const filesCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            files.length ? setFile(files[0]) : setFile(null)
        }, []);

    const onClickDeleteImage = useCallback(
        () => {
            setFile(null)
            setProofCopyFile(null)
        }
        , [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContentText>{content}</DialogContentText>
            <DialogContent>
                {file
                    ? <AppRemovableImage
                        onClickDelete={onClickDeleteImage}
                        preCropHeightPercent={50}
                        preCropWidthPercent={50}
                        alt="drop file" key={0}
                        src={file}/>
                    : <AppDropzone onDrop={filesCallback}/>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default" fullWidth>
                    取消
                </Button>
                <Button onClick={onConfirm} color="primary" fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
