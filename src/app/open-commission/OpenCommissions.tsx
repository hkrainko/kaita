import {Box, Button, createStyles, Grid, IconButton, makeStyles, StandardProps, Theme} from "@material-ui/core";
import OpenCommissionCard from "./OpenCommissionCard";
import {Add, MoreHoriz} from "@material-ui/icons";
import NewOpenCommissionModal from "./new/NewOpenCommissionModal";
import React, {useState} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            margin: theme.spacing(1),
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function OpenCommissions(props: Props) {
    const classes = useStyles(props.className)

    const [showNewComm, setShowNewComm] = useState(false)

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <OpenCommissionCard/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <OpenCommissionCard/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <OpenCommissionCard/>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent={"space-around"}>
                <div/>
                <IconButton color="default" aria-label="load more">
                    <MoreHoriz />
                </IconButton>
                <Button variant="contained"
                        color="default"
                        size="small"
                        onClick={() => setShowNewComm(true)}
                        className={classes.addButton}
                        startIcon={<Add />}>新增</Button>
            </Box>
            <NewOpenCommissionModal open={showNewComm} onClose={() => setShowNewComm(false)}/>
        </Box>
    )

}
