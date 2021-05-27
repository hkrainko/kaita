import {Commission, CommissionDecision, CommissionState} from "../../domain/commission/model/commission";
import {Box, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";
import {CommissionDecisionOption} from "../../domain/commission/model/commission-decision-option";
import CommissionDecisionButton from "./CommissionDecisionButton";
import {Fragment, useState} from "react";
import AppDialog from "../component/AppDialog";
import {useAppDispatch, useAppSelector} from "../hooks";
import {updateCommission} from "./usecase/commissionSlice";
import {CommissionUpdater} from "../../domain/commission/model/commission-updater";

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

interface CommissionAction {
    title: string
    decisionOptions?: CommissionDecisionOption[]
}

const getDecisions = (commState: CommissionState, type: 'artist' | 'requester'): CommissionDecisionOption[] => {
    switch (commState) {
        case CommissionState.PendingArtistApproval:
            if (type === 'artist') {
                return [
                    {
                        optName: '拒絕',
                        title: '拒絕委托',
                        desc: '拒絕後將不能恢復。',
                        decision: CommissionDecision.ArtistDecline,
                    },
                    {
                        optName: '接受',
                        title: '接受委托',
                        desc: '委托將馬上開始，需根據限期內完成委托內容。',
                        decision: CommissionDecision.ArtistAccept,
                    }
                ]
            } else {
                return [
                    {
                        optName: '取消',
                        title: '取消委托',
                        desc: '取消委托後將不能恢復。',
                        decision: CommissionDecision.RequesterCancel,
                    }
                ]
            }
        case CommissionState.InProgress:
            if (type === 'artist') {
                return [
                    {
                        title: '上傳完稿',
                        desc: '請上傳完稿以供委托人查閱。',
                        optName: '上傳完稿',
                        decision: CommissionDecision.ArtistUploadProofCopy,
                    }
                ]
            } else {
                return []
            }
        case CommissionState.PendingRequesterAcceptance:
            if (type === 'artist') {
                return []
            } else {
                return [
                    {
                        optName: '提出修改',
                        title: '提出修改',
                        desc: '提出修改後繪師將會重新繪制。',
                        decision: CommissionDecision.RequesterRequestRevision,
                    },
                    {
                        optName: '接受',
                        title: '接受完稿。',
                        desc: '接受完稿後繪師將繪制完成品。',
                        decision: CommissionDecision.RequesterAcceptProofCopy,
                    }
                ]
            }
        case CommissionState.PendingUploadProduct:
            if (type === 'artist') {
                return [
                    {
                        optName: '提交完成品',
                        title: '提交完成品並完成委托',
                        desc: '根據委托人要求上傳完成品。',
                        decision: CommissionDecision.ArtistUploadProduct,
                    }
                ]
            }
            break
        case CommissionState.PendingUploadProductDueToRevisionExceed:
            if (type === 'artist') {
                return [
                    {
                        optName: '提交完成品',
                        title: '提交完成品並完成委托',
                        desc: '根據委托人要求上傳完成品。',
                        decision: CommissionDecision.ArtistUploadProduct,
                    }
                ]
            }
            break
        case CommissionState.PendingRequesterAcceptProduct:
            if (type === 'artist') {
                return []
            } else {
                return [
                    {
                        optName: '接受',
                        title: '接受完成品',
                        desc: '接受後將完成委托程序。',
                        decision: CommissionDecision.RequesterAcceptProduct,
                    }
                ]
            }
    }
    return []
}

const getDecisionDialog = (option: CommissionDecisionOption, onClose: () => void, onConfirm: () => void): JSX.Element => {
    switch (option.decision) {
        case CommissionDecision.ArtistAccept:
        case CommissionDecision.ArtistDecline:
        case CommissionDecision.RequesterCancel:
        case CommissionDecision.RequesterAcceptProofCopy:
        case CommissionDecision.RequesterRequestRevision:
            return <AppDialog open={true} onClose={onClose} onConfirm={onConfirm} title={option.title}
                              content={option.desc}/>

        case CommissionDecision.ArtistUploadProofCopy:
            return <></>
        case CommissionDecision.ArtistUploadProduct:
            return <></>
        case CommissionDecision.RequesterAcceptProduct:
            return <></>
    }
    return <></>
}

interface Props {
    commission: Commission
}

export default function CommissionActionPanel({commission, ...props}: Props) {
    const classes = useStyles()

    const dispatch = useAppDispatch()
    const [showDecisionOption, setShowDecisionOption] = useState<CommissionDecisionOption | null>(null)
    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
    const userId = useAppSelector<string | undefined>(state => state.auth.authUser?.userId)

    let commUserType: 'artist' | 'requester'
    if (userId === commission.artistId) {
        commUserType = 'artist'
    } else if (userId === commission.requesterId) {
        commUserType = 'requester'
    } else {
        return <></>
    }

    const action: CommissionAction = {
        title: commUseCase.getCommissionActionDesc(commission.state, commUserType) ?? "",
        decisionOptions: getDecisions(commission.state, commUserType)
    }

    return (
        <Fragment>
            <Box className={classes.root}>
                <Box py={{xs: 1, md: 1}} px={{xs: 2, md: 3}} alignItems="center" display="flex"
                     justifyContent="flex-around">
                    <Box marginRight={5}>
                        <Typography>{action.title}</Typography>
                    </Box>
                    {
                        action.decisionOptions?.map(option =>
                            <CommissionDecisionButton
                                decisionOptions={option}
                                onClick={() => {
                                    console.log(`${JSON.stringify(option)}`)
                                    setShowDecisionOption(option)
                                }}
                            />
                        )
                    }
                </Box>
            </Box>
            {
                showDecisionOption &&
                getDecisionDialog(showDecisionOption,
                    () => {
                        setShowDecisionOption(null)
                    },
                    () => {
                        const updater: CommissionUpdater = {
                            decision: showDecisionOption.decision
                        }
                        dispatch(updateCommission({commId: commission.id, updater}))
                        console.log("showDecisionOption onConfirm")
                        setShowDecisionOption(null)
                    }
                )
            }
        </Fragment>
    )
}
