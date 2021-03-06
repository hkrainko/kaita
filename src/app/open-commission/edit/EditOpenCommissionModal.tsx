import {
    Box,
    Button,
    Checkbox,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    StandardProps,
    TextField,
    Theme
} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import {useInjection} from "../../../iocReact";
import {OpenCommissionUseCase} from "../../../domain/open-commission/open-commission.usecase";
import {TYPES} from "../../../types";
import {useAppDispatch} from "../../hooks";
import {Controller, useForm} from "react-hook-form";
import {Currency} from "../../../domain/price/price";
import {updateOpenCommission} from "../usecase/openCommissionSlice";
import getUploadImages from "../../utils/getUploadImages";
import AppRemovableImage from "../../component/AppRemovableImage";
import AppDropzone from "../../component/AppDropzone";
import {OpenCommission} from "../../../domain/open-commission/model/open-commission";
import AppRemoteImage from "../../component/AppRemoteImage";
import {OpenCommissionUpdater} from "../../../domain/open-commission/model/open-commission-updater";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import config from "../../config";
import imgBySize, {ImageSize} from "../../utils/imageUrl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        form: {},
        textArea: {
            height: '100%',
            minWidth: '99.0%',
            maxWidth: '99.0%',
            fontSize: theme.typography.body1.fontSize,
            font: theme.typography.fontFamily,
        },
        regImg: {
            maxWidth: '200px',
            flex: '1 1 100px'
        },
        droppableBox: {
            display: 'flex',
            alignItems: 'flex-end'
        },
    }),
);

type Inputs = {
    title: string,
    desc: string,
    depositRule: string,
    priceAmount: number,
    priceCurrency: Currency,
    dayNeedFrom: number,
    dayNeedTo: number,
    timesAllowedDraftToChange: number,
    timesAllowedCompletionToChange: number,
    //sampleImages
    isR18: boolean,
    allowBePrivate: boolean,
    allowAnonymous: boolean
}

interface Props extends StandardProps<any, any> {
    openCommission: OpenCommission
}

interface SampleImagePath {
    path: string
    remove: boolean
}

export default function EditOpenCommissionModal({openCommission, ...props}: Props) {
    const classes = useStyles();
    const [editedRemoteSampleImages, setEditedRemoteSampleImages]
        = useState<SampleImagePath[]>(
        openCommission.sampleImagePaths.map<SampleImagePath>(path => {
            return {path, remove: false}
        })
    )
    const [sampleImages, setSampleImages] = useState<File[]>([]);
    const openCommUseCase = useInjection<OpenCommissionUseCase>(TYPES.OpenCommissionUseCase)
    const dispatch = useAppDispatch()
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>({
        defaultValues: {
            title: openCommission.title,
            desc: openCommission.desc,
            depositRule: openCommission.depositRule,
            priceAmount: openCommission.price?.amount,
            priceCurrency: openCommission.price?.currency,
            dayNeedFrom: openCommission.dayNeed?.from,
            dayNeedTo: openCommission.dayNeed?.to,
            timesAllowedDraftToChange: openCommission.timesAllowedDraftToChange,
            timesAllowedCompletionToChange: openCommission.timesAllowedCompletionToChange,
            isR18: openCommission.isR18,
            allowBePrivate: openCommission.allowBePrivate,
            allowAnonymous: openCommission.allowAnonymous,
        }
    });

    const totalImages = useCallback(() => {
        const totalKeepRemoteSampleImage = editedRemoteSampleImages.filter(img => !img.remove).length
        return totalKeepRemoteSampleImage + sampleImages.length
    }, [editedRemoteSampleImages, sampleImages.length])

    const filesCallback = useCallback(
        (files: File[]) => {
            const addFiles = files.filter((file, index) => {
                return index + sampleImages.length < 3
            })
            if (addFiles.length <= 0) {
                return
            }
            addFiles.forEach(file => {

            })

            setSampleImages([...sampleImages, ...addFiles])
        }, [sampleImages]);

    const onClickDeleteRemoteImage = useCallback(
        (index: number) => {
            if (totalImages() >= 3 && editedRemoteSampleImages[index].remove) {
                return
            }
            let images = [...editedRemoteSampleImages]
            images[index].remove = !images[index].remove
            setEditedRemoteSampleImages(images)
        }
        , [editedRemoteSampleImages, totalImages])

    const onClickDeleteImage = useCallback(
        (index) => {
            setSampleImages(prevState => prevState.filter((_, i: number) => i !== index))
        }
        , [])

    const onDragEnd = useCallback((result: DropResult) => {
        const {destination, source, draggableId} = result
        if (!destination) {
            // Drop outside the zone
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            // Drop to same poistion
            return
        }
        if (draggableId === "remote") {
            const imgs = [...editedRemoteSampleImages]
            const removedImg = imgs.splice(source.index, 1)
            imgs.splice(destination.index, 0, removedImg[0])
            setEditedRemoteSampleImages(imgs)
        } else if (draggableId === "new") {
            const imgs = [...sampleImages]
            const removedImg = imgs.splice(source.index, 1)
            imgs.splice(destination.index, 0, removedImg[0])
            setSampleImages(imgs)
        }
    }, [editedRemoteSampleImages, sampleImages])

    const onSubmit = useCallback(
        (data: Inputs) => {
            console.log(JSON.stringify(data))

            getUploadImages(sampleImages).then(files => {
                console.log(`getUploadImages`)
                if (files.length <= 0) {
                    return
                }
                const updater: OpenCommissionUpdater = {
                    openCommId: openCommission.id,
                    addSampleImages: sampleImages,
                    allowAnonymous: data.allowAnonymous !== openCommission.allowAnonymous ? data.allowAnonymous : undefined,
                    allowBePrivate: data.allowBePrivate !== openCommission.allowBePrivate ? data.allowBePrivate : undefined,
                    dayNeed: (data.dayNeedFrom !== openCommission.dayNeed?.from
                        || data.dayNeedTo !== openCommission.dayNeed?.to)
                        ? {from: data.dayNeedFrom, to: data.dayNeedTo} : undefined,
                    depositRule: data.depositRule !== openCommission.depositRule ? data.depositRule : undefined,
                    desc: data.desc !== openCommission.desc ? data.desc : undefined,
                    isR18: data.isR18 !== openCommission.isR18 ? data.isR18 : undefined,
                    price: (data.priceAmount !== openCommission.price?.amount
                        || data.priceCurrency !== openCommission.price?.currency)
                        ? {amount: data.priceAmount, currency: data.priceCurrency} : undefined,
                    editedSampleImagePaths: editedRemoteSampleImages.map(img => img.path),
                    timesAllowedCompletionToChange: data.timesAllowedCompletionToChange !== openCommission.timesAllowedCompletionToChange
                        ? data.timesAllowedCompletionToChange : undefined,
                    timesAllowedDraftToChange: data.timesAllowedDraftToChange !== openCommission.timesAllowedDraftToChange
                        ? data.timesAllowedDraftToChange : undefined,
                    title: data.title !== openCommission.title ? data.title : undefined
                }

                dispatch(updateOpenCommission({updater}))
            }).catch(err => {
                console.log(`parse file error`)
            })

        }, [dispatch, editedRemoteSampleImages, openCommission.allowAnonymous, openCommission.allowBePrivate, openCommission.dayNeed?.from, openCommission.dayNeed?.to, openCommission.depositRule, openCommission.desc, openCommission.id, openCommission.isR18, openCommission.price?.amount, openCommission.price?.currency, openCommission.timesAllowedCompletionToChange, openCommission.timesAllowedDraftToChange, openCommission.title, sampleImages])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                ??????????????????
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {openCommission.id}
                </DialogContentText>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isTitleValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="??????"
                                        size="small"
                                        helperText="4-12 ?????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="priceAmount"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isMinPriceAmountValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        type="number"
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        label="????????????"
                                        size="small"
                                        fullWidth
                                        helperText="?????????????????????????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="priceCurrency"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isMinPriceCurrencyValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel id="price-currency-label">??????</InputLabel>
                                        <Select
                                            labelId="price-currency-label"
                                            value={value}
                                            onChange={onChange}
                                            label="??????"
                                        >
                                            <MenuItem value="">
                                                <em>-</em>
                                            </MenuItem>
                                            <MenuItem value={"TWD"}>??????</MenuItem>
                                            <MenuItem value={"HKD"}>??????</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                            <FormHelperText>????????????</FormHelperText>
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="dayNeedFrom"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isDayNeedValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        label="???????????????????????????)"
                                        fullWidth
                                        size="small"
                                        helperText="?????????????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="dayNeedTo"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isDayNeedValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        size="small"
                                        label="?????????)"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="timesAllowedDraftToChange"
                                control={control}
                                defaultValue={""}
                                rules={{
                                    required: true,
                                    validate: openCommUseCase.isTimesAllowedCompletionToChangeValid
                                }}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="?????????????????????"
                                        size="small"
                                        helperText="????????????????????????????????????????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="timesAllowedCompletionToChange"
                                control={control}
                                defaultValue={""}
                                rules={{
                                    required: true,
                                    validate: openCommUseCase.isTimesAllowedCompletionToChangeValid
                                }}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        aria-valuemin={0}
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="????????????????????????"
                                        size="small"
                                        helperText="???????????????????????????????????????????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="depositRule"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isDepositRuleValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        label="????????????(?????????)"
                                        size="small"
                                        helperText="???????????????10%??????20????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="desc"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: openCommUseCase.isDepositRuleValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        label="????????????(?????????)"
                                        size="small"
                                        multiline
                                        rows={4}
                                        rowsMax={8}
                                        helperText="???120????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel component="legend">????????????</FormLabel>
                                <DragDropContext onDragEnd={onDragEnd}>

                                </DragDropContext>

                                <Box display="inline-flex" alignItems="flex-end">
                                    {
                                        editedRemoteSampleImages.map((image, index) => {
                                            return <AppRemoteImage
                                                key={index}
                                                className={classes.regImg}
                                                toBeRemoved={image.remove}
                                                src={imgBySize(ImageSize.Middle, image.path)}
                                                onClickDelete={() => onClickDeleteRemoteImage(index)}
                                            />
                                        })
                                    }
                                </Box>
                                <Box display="inline-flex" alignItems="flex-end">
                                    {
                                        sampleImages.map((image, index) => {
                                            return <AppRemovableImage
                                                key={index}
                                                className={classes.regImg}
                                                src={image}
                                                onClickDelete={() => onClickDeleteImage(index)}
                                            />
                                        })
                                    }
                                </Box>
                                {totalImages() < 3 && <AppDropzone onDrop={filesCallback}/>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="isR18"
                                control={control}
                                defaultValue={false}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value}
                                                onChange={onChange}
                                                name="isR18"
                                                color="primary"
                                            />
                                        }
                                        label="???????????????"
                                    />
                                }
                            />
                            <FormHelperText>????????????????????????????????????????????????</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="allowBePrivate"
                                control={control}
                                defaultValue={false}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value}
                                                onChange={onChange}
                                                name="allowBePrivate"
                                                color="primary"
                                            />
                                        }
                                        label="???????????????????????????????????????"
                                    />
                                }
                            />
                            <FormHelperText>*???????????????????????????????????????????????????????????????????????????????????????????????????</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="allowAnonymous"
                                control={control}
                                defaultValue={false}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value}
                                                onChange={onChange}
                                                name="allowAnonymous"
                                                color="primary"
                                            />
                                        }
                                        label="??????????????????"
                                    />
                                }
                            />
                            <FormHelperText>???????????????????????????????????????</FormHelperText>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" fullWidth>
                    ??????
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
                    ??????
                </Button>
            </DialogActions>
        </Dialog>
    )
}
