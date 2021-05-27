import {Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import {Commission, CommissionDecision} from "../../domain/commission/model/commission";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";
import React from "react";
import {CommissionDecisionOption} from "../../domain/commission/model/commission-decision-option";

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
    decisionOptions: CommissionDecisionOption
    onClick: () => void
}

export default function CommissionDecisionButton({decisionOptions, onClick, ...props}: Props) {
    const classes = useStyles();

    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)

    return (
        <React.Fragment>
            <Button color="inherit" size="medium" onClick={() => {onClick()}}>
                {decisionOptions.title}
            </Button>
        </React.Fragment>
    )


}
