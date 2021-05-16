import {Box, Button, createStyles, Grid, IconButton, makeStyles, StandardProps, Theme} from "@material-ui/core";
import OpenCommissionCard from "./OpenCommissionCard";
import {Add, MoreHoriz} from "@material-ui/icons";
import NewOpenCommissionModal from "./new/NewOpenCommissionModal";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useParams} from "react-router-dom";
import {deleteOpenCommission, getOpenCommissions} from "./usecase/openCommissionSlice";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import EditOpenCommissionModal from "./edit/EditOpenCommissionModal";
import AppDialog from "../component/AppDialog";
import NewCommissionModal from "../commission/new/NewCommissionModal";

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
    const [showNewOpenComm, setShowNewOpenComm] = useState(false)
    const [newComm, setNewComm] = useState<OpenCommission | null>(null)
    const [editingComm, setEditingComm] = useState<OpenCommission | null>(null)
    const [deletingComm, setDeletingComm] = useState<OpenCommission | null>(null)
    const getOpenCommissionsResult = useAppSelector(state => {
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

    const onNewComm = useCallback((openCommission: OpenCommission) => {
        setNewComm(openCommission)
    }, [])

    const onEdit = useCallback((openCommission: OpenCommission) => {
        setEditingComm(openCommission)
    }, [])

    const onDelete = useCallback((openCommission: OpenCommission) => {
        setDeletingComm(openCommission)
    }, [])

    const onConfirmDeleteOpenComm = useCallback(() => {
        if (!deletingComm) {
            return
        }
        dispatch(deleteOpenCommission({openCommId: deletingComm.id}))
    }, [deletingComm, dispatch])

    return (
        <Box>
            <Grid container spacing={2}>
                {
                    getOpenCommissionsResult && getOpenCommissionsResult.openCommissions.map((oc: OpenCommission) => (
                        <Grid item xs={6} md={4} key={oc.id}>
                            <OpenCommissionCard openCommission={oc} onMainAction={onNewComm} onEdit={onEdit} onDelete={onDelete}/>
                        </Grid>
                    ))
                }
            </Grid>
            <Box display="flex" justifyContent={"space-around"}>
                <IconButton color="default" aria-label="load more">
                    <MoreHoriz/>
                </IconButton>
                <Button variant="contained"
                        color="default"
                        size="small"
                        onClick={() => setShowNewOpenComm(true)}
                        className={classes.addButton}
                        startIcon={<Add/>}>新增</Button>
            </Box>
            <NewOpenCommissionModal open={showNewOpenComm} onClose={() => setShowNewOpenComm(false)}/>
            {
                editingComm
                && <EditOpenCommissionModal openCommission={editingComm} open={true} onClose={() => setEditingComm(null)}/>
            }
            {
                newComm
                && <NewCommissionModal openComm={newComm} open={true} onClose={() => setNewComm(null)}/>
            }
            <AppDialog
                open={deletingComm != null}
                onClose={() => setDeletingComm(null)}
                onConfirm={onConfirmDeleteOpenComm}
                title="確定刪除開放委托?"
                content="一但刪除不會被復完"/>
        </Box>
    )

}
