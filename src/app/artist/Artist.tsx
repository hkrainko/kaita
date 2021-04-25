import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


function Artist() {

    let {id} = useParams<{ id: string }>()

    return (
        <div>
            Artist {id}
        </div>
    )
}


export default Artist
