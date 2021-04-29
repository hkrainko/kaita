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
import React, {useCallback, useState} from "react";
import AppDropzone from "../../component/AppDropzone";
import AppImageCrop from "../../component/AppImageCrop";
import moment from "moment";


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
        genderLabel: {
            alignSelf: 'center',
        },
        formLabel: {
            textAlign: 'left',
            paddingBottom: theme.spacing(1)
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

    const [userId, setUserId] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [gender, setGender] = useState('F');
    const [profile, setProfile] = useState(null);

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

    const onCroppedImg = useCallback(
        (base64Img?: string) => {
            console.log(`base64Img:${base64Img?.length}`)
        }, [])

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Container maxWidth="xs" className={classes.container}>
                    <Typography component="h1" variant="h5">
                        註冊成為本站繪師
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="userId"
                                    value={userId}
                                    onChange={(e) => {setUserId(e.target.value)}}
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
                                    value={displayName}
                                    onChange={(e) => {setDisplayName(e.target.value)}}
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
                                    name="email"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="電郵"
                                    autoComplete="email"
                                    aria-required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="birthday"
                                    value={moment(birthday).format('YYYY-MM-DD')}
                                    onChange={(e) => {setBirthday(new Date(e.target.value))}}
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
                                    <FormLabel component="legend" className={classes.genderLabel} >姓別</FormLabel>
                                    <FormControlLabel value="M" control={<Radio/>} label="男" labelPlacement="start"/>
                                    <FormControlLabel value="F" control={<Radio/>} label="女"
                                                      labelPlacement="start"/>
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formLabel}>個人頭像</FormLabel>
                                {imagePath ?
                                    <AppImageCrop src={imagePath as string} onClickDelete={() => {setImagePath(null)}} onCroppedImg={onCroppedImg} /> :
                                    <AppDropzone onDrop={filesCallback}/>}
                            </Grid>
                            <Grid container item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="同意遵守站內繪師守則"
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="我願意接收推廣訊息"
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <Button variant="contained" fullWidth>
                                    取消
                                </Button>
                            </Grid>
                            <Grid container item xs={6}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    確定
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Paper>
        </Container>
    );
}
