import {Commission} from "../../domain/commission/model/commission";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

interface Props {
    commission: Commission
}

export default function CommissionActionPanel(props: Props) {
    const classes = useStyles();


    return (
        <div>123</div>
    )
}
