import React, {useCallback} from "react";
import {useAppDispatch} from "../hooks";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    TextField,
    Theme
} from "@material-ui/core";
import {getArtwork, updateArtwork} from "./usecase/artworkSlice";
import {Artwork} from "../../domain/artwork/artwork";
import {ArtworkUpdater} from "../../domain/artwork/model/artwork-updater";
import {Controller, useForm} from "react-hook-form";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {ArtworkUseCase} from "../../domain/artwork/artwork.usecase";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        form: {},
    }),
);

type Inputs = {
    title: string,
    textContent: string,
}

interface Props {
    artwork: Artwork,
    open: boolean
    onClose: () => void
}

export default function EditArtworkBoardModal({artwork, open, onClose, ...props}: Props)  {
    const classes = useStyles();

    const artworkUseCase = useInjection<ArtworkUseCase>(TYPES.ArtworkUseCase)
    const dispatch = useAppDispatch()


    const {handleSubmit, control, watch, formState: {errors}} = useForm<Inputs>();

    const onSubmit = useCallback((data: Inputs) => {

        const updater: ArtworkUpdater = {
            id: artwork.id,
            title: data.title,
            textContent: data.textContent,
        }

        dispatch(updateArtwork({updater})).then(() => {
            dispatch(getArtwork({artworkId: artwork.id}))
        })
        onClose()
    }, [artwork.id, dispatch, onClose])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                編輯作品介紹
            </DialogTitle>
            <DialogContent>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue={artwork.title ?? ""}
                                rules={{required: true, validate: artworkUseCase.isTitleValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="標題"
                                        size="small"
                                        helperText="20字以內。"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="textContent"
                                control={control}
                                defaultValue={artwork.textContent ?? ""}
                                rules={{required: true, validate: artworkUseCase.isTextContentValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="內容"
                                        size="small"
                                        rows={12}
                                        rowsMax={12}
                                        multiline={true}
                                        helperText="200字以內。"
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </form>

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose} color="default" fullWidth>
                    取消
                </Button>
                <Button type="submit" variant="outlined" onClick={handleSubmit(onSubmit)} color="primary" fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
