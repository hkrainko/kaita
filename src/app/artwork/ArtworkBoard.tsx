import {Box, createStyles, IconButton, makeStyles, Paper, StandardProps, Theme, Typography} from "@material-ui/core";
import {Artwork} from "../../domain/artwork/artwork";
import moment from "moment";
import EditBannerModal from "../artist/banner/EditBannerModal";
import React, {useCallback} from "react";
import {useAppSelector} from "../hooks";
import {Edit} from "@material-ui/icons";
import EditArtworkBoardModal from "./EditArtworkBoardModal";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        edit: {
            position: 'relative'
        },
        iconButton: {
            margin: theme.spacing(1),
            position: 'absolute',
            top: "0",
            right: "0",
            padding: theme.spacing(0),
        },
    })
);

interface Props extends StandardProps<any, any> {
    artwork: Artwork
}

export default function ArtworkBoard({artwork, ...props}: Props) {
    const classes = useStyles()

    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const [editing, setEditing] = React.useState(false);

    const onClickEdit = useCallback(() => {
        setEditing(true)
    }, [])

    return (
        <React.Fragment>
            <Paper variant="elevation">
                <div className={classes.edit}>
                    {
                        userId === artwork?.artistId &&
                        <IconButton aria-label="delete" className={classes.iconButton} onClick={onClickEdit}>
                            <Edit fontSize="default"/>
                        </IconButton>
                    }
                </div>
                <Box textAlign="start" padding={2}>
                    <Box>{artwork?.artistName}@{artwork?.artistId}</Box>
                    <Box>{
                        artwork?.title
                            ? <Typography variant="h5">{artwork.title}</Typography>
                            : <Typography variant="h5">(無標題)</Typography>
                    }</Box>
                    <Box>{
                        artwork?.textContent
                            ? <Typography variant="body1">{artwork.textContent}</Typography>
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
            <EditArtworkBoardModal
                artwork={artwork}
                open={editing}
                onClose={() => setEditing(false)}
            />
        </React.Fragment>
    )

}
