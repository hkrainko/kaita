import {Commission, CommissionState} from "../../domain/commission/model/commission";
import {Box, Button, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";
import CommissionDecision, {Decision} from "./usecase/decision/CommissionDecision";

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
    negativeDecision?: Decision
    positiveDecision?: Decision
}

const getAction = (commState: CommissionState, type: 'artist' | 'requester'): CommissionAction  => {
    return {
        title: '等待接受委托。',
        negativeDecision: {
            title: '取消',
            onClick: () => {
                console.log("negativeDecisions")
            },
        },
        positiveDecision: {
            title: '確定',
            onClick: () => {
                console.log("positiveDecision")
            }
        }
    }
}

interface Props {
    commission: Commission
}

export default function CommissionActionPanel({commission, ...props}: Props) {
    const classes = useStyles();

    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)

    const action = getAction(commission.state, 'artist')

    return (
        <Box className={classes.root}>
            <Box py={{xs: 1, md: 1}} px={{xs: 2, md: 3}} alignItems="center" display="flex" justifyContent="flex-around">
                <Box marginRight={5}>
                    <Typography>{action.title}</Typography>
                </Box>
                {
                    action.negativeDecision &&
                        <CommissionDecision decision={action.negativeDecision}/>
                }
                {
                    action.positiveDecision &&
                    <CommissionDecision decision={action.positiveDecision}/>
                }
            </Box>
        </Box>
    )
}
