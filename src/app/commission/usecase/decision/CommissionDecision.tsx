import {Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import {Commission} from "../../../../domain/commission/model/commission";
import {useInjection} from "../../../../iocReact";
import {CommissionUseCase} from "../../../../domain/commission/commission.usecase";
import {TYPES} from "../../../../types";
import React from "react";

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

export interface Decision {
    title: string
    onClick: () => void
}

interface Props {
    decision: Decision
}

export default function CommissionDecision({decision, ...props}: Props) {
    const classes = useStyles();

    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)

    return (
        <React.Fragment>
            <Button color="inherit" size="medium" onClick={decision.onClick}>
                {decision.title}
            </Button>
        </React.Fragment>
    )


}
