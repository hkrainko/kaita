import {
    Box,
    Button,
    Checkbox,
    Chip,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    StandardProps,
    TextField,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
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
import {
    AccountBalanceWalletOutlined,
    GavelOutlined,
    LocalAtmOutlined,
    MmsOutlined,
    RateReviewOutlined,
    ScheduleOutlined,
    SubjectOutlined
} from "@material-ui/icons";
import {CommissionCreator} from "../../../domain/commission/model/commission-creator";
import {submitCommission} from "../usecase/commissionSlice";
import config from "../../config";
import imgBySize, {ImageSize} from "../../utils/imageUrl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        form: {},
        listItem: {
            padding: 0,
        },
        listItemIcon: {
            minWidth: '40px'
        },
        ListItemTextPrimary: {
            fontSize: '14px'
        },
        textField: {
            marginTop: '10px'
        },
        textArea: {
            height: '100%',
            minWidth: '99.0%',
            maxWidth: '99.0%',
            fontSize: theme.typography.body1.fontSize,
            font: theme.typography.fontFamily,
        },
        sampleImgDiv: {
            maxWidth: '200px',
        },
        sampleImg: {
            width: '100%',
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
    otherSizeUnit: string,
    exportFormat: string,
    otherExportFormat: string,
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

    const theme = useTheme();
    const isBreakpointXs = useMediaQuery(theme.breakpoints.only('xs'));
    const [regImages, setRegImages] = useState<File[]>([]);
    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
    const dispatch = useAppDispatch()
    const {handleSubmit, control, watch, formState: {errors}} = useForm<Inputs>();
    const watchSizeUnit = watch("sizeUnit")
    const watchExportFormat = watch("exportFormat")

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
                let creator: CommissionCreator = {
                    anonymous: data.anonymous,
                    artistId: openComm.artistId,
                    bePrivate: data.bePrivate,
                    dayNeed: data.dayNeed,
                    desc: data.desc,
                    exportFormat: data.exportFormat,
                    isR18: data.isR18,
                    openCommissionId: openComm.id,
                    paymentMethod: data.paymentMethod,
                    price: {
                        amount: data.budget,
                        currency: data.currency
                    },
                    refImages: regImages,
                    resolution: data.resolution,
                    size: {
                        height: data.sizeHeight,
                        unit: data.sizeUnit === 'other' ? data.otherSizeUnit : data.sizeUnit,
                        width: data.sizeWidth
                    }
                }
                dispatch(submitCommission({creator}))
            }).catch(err => {
                console.log(`parse file error`)
            })

        }, [dispatch, openComm.artistId, openComm.id, regImages])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
            fullScreen={isBreakpointXs}
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                ????????????
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {openComm.id}
                </DialogContentText>
                <DialogContentText>
                    <label>??????</label>
                    <Typography>{openComm.title}</Typography>
                </DialogContentText>
                <DialogContentText>
                    <label>??????</label>
                    <Typography>{openComm.artistId}</Typography>
                </DialogContentText>
                <DialogContentText>
                    <label>??????</label>
                    <Box display="flex" width="100%">
                        {openComm.sampleImagePaths.map((path, index) => (
                            <div className={classes.sampleImg}>
                                <img key={index}
                                     src={imgBySize(ImageSize.Middle, path)}
                                     alt="??????" className={classes.sampleImg}/>
                            </div>
                        ))}
                    </Box>
                </DialogContentText>
                <List>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <RateReviewOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="?????????????????????"
                                      secondary={`${openComm.timesAllowedDraftToChange} ???`}/>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <MmsOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="????????????????????????"
                                      secondary={`${openComm.timesAllowedCompletionToChange} ???`}/>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <GavelOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="????????????" secondary={openComm.depositRule}/>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <SubjectOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="??????" secondary={openComm.desc}/>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <ScheduleOutlined/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{className: classes.ListItemTextPrimary}} primary="??????"
                                      secondary={`${openComm.dayNeed?.from} ~ ${openComm.dayNeed?.to} ???`}/>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <LocalAtmOutlined/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{className: classes.ListItemTextPrimary}} primary="????????????"
                                      secondary={`${openComm.price?.amount} ${openComm.price?.currency}`}/>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <AccountBalanceWalletOutlined/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{className: classes.ListItemTextPrimary}} primary="????????????"
                                      secondary={
                                          <React.Fragment>
                                              <Chip size="small" label="Paypal" variant="outlined"/>
                                              <Chip size="small" label="Paypal" variant="outlined"/>
                                              <Chip size="small" label="Paypal" variant="outlined"/>
                                          </React.Fragment>
                                      }/>
                    </ListItem>
                </List>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DialogContentText>??????</DialogContentText>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="dayNeed"
                                control={control}
                                defaultValue={openComm.dayNeed?.from}
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
                                        label="??????"
                                        size="small"
                                        helperText="?????????????????????????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="budget"
                                control={control}
                                defaultValue={openComm.price?.amount}
                                rules={{required: true, validate: commUseCase.isBudgetValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        value={value}
                                        type="number"
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        required
                                        label="??????"
                                        size="small"
                                        fullWidth
                                        helperText="?????????????????????????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="currency"
                                control={control}
                                defaultValue={openComm.price?.currency}
                                rules={{required: true, validate: commUseCase.isCurrencyValid}}
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
                        <Grid item xs={12}>
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
                                        <InputLabel id="price-method-label">????????????</InputLabel>
                                        <Select
                                            labelId="price-method-label"
                                            value={value}
                                            onChange={onChange}
                                            label="????????????"
                                        >
                                            <MenuItem value="">
                                                <em>?????????...</em>
                                            </MenuItem>
                                            <MenuItem value={"Paypal"}>Paypal</MenuItem>
                                            <MenuItem value={"????????????"}>????????????</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        label="????????????"
                                        size="small"
                                        rows={4}
                                        rowsMax={12}
                                        multiline={true}
                                        helperText="150????????????"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel component="legend">????????????</FormLabel>
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
                            <DialogContentText>????????????</DialogContentText>
                            <Divider/>
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
                                        label="??????(???)"
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
                                        label="(???)"
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
                                        <InputLabel id="size-unit-label">(??????)</InputLabel>
                                        <Select
                                            labelId="size-unit-label"
                                            value={value}
                                            onChange={onChange}
                                            label="(??????)"
                                        >
                                            <MenuItem value="">
                                                <em>?????????...</em>
                                            </MenuItem>
                                            <MenuItem value={"mm"}>mm</MenuItem>
                                            <MenuItem value={"cm"}>cm</MenuItem>
                                            <MenuItem value={"inch"}>inch</MenuItem>
                                            <MenuItem value={"px"}>px</MenuItem>
                                            <MenuItem value={"other"}>??????</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        {watchSizeUnit === "other" &&
                        <Grid item xs={12}>
                            <Controller
                                name="otherSizeUnit"
                                control={control}
                                defaultValue={""}
                                rules={{required: true, validate: commUseCase.isSizeUnitValid}}
                                render={({field: {onChange, value}, fieldState: {error}}) =>
                                    <TextField
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        label="????????????"
                                    />
                                }
                            />
                        </Grid>
                        }
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
                                        fullWidth
                                        label="?????????(ppi)"
                                        size="small"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={watchExportFormat === "other" ? 6 : 12}>
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
                                        <InputLabel id="export-format-label">(????????????)</InputLabel>
                                        <Select
                                            labelId="export-format-label"
                                            value={value}
                                            onChange={onChange}
                                            label="(????????????)"
                                        >
                                            <MenuItem value="">
                                                <em>?????????...</em>
                                            </MenuItem>
                                            <MenuItem value={"jpg"}>jpg</MenuItem>
                                            <MenuItem value={"png"}>png</MenuItem>
                                            <MenuItem value={"psd"}>psd</MenuItem>
                                            <MenuItem value={"other"}>??????(?????????)</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        {
                            watchExportFormat === "other" &&
                            <Grid item xs={6}>
                                <Controller
                                    name="otherExportFormat"
                                    control={control}
                                    defaultValue={""}
                                    rules={{
                                        required: true,
                                        validate: commUseCase.isExportFormatValid
                                    }}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <TextField
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            variant="outlined"
                                            fullWidth
                                            label="??????????????????(?????????)"
                                            size="small"
                                        />
                                    }
                                />
                            </Grid>
                        }
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
                                        label="??????????????????"
                                    />
                                }
                            />
                            <FormHelperText>??????????????????????????????????????????????????????????????????????????????</FormHelperText>
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
                                        label="????????????"
                                    />
                                }
                            />
                            <FormHelperText>????????????????????????????????????????????????</FormHelperText>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" fullWidth>
                    ??????
                </Button>
                <Button variant="outlined" color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
                    ??????
                </Button>
            </DialogActions>
        </Dialog>
    )
}
