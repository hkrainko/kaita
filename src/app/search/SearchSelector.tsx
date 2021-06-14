import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    makeStyles,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {FilterList, Sort, TuneRounded} from "@material-ui/icons";
import React, {useCallback, useState} from "react";
import {SearchSelection} from "../../domain/search/search.usecase";
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

interface Props<T extends SearchFilter, U extends SearchSorter> extends StandardProps<any, any> {
    searchSelection: SearchSelection<T, U>
    onConfirm: (filter: T, sorter: U) => void
}


export default function SearchSelector<T extends SearchFilter, U extends SearchSorter>({searchSelection, initSelection, onConfirm, ...props}: Props<T, U>) {
    const classes = useStyles(props.className)
    const [currentSearchType, setCurrentSearchType] = useState(searchSelection.type)
    const [selections, setSelections] = useState<boolean[][]>(searchSelection.getInitSelection)

    const onClickListItem = useCallback((i: number, j: number) => {
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
                if (searchSelection.isAllowUnselectAll(i)) {
                    copiedSelections[i][j] = false
                }
            } else {
                // if not selected
                copiedSelections[i].forEach((_, index) => {
                    copiedSelections[i][index] = false
                })
                copiedSelections[i][j] = true
            }
        }
        setSelections(copiedSelections)
    }, [searchSelection.groups, selections])

    const onClickConfirm = useCallback(() => {
        onConfirm(searchSelection.getFilter(selections), searchSelection.getSorter(selections))
    }, [onConfirm, searchSelection, selections])

    const onClickReset = useCallback(() => {
        setSelections(searchSelection.getInitSelection)
    }, [searchSelection])

    if (currentSearchType !== searchSelection.type) {
        setCurrentSearchType(searchSelection.type)
        setSelections(searchSelection.getInitSelection())
    }

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
