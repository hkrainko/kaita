import {
    Box,
    createStyles,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme, Typography
} from "@material-ui/core";
import {useAppDispatch} from "../hooks";
import {Commission} from "../../domain/commission/model/commission";
import React from "react";
import AuthImage from "../component/AuthImage";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        sampleImg: {
            width: '100%',
        },
    }),
);

interface Props {
    commission: Commission
    open: boolean
    onClose: () => void
}

export default function CommissionDetail({commission, open, onClose, ...props}: Props) {
    const classes = useStyles();

    const dispatch = useAppDispatch()

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                委托資料
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {commission.id}
                </DialogContentText>
                <DialogContentText>
                    <label>開放委托</label>
                    <Typography>{commission.openCommissionId}</Typography>
                </DialogContentText>
                <DialogContentText>
                    <label>繪師</label>
                    <Typography>{commission.artistName}@{commission.artistId}</Typography>
                </DialogContentText>
                <DialogContentText>
                    <label>委托人</label>
                    <Typography>{commission.requesterName}@{commission.requesterId}</Typography>
                </DialogContentText>
                <DialogContentText>
                    <label>範例</label>
                    <Box display="flex" width="100%">
                        {commission.refImagePaths.map((path, index) => (
                            <div className={classes.sampleImg} key={index}>
                                <AuthImage
                                    src={`http://192.168.64.12:31398/${path}`}
                                    alt="範例" className={classes.sampleImg}/>
                            </div>
                        ))}
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
