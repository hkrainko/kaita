import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, Chip,
    createStyles, Divider, Grid, List, ListItem,
    makeStyles,
    StandardProps,
    Theme, Typography
} from "@material-ui/core";
import {FilterList, Sort, TuneRounded} from "@material-ui/icons";
import React, {useCallback, useEffect, useState} from "react";
import {SearchSelection, SearchUseCase} from "../../domain/search/search.usecase";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {SearchFilter} from "../../domain/search/model/search-filter";
import {SearchSorter} from "../../domain/search/model/search-sorter";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        sortChip: {
            marginLeft: theme.spacing(1)
        }
    }),
);

const getInitValue = <T extends SearchFilter, U extends SearchSorter>(searchSelection: SearchSelection<T, U>) => {
    let result: boolean[][] = [[]]
    searchSelection.groups.forEach((gp, i) => {
        let tempCols: boolean[] = []
        gp.options.forEach((_, j) => {
            tempCols[j] = false
        })
        result[i] = tempCols
    })
    return result
}

interface Props<T extends SearchFilter, U extends SearchSorter> extends StandardProps<any, any> {
    searchSelection: SearchSelection<T, U>
    onConfirm: (filter: T, sorter: U) => void
}


export default function SearchSelector<T extends SearchFilter, U extends SearchSorter>({searchSelection, onConfirm, ...props}: Props<T, U>) {
    const classes = useStyles(props.className)
    const [selections, setSelections] = useState<boolean[][]>([[]])

    const searchUseCase = useInjection<SearchUseCase>(TYPES.SearchUseCase)

    useEffect(() => {
        setSelections(getInitValue(searchSelection))
    }, [searchSelection])

    const onClickListItem = useCallback((i: number, j: number) => {
        console.log(`onSelectListItem ${i}, ${j}`)
        let copiedSelections: boolean[][] = [[]]
        selections.forEach((row, i) => {
            let tempCols: boolean[] = []
            row.forEach((selected, j) => {
                tempCols[j] = selected
            })
            copiedSelections[i] = tempCols
        })

        if (searchSelection.groups[i].multipleSelection) {
            copiedSelections[i][j] = !copiedSelections[i][j]
        } else {
            if (copiedSelections[i][j]) {
                // if selected
                copiedSelections[i][j] = false
            } else {
                copiedSelections[i].forEach((_, index) => {
                    copiedSelections[i][index] = false
                })
                copiedSelections[i][j] = true
            }
        }
        console.log(`copiedSelections:${JSON.stringify(copiedSelections)}`)
        setSelections(copiedSelections)
    }, [searchSelection.groups, selections])

    const onClickConfirm = useCallback(() => {
        onConfirm(searchSelection.getFilter(selections), searchSelection.getSorter(selections))
    }, [])

    const onClickReset = useCallback(() => {
        setSelections(getInitValue(searchSelection))
    }, [searchSelection])

    return (
        <React.Fragment>
            <Accordion variant="outlined">
                <AccordionSummary>
                    <Box display="flex">
                        <Button size="medium" startIcon={<TuneRounded/>}>
                            篩選
                        </Button>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {
                            searchSelection.groups.map((gp, i) => {
                                return (
                                    <Grid item xs={3}>
                                        <Typography>{gp.title}</Typography>
                                        <Divider/>
                                        <List>
                                            {
                                                gp.options.map((opt, j) => {
                                                    return (
                                                        <ListItem
                                                            button
                                                            selected={
                                                                selections.length > i &&
                                                                selections[i].length > j &&
                                                                selections[i][j]
                                                            }
                                                            onClick={() => onClickListItem(i, j)}>{opt.name}</ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </AccordionDetails>
                <Divider/>
                <AccordionActions>
                    <Button size="medium" onClick={onClickReset}>
                        清除
                    </Button>
                    <Button size="medium" color="primary" onClick={onClickConfirm}>
                        套用
                    </Button>
                </AccordionActions>
            </Accordion>
            <Box display="flex" my={2}>
                <Chip
                    icon={<FilterList/>}
                    label="日期 > 50"
                    onDelete={() => {
                    }}
                    color="default"
                />
                <Chip
                    icon={<Sort/>}
                    label="更新日期"
                    color="default"
                    className={classes.sortChip}
                />
            </Box>
        </React.Fragment>
    )
}
