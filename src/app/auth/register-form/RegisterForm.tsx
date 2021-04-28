import {
    Box, Button, Checkbox, Container,
    createStyles,
    FormControl, FormControlLabel,
    FormGroup,
    FormHelperText, FormLabel, Grid, Input,
    InputLabel,
    makeStyles, Paper, Radio, RadioGroup, TextField,
    Theme, Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import React, {useCallback} from "react";
import Dropzone from "react-dropzone";
import AppDropzone from "../../component/AppDropzone";
import AppImageCrop from "../../component/AppImageCrop";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        container: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
        },
        formLabel: {
            alignSelf: 'center',
        },
        // avatar: {
        //     margin: theme.spacing(1),
        //     backgroundColor: theme.palette.secondary.main,
        // },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);

export default function RegisterForm() {
    const classes = useStyles()
    const history = useHistory();

    const [gender, setGender] = React.useState('female');
    const [imagePath, setImagePath] = React.useState<string | null>(null);

    const filesCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            if (files.length <= 0) {
                setImagePath(null)
                return
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImagePath(reader.result as string)
            };
            reader.readAsDataURL(files[0]);
        }, []);

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Container maxWidth="xs" className={classes.container}>
                    <Typography component="h1" variant="h5">
                        Register as Artist
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="userId"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userId"
                                    label="用戶帳號"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="displayName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="displayName"
                                    label="顯示名稱"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="電郵"
                                    name="email"
                                    autoComplete="email"
                                    aria-required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="date"
                                    label="出生日期"
                                    type="date"
                                    // defaultValue="2017-05-24"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup row aria-label="gender" name="gender1" value={gender}
                                            onChange={(e) => setGender(e.target.value)}>
                                    <FormLabel component="legend" className={classes.formLabel}>Gender</FormLabel>
                                    <FormControlLabel value="male" control={<Radio/>} label="男" labelPlacement="start"/>
                                    <FormControlLabel value="female" control={<Radio/>} label="女"
                                                      labelPlacement="start"/>
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    imagePath ? <AppImageCrop src={imagePath}/> : null
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <AppDropzone onDrop={filesCallback}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Paper>
        </Container>
    );
}
