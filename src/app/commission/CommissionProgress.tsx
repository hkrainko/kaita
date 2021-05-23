import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    makeStyles, Step, StepContent, StepLabel, Stepper,
    Theme, Typography
} from "@material-ui/core";
import {Commission, CommissionState} from "../../domain/commission/model/commission";
import {useAppDispatch} from "../hooks";
import React from "react";
import {PendingValidationArtistCommissionAction} from "./usecase/model/commission-action/pending-validation-commission-action";
import {useInjection} from "../../iocReact";
import {RegisterUseCase} from "../../domain/register/register.usecase";
import {TYPES} from "../../types";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        sampleImg: {
            maxWidth: '33%'
        },
    }),
);

const getStep = (commState: CommissionState, userType: 'artist' | 'requester'): string => {
    switch (userType) {
        case 'artist':
            break
        case 'requester':
            break
    }
    return ''
}

interface Props {
    commission: Commission
    open: boolean
    onClose: () => void
}

export default function CommissionProgress({commission, open, onClose, ...props}: Props) {
    const classes = useStyles();

    const commissionUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
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
                委托進度
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="委托編號"
                            secondary={commission.id}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="繪師"
                            secondary={`${commission.artistName}@${commission.artistId}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="委托人"
                            secondary={`${commission.requesterName}@${commission.requesterId}`}
                        />
                    </ListItem>

                </List>

                <Stepper activeStep={commissionUseCase.getCommissionSteps().indexOf(commission.state)} orientation="vertical">
                    {
                        commissionUseCase.getCommissionSteps().map((step, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{commissionUseCase.getCommissionStepText(step)}</StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>


            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="default" onClick={onClose} fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
