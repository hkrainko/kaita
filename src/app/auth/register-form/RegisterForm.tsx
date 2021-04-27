import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export default function RegisterForm() {
    const classes = useStyles()
    const history = useHistory();

    return (
        <Box mt={4} className={classes.root}>
            <h1>RegisterForm</h1>
        </Box>
    )
}
