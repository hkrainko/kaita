import {
    Button,
    Checkbox,
    Container,
    createStyles,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    makeStyles,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {Link, useHistory, useLocation} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import AppDropzone from "../../component/AppDropzone";
import AppImageCrop from "../../component/AppImageCrop";
import {Controller, useForm} from "react-hook-form";
import {useInjection} from "../../../iocReact";
import {TYPES} from "../../../types";
import {RegisterUseCase} from "../../../domain/register/register.usecase";
import {Gender} from "../../../domain/user/gender";
import {register} from "../usecase/registerSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import moment from "moment";
import {UserState} from "../../../domain/user/user";


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

    const registerUseCase = useInjection<RegisterUseCase>(TYPES.RegisterUseCase)
    const location = useLocation()
    const history = useHistory();
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    const [profile, setProfile] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const query = new URLSearchParams(location.search)
    const regType = query.get('type')

    useEffect(() => {
        if (regType !== 'normal-account' && regType !== 'artist') {
            history.push('')
            return
        }
    })
    useEffect(() => {
        switch (auth.authUser?.state) {
            case UserState.Active:
                history.push('')
                break
            case UserState.Terminated:
                history.push('')
                break
            default:
                break
        }
    }, [auth, history])


    const filesCallback = useCallback(
        (files: File[]) => {
            console.log(files)
            files.length ? setFile(files[0]) : setFile(null)
        }, []);

    const onCroppedImg = useCallback(
        (file: File | null) => {
            // console.log(`base64Img:${base64Img?.length}`)
            console.log(`file:${file?.name}`)
            setProfile(file)
        }, [])

    const onClickDeleteImage = useCallback(
        () => {
            setFile(null)
            setProfile(null)
        }
        , [])

    const onSubmit = useCallback(
        (data: Inputs) => {
            if (!auth.authUser) {
                return
            }
            console.log(JSON.stringify(data))
            dispatch(register({
                authId: auth.authUser.authId,
                birthday: moment(data.birthday).format("YYYY-MM-DD"),
                displayName: data.displayName,
                email: data.email,
                gender: data.gender,
                profile: profile ?? undefined,
                regAsArtist: regType === 'artist',
                userId: data.userId
            }))
        }, [auth, dispatch, profile, regType])

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Container maxWidth="xs" className={classes.container}>
                    <Typography component="h1" variant="h5">
                        ????????????????????????
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
                                            label="????????????"
                                            autoFocus
                                            helperText="4-12 ??????????????????(0-9 a-z _ .)???????????????????????????"
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
                                            label="????????????"
                                            autoFocus
                                            helperText="12?????????"
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
                                            label="??????"
                                            autoComplete="email"
                                            aria-required
                                            helperText="????????????"
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
                                            label="????????????"
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
                                            <FormLabel component="legend"
                                                       className={classes.genderLabel}>??????*</FormLabel>
                                            <FormControlLabel value="M" control={<Radio color="primary"/>} label="???"
                                                              labelPlacement="start"/>
                                            <FormControlLabel value="F" control={<Radio color="primary"/>} label="???"
                                                              labelPlacement="start"/>
                                        </RadioGroup>
                                    }
                                />
                                {errors.gender &&
                                <FormHelperText error className={classes.helperText}>???????????????</FormHelperText>}
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formLabel}>????????????</FormLabel>
                                {file
                                    ? <AppImageCrop
                                        file={file}
                                        onClickDelete={onClickDeleteImage}
                                        onCroppedImg={onCroppedImg}
                                        preCropWidthPercent={50}
                                        circularCrop={true}
                                        aspect={1}/>
                                    : <AppDropzone onDrop={filesCallback}/>
                                }
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
                                            label="??????????????????????????????"
                                        />
                                    }
                                />
                                {errors.agreeArtistRule &&
                                <FormHelperText error className={classes.helperText}>???????????????????????????</FormHelperText>}
                            </Grid>
                            <Grid container item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowAdsEmail" color="primary"/>}
                                    label="???????????????????????????"
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <Button component={Link} to="/register" variant="contained" fullWidth>
                                    ??????
                                </Button>
                            </Grid>
                            <Grid container item xs={6}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    ??????
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Paper>
        </Container>
    );
}
