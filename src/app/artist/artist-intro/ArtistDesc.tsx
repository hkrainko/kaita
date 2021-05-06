import {createStyles, IconButton, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import React, {useCallback} from "react";
import {Edit} from "@material-ui/icons";
import EditIntroModal from "./EditIntroModal";

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
        desc: {
            textAlign: 'left'
        }
    }),
);

interface Props extends StandardProps<any, any> {
    desc?: string
    editable: boolean
}

export default function ArtistDesc(props: Props)  {
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
            <Typography variant={"body1"} className={classes.desc}>
                {props.desc}
            </Typography>
            <EditIntroModal
                open={editing}
                onClose={() => setEditing(false)}
            />
        </div>
    )
}
