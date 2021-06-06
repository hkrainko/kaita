import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Container,
    createStyles,
    FormControlLabel,
    Grid,
    makeStyles,
    Slider,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import React, {useCallback, useEffect, useState} from "react";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {SearchUseCase} from "../../domain/search/search.usecase";
import SearchOpenCommissionsResult from "./SearchOpenCommissionsResult";
import {SearchType} from "../../domain/search/model/search-type";
import {useAppDispatch} from "../hooks";
import {searchOpenCommissions} from "./usecase/searchSlice";
import {useLocation} from "react-router-dom";
import {SortOrder} from "../../domain/search/model/search-sorter";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(5),
        },
        form: {
            width: '100%'
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

type Inputs = {
    price: number[],
    dayNeed: number[],
}

export default function Search(props: Props) {
    const classes = useStyles()

    const searchUseCase = useInjection<SearchUseCase>(TYPES.SearchUseCase)
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searchType = query.get('t')
    const searchText = query.get('s')
    const [page, setPage] = useState<number>(1)
    const dispatch = useAppDispatch()
    const {handleSubmit, control, watch, formState: {errors}} = useForm<Inputs>();

    const valueText = useCallback((value: number) => {
        return `${value} TWD`
    }, [])

    const fetchDataByType = useCallback((searchType: SearchType, currentPage: number) => {
        if (!searchText) {
            return
        }
        switch (searchType) {
            case SearchType.OpenCommissions:
                dispatch(searchOpenCommissions({
                    text: searchText,
                    filter: {
                        allowAnonymous: undefined,
                        allowBePrivate: undefined,
                        currency: undefined,
                        dayNeed: undefined,
                        isR18: undefined,
                        priceFromRange: undefined,
                        priceToRange: undefined
                    }, sorter: {
                        artistId: undefined,
                        createTime: undefined,
                        dayNeedFrom: undefined,
                        dayNeedTo: undefined,
                        lastUpdatedTime: SortOrder.Descending,
                        priceFrom: undefined,
                        priceTo: undefined,
                        type: SearchType.OpenCommissions
                    }, currentPage,
                    pageSize: 10
                }))
                break
            default:
                break
        }
    }, [dispatch, searchText])

    useEffect(() => {
        if (!searchType) {
            return
        }
        fetchDataByType(searchType as SearchType, page)
    }, [fetchDataByType, page, searchType])

    return (
        <Container className={classes.root}>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Accordion>
                        <AccordionSummary
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                control={<Checkbox checked={true} color={"primary"}/>}
                                label="開放委托"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <form className={classes.form}>
                                <label>價錢</label>
                                <Controller
                                    name="price"
                                    control={control}
                                    defaultValue={[20, 100]}
                                    rules={{required: true, validate: searchUseCase.isOpenCommissionPriceValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <Slider
                                            value={value}
                                            max={10000}
                                            min={0}
                                            step={50}
                                            onChange={(event, value) => {
                                                onChange(value)
                                            }}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={valueText}
                                        />
                                    }
                                />
                                <label>需時</label>
                                <Controller
                                    name="dayNeed"
                                    control={control}
                                    defaultValue={[20, 100]}
                                    rules={{required: true, validate: searchUseCase.isOpenCommissionPriceValid}}
                                    render={({field: {onChange, value}, fieldState: {error}}) =>
                                        <Slider
                                            value={value}
                                            max={10000}
                                            min={0}
                                            step={50}
                                            onChange={(event, value) => {
                                                onChange(value)
                                            }}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={valueText}
                                        />
                                    }
                                />
                            </form>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            aria-label="Expand"
                            aria-controls="additional-actions2-content"
                            id="additional-actions2-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox checked={true} color={"primary"}/>}
                                label="繪師"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                The focus event of the nested action will propagate up and also focus the accordion
                                unless you explicitly stop it.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            aria-label="Expand"
                            aria-controls="additional-actions3-content"
                            id="additional-actions3-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox checked={true} color={"primary"}/>}
                                label="作品"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                If you forget to put an aria-label on the nested action, the label of the action will
                                also be included in the label of the parent button that controls the accordion
                                expansion.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item md={9}>
                    <SearchOpenCommissionsResult onLoadMore={() => setPage(page + 1)}/>
                </Grid>
            </Grid>
        </Container>
    )
}
