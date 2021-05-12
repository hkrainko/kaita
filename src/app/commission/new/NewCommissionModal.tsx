import {
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
    Theme,
    Typography
} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import AppRemovableImage from "../../component/AppRemovableImage";
import AppDropzone from "../../component/AppDropzone";
import getUploadImages from "../../utils/getUploadImages";
import {useAppDispatch} from "../../hooks";
import {useInjection} from "../../../iocReact";
import {CommissionUseCase} from "../../../domain/commission/commission.usecase";
import {TYPES} from "../../../types";
import {OpenCommission} from "../../../domain/open-commission/model/open-commission";
import {Currency} from "../../../domain/price/price";

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
    dayNeed: number,
    budget: number,
    currency: Currency,
    paymentMethod: string,
    sizeWidth: number,
    sizeHeight: number,
    sizeUnit: string,
    exportFormat: number,
    resolution: number,
    desc: string,
    isR18: boolean,
    bePrivate: boolean,
    anonymous: boolean,
}

interface Props extends StandardProps<any, any> {
    openComm: OpenCommission
    open: boolean
    onClose: () => void
}

export default function NewCommissionModal({openComm, open, onClose, ...Props}: Props) {
    const classes = useStyles();

    const [regImages, setRegImages] = useState<File[]>([]);
    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
    const dispatch = useAppDispatch()
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
        const rImgs = [...regImages]
        const removedImg = rImgs.splice(source.index, 1)
        rImgs.splice(destination.index, 0, removedImg[0])
        setRegImages(rImgs)
    }, [regImages])

    const onSubmit = useCallback(
        (data: Inputs) => {
            console.log(JSON.stringify(data))

            getUploadImages(regImages).then(files => {
                console.log(`getUploadImages`)
                if (files.length <= 0) {
                    return
                }

            }).catch(err => {
                console.log(`parse file error`)
            })

        }, [dispatch, regImages])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                提出委托
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {openComm.id}
                </DialogContentText>
                <DialogContentText>
                    <label>主題</label>
                    <Typography>{openComm.title}</Typography>
                </DialogContentText>
                <DialogContentText>
                    <label>繪師</label>
                    <Typography>{openComm.artistId}</Typography>
                </DialogContentText>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="dayNeed"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isDayNeedValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="期限"
                                        size="small"
                                        helperText="由繪師收取訂金後計算。"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="budget"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isBudgetValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        type="number"
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        label="預算"
                                        size="small"
                                        fullWidth
                                        helperText="委托時提出的價錢下限。"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="currency"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isCurrencyValid}}
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
                                name="paymentMethod"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isPaymentMethodValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel id="price-method-label">付款方式</InputLabel>
                                        <Select
                                            labelId="price-method-label"
                                            value={value}
                                            onChange={onChange}
                                            label="貨幣"
                                        >
                                            <MenuItem value="">
                                                <em>請選擇...</em>
                                            </MenuItem>
                                            <MenuItem value={"Paypal"}>Paypal</MenuItem>
                                            <MenuItem value={"銀行匯款"}>銀行匯款</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="sizeWidth"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isSizeWidthValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        label="尺吋(闊)"
                                        helperText="留空即由繪師決定"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="sizeHeight"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isSizeHeightValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        label="(高)"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="sizeUnit"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isSizeUnitValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel id="size-unit-label">(單位)</InputLabel>
                                        <Select
                                            labelId="size-unit-label"
                                            value={value}
                                            onChange={onChange}
                                            label="(單位)"
                                        >
                                            <MenuItem value="">
                                                <em>請選擇...</em>
                                            </MenuItem>
                                            <MenuItem value={"mm"}>mm</MenuItem>
                                            <MenuItem value={"cm"}>cm</MenuItem>
                                            <MenuItem value={"inch"}>inch</MenuItem>
                                            <MenuItem value={"px"}>px</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="exportFormat"
                                control={control}
                                defaultValue={""}
                                rules={{
                                    required: true,
                                    validate: commUseCase.isExportFormatValid
                                }}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel id="export-format-label">(輸出格式)</InputLabel>
                                        <Select
                                            labelId="export-format-label"
                                            value={value}
                                            onChange={onChange}
                                            label="(輸出格式)"
                                        >
                                            <MenuItem value="">
                                                <em>請選擇...</em>
                                            </MenuItem>
                                            <MenuItem value={"jpg"}>jpg</MenuItem>
                                            <MenuItem value={"png"}>png</MenuItem>
                                            <MenuItem value={"psd"}>psd</MenuItem>
                                            <MenuItem value={"other"}>其他(請指明)</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="resolution"
                                control={control}
                                defaultValue={""}
                                rules={{
                                    validate: commUseCase.isResolutionValid
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
                                        label="解析度(ppi)"
                                        size="small"
                                        helperText="留空即由繪師決定。"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="desc"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isDescValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        label="詳細內容"
                                        size="small"
                                        helperText="150字以內。"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel component="legend">參考圖片</FormLabel>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable" direction="horizontal">
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}
                                                 className={classes.droppableBox}>
                                                {regImages.map((image, index) => (
                                                    <Draggable key={index.toString()} draggableId={index.toString()}
                                                               index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <AppRemovableImage
                                                                    key={index}
                                                                    className={classes.regImg}
                                                                    src={image}
                                                                    onClickDelete={() => onClickDeleteImage(index)}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
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
                                name="bePrivate"
                                control={control}
                                defaultValue={false}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value}
                                                onChange={onChange}
                                                name="bePrivate"
                                                color="primary"
                                            />
                                        }
                                        label="不公開完成品"
                                    />
                                }
                            />
                            <FormHelperText>勾選後完成品將不可被搜尋以及不會在繪師個人小屋內展示</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="anonymous"
                                control={control}
                                defaultValue={false}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value}
                                                onChange={onChange}
                                                name="anonymous"
                                                color="primary"
                                            />
                                        }
                                        label="匿名委托"
                                    />
                                }
                            />
                            <FormHelperText>勾選後將不會對繪師表示你的身份。</FormHelperText>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" fullWidth>
                    取消
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
