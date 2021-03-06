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
    Theme,
    Typography
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
import imgBySize, {ImageSize} from "../utils/imageUrl";

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
                                    <AuthImage src={imgBySize(ImageSize.Middle, path)}/>
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
                                <Typography>??????:{comm.rating}</Typography>
                                <Typography>??????:{comm.comment}</Typography>
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
                ????????????
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="????????????"
                            secondary={commission.id}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="??????"
                            secondary={
                                <UserCard
                                    width={100}
                                    name={commission.artistName}
                                    id={commission.artistId}
                                    path={commission.artistProfilePath && imgBySize(ImageSize.Middle, commission.artistProfilePath)}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="?????????"
                            secondary={
                                <UserCard
                                    width={100}
                                    name={commission.requesterName}
                                    id={commission.requesterId}
                                    path={commission.requesterProfilePath && imgBySize(ImageSize.Middle, commission.requesterProfilePath)}
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
                    ??????
                </Button>
            </DialogActions>
        </Dialog>
    )
}
