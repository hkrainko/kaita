import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    makeStyles,
    StandardProps,
    TextField,
    Theme
} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import React, {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {AuthUserUpdater} from "../../domain/auth-user/model/auth-user-updater";
import {updateAuthUser} from "../auth-user/usecase/authUserSlice";
import NotFound from "../error/NotFound";
import {useInjection} from "../../iocReact";
import {RegisterUseCase} from "../../domain/register/register.usecase";
import {TYPES} from "../../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        form: {},
    }),
);

type Inputs = {
    userName: string,
}

interface Props extends StandardProps<any, any> {
    currentUserName: string
}

export default function EditUserNameModal({currentUserName, ...props}: Props) {
    const classes = useStyles();

    const registerUseCase = useInjection<RegisterUseCase>(TYPES.RegisterUseCase)
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const dispatch = useAppDispatch()
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>({
        defaultValues: {
            userName: "",
        }
    });

    const onSubmit = useCallback(
        (data: Inputs) => {
            console.log(JSON.stringify(data))
            if (!userId) {
                return
            }

            const updater: AuthUserUpdater = {
                userId: userId,
                userName: data.userName
            }

            dispatch(updateAuthUser({updater}))

        }, [dispatch, userId])

    if (!userId) {
        return <NotFound/>
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                編輯用戶名稱
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'ss'}
                </DialogContentText>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="userName"
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
                                        label="用戶名稱"
                                        size="small"
                                        helperText="4-12 字元。"
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" fullWidth>
                    取消
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
