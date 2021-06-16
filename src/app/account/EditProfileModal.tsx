import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    StandardProps,
    Theme
} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getArtist, updateArtistBanner} from "../artist/usecase/artistSlice";
import AppImageCrop from "../component/AppImageCrop";
import AppDropzone from "../component/AppDropzone";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        form: {},
        regImg: {
            maxWidth: '200px',
            flex: '1 1 100px'
        },
        droppableBox: {
            display: 'flex',
            alignItems: 'flex-end'
        },
    }),
);

interface Props extends StandardProps<any, any> {
    open: boolean
    onClose: () => void
}

export default function EditProfileModal(props: Props)  {
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
        dispatch(updateArtistBanner({artistId: userId, bannerImage: bannerFile})).then(() => {
            dispatch(getArtist({artistId: userId}))
        })
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
                    取消
                </Button>
                <Button onClick={onClickedSubmit} color="primary">
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
