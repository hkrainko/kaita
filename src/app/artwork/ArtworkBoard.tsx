import {Box, createStyles, makeStyles, Paper, StandardProps, Theme, Typography} from "@material-ui/core";
import {Artwork} from "../../domain/artwork/artwork";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    })
);

interface Props extends StandardProps<any, any> {
    artwork: Artwork | null
}

export default function ArtworkBoard({artwork, ...props}: Props) {
    const classes = useStyles()

    return (
        <Paper variant="elevation">
            <Box textAlign="start" padding={2}>
                <Box>{artwork?.artistName}@{artwork?.artistId}</Box>
                <Box>{
                    artwork?.title
                        ? <Typography variant="h5">artwork.title</Typography>
                        : <Typography variant="h5">(無標題)</Typography>
                }</Box>
                <Box>{
                    artwork?.textContent
                        ? <Typography variant="body1">artwork.textContent</Typography>
                        : <Typography variant="body1">(暫無內容)</Typography>
                }</Box>
                <Box>
                    <Typography variant="body2">{
                        artwork?.lastUpdateTime
                            ? moment(artwork.lastUpdateTime).format("YYYY-MM-DD HH:mm:ss")
                            : "-"
                    }</Typography>
                </Box>
            </Box>
        </Paper>
    )

}
