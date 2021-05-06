import {Box, Button, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export default function RegisterView() {
    const classes = useStyles()
    const history = useHistory();

    const onClickedRegisterButton = (type: 'normal-user' | 'artist') => {
        history.push(`/register/form?type=${type}`)
    }

    return (
        <Box mt={4} className={classes.root}>
            <Grid container justify="center" spacing={4}>
                <Grid item xs={4}>
                    <Button onClick={() => onClickedRegisterButton('normal-user')}>
                        Register as NormalUser
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => onClickedRegisterButton('artist')}>
                        Register as Artist
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
