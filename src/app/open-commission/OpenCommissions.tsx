import {Box, Button, createStyles, Grid, IconButton, makeStyles, StandardProps, Theme} from "@material-ui/core";
import OpenCommissionCard from "./OpenCommissionCard";
import {Add, MoreHoriz} from "@material-ui/icons";
import NewOpenCommissionModal from "./new/NewOpenCommissionModal";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useParams} from "react-router-dom";
import {getOpenCommissions} from "./usecase/openCommissionSlice";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";

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

    let {id} = useParams<{ id: string }>()
    const [showNewComm, setShowNewComm] = useState(false)
    const getOpenCommissionsResult = useAppSelector((state) => {
        if (state.openCommission.forArtist.artistId === id) {
            const openCommissions = state.openCommission.forArtist.ids.map(id => {
                return state.openCommission.byId[id]
            })
            return {
                artistId: state.openCommission.forArtist.artistId,
                openCommissions: openCommissions,
                offset: state.openCommission.forArtist.offset,
                fetchCount: state.openCommission.forArtist.fetchCount,
                total: state.openCommission.forArtist.total,
            }
        }
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getOpenCommissions({
            filter: {
                artistId: id,
                count: 20,
                offset: 0,
            }
        }))
    }, [dispatch, id])

    return (
        <Box>
            <Grid container spacing={2}>
                {
                    getOpenCommissionsResult && getOpenCommissionsResult.openCommissions.map((oc: OpenCommission) => (
                        <Grid item xs={6} md={4} key={oc.id}>
                            <OpenCommissionCard openCommission={oc}/>
                        </Grid>
                    ))
                }
            </Grid>
            <Box display="flex" justifyContent={"space-around"}>
                <div/>
                <IconButton color="default" aria-label="load more">
                    <MoreHoriz/>
                </IconButton>
                <Button variant="contained"
                        color="default"
                        size="small"
                        onClick={() => setShowNewComm(true)}
                        className={classes.addButton}
                        startIcon={<Add/>}>新增</Button>
            </Box>
            <NewOpenCommissionModal open={showNewComm} onClose={() => setShowNewComm(false)}/>
        </Box>
    )

}
