import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme
} from "@material-ui/core";
import {useAppDispatch} from "../../hooks";
import React, {useCallback, useState} from "react";
import AppDropzone from "../../component/AppDropzone";
import AppRemovableImage from "../../component/AppRemovableImage";
import {CommissionDecisionOption} from "../../../domain/commission/model/commission-decision-option";
import {CommissionUpdater} from "../../../domain/commission/model/commission-updater";
import {CommissionDecision} from "../../../domain/commission/model/commission";


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
    commDecisionOpt: CommissionDecisionOption
    open: boolean
    onClose: () => void
    onConfirm: (updater: CommissionUpdater) => void
}

export default function ArtistUploadProofCopyDecisionDialog({
                                                                commDecisionOpt,
                                                                open,
                                                                onClose,
                                                                onConfirm,
                                                                ...props
                                                            }: Props) {
    const classes = useStyles()

    const [file, setFile] = useState<File | null>(null);
    const dispatch = useAppDispatch()

    const filesCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            files.length ? setFile(files[0]) : setFile(null)
        }, []);

    const onClickDeleteImage = useCallback(
        () => {
            setFile(null)
        }
        , [])

    const onClickConfirmButton = useCallback(() => {
        if (!file) {
            return
        }
        const updater: CommissionUpdater = {
            decision: CommissionDecision.ArtistUploadProofCopy,
            proofCopyImage: file
        }
        onConfirm(updater)
    }, [file, onConfirm])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">{commDecisionOpt.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{commDecisionOpt.desc}</DialogContentText>
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
                <Button onClick={onClickConfirmButton} color="primary" fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
