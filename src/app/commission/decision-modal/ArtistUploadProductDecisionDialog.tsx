import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    makeStyles,
    Theme
} from "@material-ui/core";
import {CommissionDecisionOption} from "../../../domain/commission/model/commission-decision-option";
import React, {useCallback, useState} from "react";
import {useAppDispatch} from "../../hooks";
import AppRemovableImage from "../../component/AppRemovableImage";
import AppDropzone from "../../component/AppDropzone";
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

export default function ArtistUploadProductDecisionDialog({
                                                              commDecisionOpt,
                                                              open,
                                                              onClose,
                                                              onConfirm,
                                                              ...props
                                                          }: Props) {
    const classes = useStyles()

    const [displayImage, setDisplayImage] = useState<File | null>(null)
    const [productFile, setProductFile] = useState<File | null>(null)
    const dispatch = useAppDispatch()

    const displayImageCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            files.length ? setDisplayImage(files[0]) : setDisplayImage(null)
        }, []);

    const onClickDeleteImage = useCallback(
        () => {
            setDisplayImage(null)
        }
        , [])

    const productFileCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            files.length ? setProductFile(files[0]) : setProductFile(null)
        }, []);

    const onClickDeleteProductFile = useCallback(
        () => {
            setProductFile(null)
        }
        , [])

    const onClickConfirmButton = useCallback(() => {
        if (!displayImage || !productFile) {
            return
        }
        const updater: CommissionUpdater = {
            decision: CommissionDecision.ArtistUploadProduct,
            displayImage: displayImage,
            completionFile: productFile
        }
        onConfirm(updater)
    }, [displayImage, onConfirm, productFile])

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
                {displayImage
                    ? <AppRemovableImage
                        onClickDelete={onClickDeleteImage}
                        preCropHeightPercent={50}
                        preCropWidthPercent={50}
                        alt="drop file"
                        key={0}
                        src={displayImage}/>
                    : <AppDropzone onDrop={displayImageCallback}/>
                }
                <DialogContentText>上傳完成品檔案</DialogContentText>
                {productFile
                    ? <AppRemovableImage
                        onClickDelete={onClickDeleteProductFile}
                        preCropHeightPercent={50}
                        preCropWidthPercent={50}
                        alt="drop file"
                        key={1}
                        src={productFile}/>
                    : <AppDropzone onDrop={productFileCallback}/>
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
