import {createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import {Currency} from "../../../domain/price/price";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        form: {},
        textArea: {
            height: '100%',
            minWidth: '99.0%',
            maxWidth: '99.0%',
            fontSize: theme.typography.body1.fontSize,
            font: theme.typography.fontFamily,
        },
        regImg: {
            maxWidth: '200px',
            flex: '1 1 100px'
        },
        droppableBox: {
            display: 'flex',
            alignItems: 'flex-end'
        },
    }),
);

type Inputs = {

}

interface Props extends StandardProps<any, any> {
    open: boolean
    onClose: () => void
}

export default function NewCommissionModal({...Props}: Props) {
    const classes = useStyles();

    return (
        <div>
            dd
        </div>
    )
}
