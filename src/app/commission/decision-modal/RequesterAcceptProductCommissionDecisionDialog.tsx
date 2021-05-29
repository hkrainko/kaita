import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Slider, TextField,
    Theme
} from "@material-ui/core";
import {CommissionDecisionOption} from "../../../domain/commission/model/commission-decision-option";
import React, {useCallback, useState} from "react";
import {useAppDispatch} from "../../hooks";
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

export default function RequesterAcceptProductCommissionDecisionDialog({
                                                                commDecisionOpt,
                                                                open,
                                                                onClose,
                                                                onConfirm,
                                                                ...props
                                                            }: Props) {
    const classes = useStyles()

    const [rating, setRating] = useState<number>(3)
    const [comment, setComment] = useState<string>("")
    const [showCommentError, setShowCommentError] = useState<boolean>(false)

    const onChangeComment = useCallback((event) => {
        setShowCommentError(event.target.value.length > 50)
        setComment(event.target.value)
    }, [])

    const onClickConfirmButton = useCallback(() => {
        if (!rating) {
            return
        }
        const updater: CommissionUpdater = {
            decision: CommissionDecision.RequesterAcceptProduct,
            rating: rating,
            comment
        }
        onConfirm(updater)
    }, [comment, onConfirm, rating])

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
                <Slider
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks
                    min={0}
                    max={5}
                    value={rating}
                    onChange={(event, value) => {
                        if (typeof value != "number") {
                            return
                        }
                        setRating(value)
                    }}
                />

                <DialogContentText>{commDecisionOpt.desc}</DialogContentText>
                <TextField
                    value={comment}
                    onChange={onChangeComment}
                    error={showCommentError}
                    variant="outlined"
                    fullWidth
                    label="評語(可留空)"
                    size="small"
                    multiline
                    rows={4}
                    rowsMax={8}
                    helperText="（50字以內）"
                />
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
