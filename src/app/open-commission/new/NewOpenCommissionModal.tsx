import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    makeStyles, TextareaAutosize, TextField,
    Theme
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../hooks";
import React, {ChangeEvent, useCallback, useState} from "react";
import {getArtist, updateArtistDesc} from "../../artist/usecase/artistSlice";
import {Controller, useForm} from "react-hook-form";
import {register} from "../../register/usecase/registerSlice";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        form: {

        },
        textArea: {
            height: '100%',
            minWidth: '99.0%',
            maxWidth: '99.0%',
            fontSize: theme.typography.body1.fontSize,
            font: theme.typography.fontFamily,
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

interface Props {
    intro?: string
    open: boolean
    onClose: () => void
}

export default function NewOpenCommissionModal(props: Props) {
    const classes = useStyles();
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const [editedIntro, setEditedIntro] = useState("")
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();

    const onSubmit = useCallback(
        (data: Inputs) => {
            console.log(JSON.stringify(data))

        }, [])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
            fullScreen
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                新增開放委托
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    在繪師個人專頁上新增
                </DialogContentText>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
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
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" fullWidth>
                    取消
                </Button>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
