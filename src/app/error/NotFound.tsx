import {Container, createStyles, makeStyles, Theme} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(4)
        }
    }),
);

export default function NotFound() {
    const classes = useStyles()
    const history = useHistory();


    return (
        <Container className={classes.root}>
            <div>找不到</div>
            <Link to="/users">返回首頁</Link>
        </Container>
    )
}
