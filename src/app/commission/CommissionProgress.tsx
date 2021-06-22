import {
    Box,
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    Theme, Typography
} from "@material-ui/core";
import {Commission, CommissionState} from "../../domain/commission/model/commission";
import {useAppDispatch} from "../hooks";
import React from "react";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import AuthImage from "../component/AuthImage";
import AuthFile from "../component/AuthFile";
import config from "../config";
import UserCard from "../component/UserCard";

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

const getStepElement = (currentStep: CommissionState, comm: Commission): React.ReactElement => {
    switch (currentStep) {
        case CommissionState.PendingRequesterAcceptance:
            return (
                <div>
                    {
                        comm.proofCopyImagePaths
                            ? comm.proofCopyImagePaths.map(path => {
                                return <Box maxWidth="30%">
                                    <AuthImage src={`${config.IMG_PATH}${path}`}/>
                                </Box>
                            })
                            : <></>
                    }
                </div>
            )
        case CommissionState.PendingUploadProduct:
            return (
                <div>
                    {
                        comm.completionFilePath
                            ? <AuthFile src={`${config.FILE_PATH}${comm.completionFilePath}`}/>
                            : <></>
                    }
                </div>
            )
        case CommissionState.Completed:
            return (
                <div>
                    {
                        comm.state === CommissionState.Completed &&
                            <Box>
                                <Typography>評分:{comm.rating}</Typography>
                                <Typography>評語:{comm.comment}</Typography>
                            </Box>
                    }
                </div>
            )
    }
    return <></>
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
                            secondary={
                                <UserCard
                                    width={100}
                                    name={commission.artistName}
                                    id={commission.artistId}
                                    path={`${config.IMG_PATH}${commission.artistProfilePath}`}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="委托人"
                            secondary={
                                <UserCard
                                    width={100}
                                    name={commission.requesterName}
                                    id={commission.requesterId}
                                    path={`${config.IMG_PATH}${commission.requesterProfilePath}`}
                                />
                            }
                        />
                    </ListItem>

                </List>

                <Stepper activeStep={commissionUseCase.getCommissionSteps().indexOf(commission.state)}
                         orientation="vertical">
                    {
                        commissionUseCase.getCommissionSteps().map((step, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{commissionUseCase.getCommissionStepText(step)}</StepLabel>
                                    {
                                        getStepElement(step, commission)
                                    }
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
