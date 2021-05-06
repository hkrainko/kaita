import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextareaAutosize,
    Theme
} from "@material-ui/core";
import React, {ChangeEvent, useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getArtist, updateArtistDesc} from "../usecase/artistSlice";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        textArea: {
            height: '100%',
            minWidth: '99.0%',
            maxWidth: '99.0%',
            fontSize: theme.typography.body1.fontSize,
            font: theme.typography.fontFamily,
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
    intro?: string
    open: boolean
    onClose: () => void
}

export default function EditIntroModal(props: Props) {
    const classes = useStyles();
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const [editedIntro, setEditedIntro] = useState("")

    const onClickedSubmit = useCallback(() => {
        if (!userId) {
            return
        }
        dispatch(updateArtistDesc({artistId: userId, desc: editedIntro})).then(() => {
            dispatch(getArtist({artistId: userId}))
        })
        props.onClose()
    }, [dispatch, editedIntro, props, userId])

    const textOnChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
        setEditedIntro(e.currentTarget.value)
    }, [])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                編輯自我介紹
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    字體將會顯示在繪師個人專頁上
                </DialogContentText>
                <TextareaAutosize
                    className={classes.textArea}
                    rowsMin={5}
                    rowsMax={10}
                    defaultValue={props.intro}
                    value={editedIntro}
                    onChange={textOnChange}
                />
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
