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
import {AuthUserUpdater} from "../../domain/auth-user/model/auth-user-updater";
import {updateAuthUser} from "../auth-user/usecase/authUserSlice";
import {unwrapResult} from "@reduxjs/toolkit";

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
    }),
);

interface Props extends StandardProps<any, any> {
    open: boolean
    onClose: (success: boolean) => void
}

export default function EditProfileModal({open, onClose, ...props}: Props)  {
    const classes = useStyles();
    const [file, setFile] = useState<File | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);
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
            setProfileFile(file)
        }, [])

    const onClickDeleteImage = useCallback(
        () => {
            setFile(null)
            setProfileFile(null)
        }
        , [])

    const onClickedSubmit = useCallback(() => {
        if (!profileFile || !userId) {
            onClose(false)
            return
        }
        const updater: AuthUserUpdater = {
            userId,
            profileFile,
        }

        dispatch(updateAuthUser({updater}))
            .then(unwrapResult)
            .then(originalPromiseResult => {
                console.log(`originalPromiseResult:${JSON.stringify(originalPromiseResult)}`)
                onClose(true)
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(`rejectedValueOrSerializedError:${JSON.stringify(rejectedValueOrSerializedError)}`)
                onClose(false)
            })
    }, [profileFile, dispatch, onClose, userId])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                編輯頭像
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
                        circularCrop
                        aspect={1}
                    />
                    : <AppDropzone
                        onDrop={filesCallback}
                        classes={{height: '200px'}}
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="primary">
                    取消
                </Button>
                <Button onClick={onClickedSubmit} color="primary">
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
