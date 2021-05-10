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
    TextField,
    Theme
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../hooks";
import React, {useCallback, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Currency} from "../../../domain/price/price";
import {useInjection} from "../../../iocReact";
import {TYPES} from "../../../types";
import {OpenCommissionUseCase} from "../../../domain/open-commission/open-commission.usecase";
import AppDropzone from "../../component/AppDropzone";
import AppRemovableImage from "../../component/AppRemovableImage";
import {addOpenCommission} from "../usecase/openCommissionSlice";
import {OpenCommissionCreator} from "../../../domain/open-commission/model/open-commission-creator";
import imageCompression from "browser-image-compression";
import getUploadImages from "../../utils/getUploadImages";

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

interface Props {
    intro?: string
    open: boolean
    onClose: () => void
}

export default function NewOpenCommissionModal(props: Props) {
    const classes = useStyles();

    const [regImages, setRegImages] = useState<File[]>([]);
    const openCommUseCase = useInjection<OpenCommissionUseCase>(TYPES.OpenCommissionUseCase)
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();

    const filesCallback = useCallback(
        (files: File[]) => {
            const addFiles = files.filter((file, index) => {
                return index + regImages.length < 3
            })
            if (addFiles.length <= 0) {
                return
            }
            addFiles.forEach(file => {

            })

            setRegImages([...regImages, ...addFiles])
        }, [regImages]);

    const onClickDeleteImage = useCallback(
        (index) => {
            setRegImages(prevState => prevState.filter((_, i: number) => i !== index))
        }
        , [])

    const onSubmit = useCallback(
        (data: Inputs) => {
            console.log(JSON.stringify(data))

            getUploadImages(regImages).then(files => {
                console.log(`getUploadImages`)
                if (files.length <= 0) {
                    return
                }
                let creator: OpenCommissionCreator = {
                    allowAnonymous: data.allowAnonymous,
                    allowBePrivate: data.allowBePrivate,
                    dayNeed: {
                        from: data.dayNeedFrom,
                        to: data.dayNeedTo
                    },
                    depositRule: data.depositRule,
                    desc: data.desc,
                    isR18: data.isR18,
                    price: {
                        amount: data.priceAmount,
                        currency: data.priceCurrency
                    },
                    sampleImages: files,
                    timesAllowedCompletionToChange: data.timesAllowedCompletionToChange,
                    timesAllowedDraftToChange: data.timesAllowedDraftToChange,
                    title: data.title
                };

                dispatch(addOpenCommission({creator}))
            }).catch(err => {
                console.log(`parse file error`)
            })

        }, [dispatch, regImages])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="draggable-dialog-title"
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
                                        label="標題"
                                        size="small"
                                        helperText="4-12 字元。"
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
                                        label="最低價錢"
                                        size="small"
                                        fullWidth
                                        helperText="委托時提出的價錢下限。"
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
                                        <InputLabel id="price-currency-label">貨幣</InputLabel>
                                        <Select
                                            labelId="price-currency-label"
                                            value={value}
                                            onChange={onChange}
                                            label="貨幣"
                                        >
                                            <MenuItem value="">
                                                <em>-</em>
                                            </MenuItem>
                                            <MenuItem value={"TWD"}>台幣</MenuItem>
                                            <MenuItem value={"HKD"}>港幣</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                            <FormHelperText>會換算。</FormHelperText>
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
                                        label="完成所需日數（最少)"
                                        fullWidth
                                        size="small"
                                        helperText="所需繪師時間。"
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
                                        label="（最多)"
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
                                        label="草稿可修改次數"
                                        size="small"
                                        helperText="允許委托者提出對草稿修改的次數。"
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
                                        label="完成品可微調次數"
                                        size="small"
                                        helperText="允許委托者提出對完成品微調的次數。"
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
                                        label="訂金規則(可留空)"
                                        size="small"
                                        helperText="例：價錢的10%。（20字以內）"
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
                                        label="補充說明(可留空)"
                                        size="small"
                                        multiline
                                        rows={4}
                                        rowsMax={8}
                                        helperText="（120字以內）"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel component="legend">參考圖片</FormLabel>
                                <Box display="inline-flex" alignItems="flex-end">
                                    {
                                        regImages.map((image, index) => {
                                            return <AppRemovableImage
                                                key={index}
                                                className={classes.regImg}
                                                src={image}
                                                onClickDelete={() => onClickDeleteImage(index)}
                                            />
                                        })
                                    }
                                </Box>
                                {regImages.length < 3 && <AppDropzone onDrop={filesCallback}/>}
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
                                        label="成人向委托"
                                    />
                                }
                            />
                            <FormHelperText>成人作品的範例圖將不會公開展示。</FormHelperText>
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
                                        label="允許委托者選擇不公開完成品"
                                    />
                                }
                            />
                            <FormHelperText>*如委托者選擇不公開，完成品將不可被搜尋以及不會在繪師個人小屋內展示</FormHelperText>
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
                                        label="接受匿名委托"
                                    />
                                }
                            />
                            <FormHelperText>允許委托者選擇不表明身份。</FormHelperText>
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
