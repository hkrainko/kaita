
import {Box, createStyles, IconButton, makeStyles, Modal, StandardProps, Theme} from "@material-ui/core";
import React, {useCallback} from "react";
import {Edit} from "@material-ui/icons";
import EditBannerModal from "./EditBannerModal";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        div: {
            position: 'relative'
        },
        iconButton: {
            margin: theme.spacing(1),
            position: 'absolute',
            top: "0",
            right: "0",
            padding: theme.spacing(0),
        },
        banner: {
            high: 133
        }
    }),
);

interface Props extends StandardProps<any, any> {
    path?: string
    editable: boolean
}

export default function ArtistBanner(props: Props)  {
    const classes = useStyles();
    const [editing, setEditing] = React.useState(false);

    const onClickEdit = useCallback(() => {
        setEditing(true)
    }, [])

    return (
        <Box className={props.className}>
            <div className={classes.div}>
                {
                    props.editable &&
                    <IconButton aria-label="delete" className={classes.iconButton} onClick={onClickEdit}>
                        <Edit fontSize="default"/>
                    </IconButton>
                }
            </div>
            <EditBannerModal
                open={editing}
                onClose={() => setEditing(false)}
            />
        </Box>
    )
}
