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
import React from "react";
import {SearchSelection, SearchUseCase} from "../../domain/search/search.usecase";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        sortChip: {
            marginLeft: theme.spacing(1)
        }
    }),
);

interface Props extends StandardProps<any, any> {
    searchSelection: SearchSelection
}

export default function SearchSelector({searchSelection, ...props}: Props) {
    const classes = useStyles(props.className)

    const searchUseCase = useInjection<SearchUseCase>(TYPES.SearchUseCase)


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
                            searchSelection.groups.map(gp => {
                                return (
                                    <Grid item xs={3}>
                                        <Typography>{gp.title}</Typography>
                                        <Divider/>
                                        <List>
                                            {
                                                gp.options.map(opt => {
                                                    return (
                                                        <ListItem button>{opt.name}</ListItem>
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
                    <Button size="medium">取消</Button>
                    <Button size="medium" color="primary">
                        套用
                    </Button>
                </AccordionActions>
            </Accordion>
            <Box display="flex" my={2}>
                <Chip
                    icon={<FilterList />}
                    label="日期 > 50"
                    onDelete={() => {}}
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
