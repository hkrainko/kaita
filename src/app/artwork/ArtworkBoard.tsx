import {Box, createStyles, IconButton, makeStyles, Paper, StandardProps, Theme, Typography} from "@material-ui/core";
import {Artwork} from "../../domain/artwork/artwork";
import moment from "moment";
import React, {useCallback} from "react";
import {useAppSelector} from "../hooks";
import {Edit} from "@material-ui/icons";
import EditArtworkBoardModal from "./EditArtworkBoardModal";
import UserCard from "../component/UserCard";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";

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
                    <Box>
                        {
                            artwork?.title
                                ? <Typography variant="h6" color={"textPrimary"}>{artwork.title}</Typography>
                                : <Typography variant="h6" color={"textPrimary"}>(無標題)</Typography>
                        }
                    </Box>
                    <Box mt={2}>
                        {
                            artwork?.textContent
                                ? <Typography variant="body2" color={"textSecondary"}>{artwork.textContent}</Typography>
                                : <Typography variant="body2" color={"textSecondary"}>(暫無內容)</Typography>
                        }
                    </Box>
                    <Box mt={2}>
                        <Typography variant="body2" color={"textSecondary"}>
                            {
                                artwork?.lastUpdateTime
                                    ? moment(artwork.lastUpdateTime).calendar()
                                    : "-"
                            }
                        </Typography>
                    </Box>
                    <Box mt={4}>
                        <UserCard
                            width={30}
                            name={artwork.artistName}
                            id={artwork.artistId}
                            path={artwork.artistProfilePath && imgBySize(ImageSize.Small, artwork.artistProfilePath)}
                        />
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
