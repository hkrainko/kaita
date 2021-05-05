
import {Box, createStyles, IconButton, makeStyles, StandardProps, Theme} from "@material-ui/core";
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
            height: "100%",
            width: "100%",
            objectFit: "cover"
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
        <div className={props.className}>
            <div className={classes.div}>
                {
                    props.editable &&
                    <IconButton aria-label="delete" className={classes.iconButton} onClick={onClickEdit}>
                        <Edit fontSize="default"/>
                    </IconButton>
                }
            </div>
            <img src={`http://192.168.64.12:31398/${props.path}`} alt={""} className={classes.banner}/>
            <EditBannerModal
                open={editing}
                onClose={() => setEditing(false)}
            />
        </div>
    )
}
