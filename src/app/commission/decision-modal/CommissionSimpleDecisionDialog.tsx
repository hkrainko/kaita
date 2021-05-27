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
import {CommissionDecisionOption} from "../../../domain/commission/model/commission-decision-option";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
    }),
);

interface Props {
    decisionOption: CommissionDecisionOption
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function CommissionSimpleDecisionDialog({decisionOption, open, onClose, onConfirm, ...props}: Props) {


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{decisionOption.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {decisionOption.desc}
                </DialogContentText>
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
