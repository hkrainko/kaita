import {
    Box,
    createStyles,
    FormControl,
    FormGroup,
    FormHelperText, Grid, Input,
    InputLabel,
    makeStyles, TextField,
    Theme
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export default function RegisterForm() {
    const classes = useStyles()
    const history = useHistory();

    return (
        <Box mt={4} className={classes.root}>
            <Grid container spacing={3} justify={"center"}>
                <Grid item xs={10} md={8}>
                    <h1>Register As </h1>
                </Grid>
                <Grid item xs={10} md={8}>
                    <FormGroup>
                        <FormControl>
                            <TextField
                                id="my-input"
                                aria-describedby="my-helper-text"
                                label="客戶名稱"
                                InputLabelProps={{shrink: true}}
                                variant="outlined"/>
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="my-input"
                                aria-describedby="my-helper-text"
                                label="電郵地址"
                                InputLabelProps={{shrink: true}}
                                variant="outlined"/>
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                    </FormGroup>
                </Grid>
            </Grid>
        </Box>
    );
}
