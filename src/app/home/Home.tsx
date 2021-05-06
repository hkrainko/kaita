import {createStyles, makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


export default function Home() {
    return (
        <div>
            Home
        </div>
    )
}
