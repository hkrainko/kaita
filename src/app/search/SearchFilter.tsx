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


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        sortChip: {
            marginLeft: theme.spacing(1)
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function SearchFilter(props: Props) {
    const classes = useStyles(props.className)



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
                        <Grid item xs={3}>
                            <Typography>價錢</Typography>
                            <Divider/>
                            <List>
                                <ListItem button>0-100</ListItem>
                                <ListItem button>0-100</ListItem>
                                <ListItem button>0-100</ListItem>
                                <ListItem button>0-100</ListItem>
                                <ListItem button>0-100</ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>需時</Typography>
                            <Divider/>
                            <List>
                                <ListItem button>0-1日</ListItem>
                                <ListItem button>2-4日</ListItem>
                                <ListItem button>4-7日</ListItem>
                                <ListItem button>7-14日</ListItem>
                                <ListItem button>{`>14日`}</ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>其它</Typography>
                            <Divider/>
                            <List>
                                <ListItem button>R18</ListItem>
                                <ListItem button>不公開完成品</ListItem>
                                <ListItem button>匿名委托</ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>排序</Typography>
                            <Divider/>
                            <List>
                                <ListItem button>最低價錢</ListItem>
                                <ListItem button>完成日數</ListItem>
                                <ListItem button>新增日期</ListItem>
                            </List>
                        </Grid>
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
