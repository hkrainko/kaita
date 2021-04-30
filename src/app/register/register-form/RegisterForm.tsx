import {
    Button, Checkbox, Container,
    createStyles,
    FormControlLabel,
    FormLabel, Grid,
    makeStyles, Paper, Radio, RadioGroup, TextField,
    Theme, Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import React, {useCallback, useState} from "react";
import AppDropzone from "../../component/AppDropzone";
import AppImageCrop from "../../component/AppImageCrop";
import {Controller, useForm} from "react-hook-form";
import {useInjection} from "../../../iocReact";
import {TYPES} from "../../../types";
import {RegisterUseCase} from "../../../domain/register/register.usecase";
import {Gender} from "../../../domain/user/gender";


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

type Inputs = {
    userId: string,
    displayName: string,
    email: string,
    birthday: Date,
    gender: Gender,
    // profile: string
}

export default function RegisterForm() {
    const classes = useStyles()
    const history = useHistory();
    const registerUseCase = useInjection<RegisterUseCase>(TYPES.RegisterUseCase)

    const {register, handleSubmit, control, watch, formState: {errors}} = useForm<Inputs>();

    // const [userId, setUserId] = useState('');
    // const [displayName, setDisplayName] = useState('');
    // const [email, setEmail] = useState('');
    // const [birthday, setBirthday] = useState<Date | null>(null);
    // const [gender, setGender] = useState('F');
    const [profile, setProfile] = useState<string | null>(null);

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
            setProfile(base64Img ?? null)
        }, [])

    const onClickDeleteImage = useCallback(
        () => {
            setImagePath(null)
            setProfile(null)
        }
        , [])

    const onSubmitForm = useCallback(
        (event) => {
            console.log(profile)
            event.preventDefault()
        }, [profile])

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Container maxWidth="xs" className={classes.container}>
                    <Typography component="h1" variant="h5">
                        註冊成為本站繪師
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="userId"
                                    control={control}
                                    rules={{required: true, validate: registerUseCase.isUserIdValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            variant="outlined"
                                            fullWidth
                                            label="用戶帳號"
                                            autoFocus
                                            helperText="可供其他用戶查看，只接受(0-9 a-z _ .)。"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="displayName"
                                    control={control}
                                    rules={{required: true, validate: registerUseCase.isDisplayNameValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="displayName"
                                            label="顯示名稱"
                                            autoFocus
                                            helperText="12字元內"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{required: true, validate: registerUseCase.isEmailValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="電郵"
                                            autoComplete="email"
                                            aria-required
                                            helperText="不會公開"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("birthday", {
                                        required: true,
                                        validate: registerUseCase.isBirthdayValid
                                    })}
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
                                <RadioGroup row aria-label="gender" {...register("gender", {
                                    required: true,
                                    validate: registerUseCase.isGenderValid
                                })}>
                                    <FormLabel component="legend" className={classes.genderLabel}>姓別</FormLabel>
                                    <FormControlLabel value="M" control={<Radio/>} label="男" labelPlacement="start"/>
                                    <FormControlLabel value="F" control={<Radio/>} label="女"
                                                      labelPlacement="start"/>
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formLabel}>個人頭像</FormLabel>
                                {imagePath ?
                                    <AppImageCrop src={imagePath as string} onClickDelete={onClickDeleteImage}
                                                  onCroppedImg={onCroppedImg}/> :
                                    <AppDropzone onDrop={filesCallback}/>}
                            </Grid>
                            <Grid container item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="agreeArtistRule" color="primary"/>}
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
