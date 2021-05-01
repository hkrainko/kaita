import {
    Button, Checkbox, Container,
    createStyles,
    FormControlLabel,
    FormHelperText,
    FormLabel, Grid,
    makeStyles, Paper, Radio, RadioGroup, RadioProps, TextField,
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
import {register} from "../usecase/registerSlice";
import {useAppSelector} from "../../hooks";


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
        helperText: {
            marginTop: theme.spacing(0),
            marginLeft: theme.spacing(0),
            alignSelf: 'center'
        },
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
    profile: string
    agreeArtistRule: boolean,
    allowAdsEmail: boolean,

}

export default function RegisterForm() {
    const classes = useStyles()
    const history = useHistory();
    const registerUseCase = useInjection<RegisterUseCase>(TYPES.RegisterUseCase)

    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    const [profile, setProfile] = useState<string | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const authUser = useAppSelector(state => state.auth.authUser)
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

    const onSubmit = useCallback(
        (data: Inputs) => {
            if (!authUser) {
                return
            }
            console.log(JSON.stringify(data))
            register({
                authId: authUser.authId,
                birthday: data.birthday,
                displayName: data.displayName,
                email: data.email,
                gender: data.gender,
                profile: data.profile,
                regAsArtist: false,
                userId: data.userId
            })
        }, [profile])

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Container maxWidth="xs" className={classes.container}>
                    <Typography component="h1" variant="h5">
                        註冊成為本站繪師
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="userId"
                                    control={control}
                                    defaultValue={""}
                                    rules={{required: true, validate: registerUseCase.isUserIdValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="用戶帳號"
                                            autoFocus
                                            helperText="4-12 字元，只接受(0-9 a-z _ .)，註冊後不能更改。"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="displayName"
                                    control={control}
                                    defaultValue={""}
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
                                    defaultValue={""}
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
                                <Controller
                                    name="birthday"
                                    control={control}
                                    defaultValue={""}
                                    rules={{required: true, validate: registerUseCase.isBirthdayValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="date"
                                            label="出生日期"
                                            type="date"
                                            // defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue={""}
                                    rules={{required: true, validate: registerUseCase.isBirthdayValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <RadioGroup
                                            row aria-label="gender"
                                            value={value}
                                            onChange={onChange}
                                        >
                                            <FormLabel component="legend" className={classes.genderLabel}>姓別*</FormLabel>
                                            <FormControlLabel value="M" control={<Radio color="primary"/>} label="男" labelPlacement="start"/>
                                            <FormControlLabel value="F" control={<Radio color="primary"/>} label="女"
                                                              labelPlacement="start"/>
                                        </RadioGroup>
                                    }
                                />
                                {errors.gender && <FormHelperText error className={classes.helperText}>請輸入姓別</FormHelperText>}
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formLabel}>個人頭像</FormLabel>
                                {imagePath ?
                                    <AppImageCrop src={imagePath as string} onClickDelete={onClickDeleteImage}
                                                  onCroppedImg={onCroppedImg}/> :
                                    <AppDropzone onDrop={filesCallback}/>}
                            </Grid>
                            <Grid container item xs={12}>
                                <Controller
                                    name="agreeArtistRule"
                                    control={control}
                                    rules={{required: true, validate: (value) => value}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <FormControlLabel
                                            value={value}
                                            onChange={onChange}
                                            control={<Checkbox value="agreeArtistRule" color="primary"/>}
                                            label="同意遵守站內繪師守則"
                                        />
                                    }
                                />
                                {errors.agreeArtistRule && <FormHelperText error className={classes.helperText}>你必需同意繪師守則</FormHelperText>}
                            </Grid>
                            <Grid container item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowAdsEmail" color="primary"/>}
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
