import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import ArtistBanner from "./ArtistBanner";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        banner: {
            height: 160,
            backgroundColor: 'blue',
        }
    }),
);


function Artist() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const auth = useAppSelector((state) => state.auth)

    let {id} = useParams<{ id: string }>()

    return (
        <div>
            <ArtistBanner className={classes.banner}/>
            Artist {id}
        </div>
    )
}


export default Artist
