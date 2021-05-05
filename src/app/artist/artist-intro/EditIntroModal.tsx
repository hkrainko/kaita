import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme
} from "@material-ui/core";
import React, {useCallback} from "react";


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
    intro?: string
    open: boolean
    onClose: () => void
}

export default function EditIntroModal(props: Props) {
    const classes = useStyles();

    const onClickedSubmit = useCallback(() => {

        props.onClose()
    }, [])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                編輯自我介紹
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    字體將會顯示在繪師個人專頁上
                </DialogContentText>
                {props.intro}
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
