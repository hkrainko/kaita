import {Commission, CommissionState} from "../../domain/commission/model/commission";
import {Box, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";
import CommissionDecision, {Decision} from "./CommissionDecision";

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
    decisions?: Decision[]
}

const getDecisions = (commState: CommissionState, type: 'artist' | 'requester'): Decision[] => {
    switch (commState) {
        case CommissionState.PendingArtistApproval:
            if (type === 'artist') {
                return [
                    {
                        optName: '拒絕',
                        title: '拒絕委托',
                        desc: '拒絕後將不能恢復。',
                        path: 'artist-decline',
                        onClick: () => console.log("")
                    },
                    {
                        optName: '接受',
                        title: '接受委托',
                        desc: '委托將馬上開始，需根據限期內完成委托內容。',
                        path: 'artist-accept',
                        onClick: () => console.log("")
                    }
                ]
            } else {
                return [
                    {
                        optName: '取消',
                        title: '取消委托',
                        desc: '取消委托後將不能恢復。',
                        path: 'requester-cancel',
                        onClick: () => console.log("")
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
                        path: 'upload-proof-copy',
                        onClick: () => console.log("")
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
                        path: 'request-revision',
                        onClick: () => console.log("")
                    },
                    {
                        optName: '接受',
                        title: '接受完稿。',
                        desc: '接受完稿後繪師將繪制完成品。',
                        path: 'accept-proof-copy',
                        onClick: () => console.log("")
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
                        path: 'upload-product',
                        onClick: () => console.log("")
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
                        path: 'upload-product',
                        onClick: () => console.log("")
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
                        path: 'accept-product',
                        onClick: () => console.log("")
                    }
                ]
            }
    }
    return []
}

interface Props {
    commission: Commission
}

export default function CommissionActionPanel({commission, ...props}: Props) {
    const classes = useStyles();

    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)

    const action: CommissionAction = {
        title: commUseCase.getCommissionActionDesc(commission.state, "artist") ?? "",
        decisions: getDecisions(commission.state, 'artist')
    }

    return (
        <Box className={classes.root}>
            <Box py={{xs: 1, md: 1}} px={{xs: 2, md: 3}} alignItems="center" display="flex"
                 justifyContent="flex-around">
                <Box marginRight={5}>
                    <Typography>{action.title}</Typography>
                </Box>
                {
                    action.decisions?.map(decision =>
                        <CommissionDecision decision={decision}/>
                    )
                }
            </Box>
        </Box>
    )
}
