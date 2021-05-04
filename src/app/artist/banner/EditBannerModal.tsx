import {
    Button,
    createStyles,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    makeStyles,
    Theme
} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import AppImageCrop from "../../component/AppImageCrop";
import AppDropzone from "../../component/AppDropzone";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {updateArtistBanner} from "../usecase/artistSlice";

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

interface Props {
    open: boolean
    onClose: () => void
}

export default function EditBannerModal(props: Props)  {
    const classes = useStyles();
    const [file, setFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const dispatch = useAppDispatch()
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

    const onClickedSubmit = useCallback(() => {
        if (!bannerFile || !userId) {
            props.onClose()
            return
        }
        dispatch(updateArtistBanner({artistId: userId, bannerImage: bannerFile}))
        props.onClose()
    }, [bannerFile, dispatch, props, userId])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
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
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClickedSubmit} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}
