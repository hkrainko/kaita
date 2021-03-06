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
    const userId = useAppSelector((state) => state.auth?.authUser?.userId)
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
    const isOwner = getOpenCommissionsResult?.artistId && getOpenCommissionsResult.artistId === userId

    console.log(`AAA ${getOpenCommissionsResult?.artistId} userId=${userId}`)

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
        if (isOwner) {
            return
        }
        setNewComm(openCommission)
    }, [isOwner])

    const onEdit = useCallback((openCommission: OpenCommission) => {
        if (!isOwner) {
            return
        }
        setEditingComm(openCommission)
    }, [isOwner])

    const onDelete = useCallback((openCommission: OpenCommission) => {
        if (!isOwner) {
            return
        }
        setDeletingComm(openCommission)
    }, [isOwner])

    const onConfirmDeleteOpenComm = useCallback(() => {
        if (!deletingComm || !isOwner) {
            return
        }
        dispatch(deleteOpenCommission({openCommId: deletingComm.id}))
    }, [deletingComm, dispatch, isOwner])

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
                {
                    isOwner &&
                    <Button variant="contained"
                            color="default"
                            size="small"
                            onClick={() => setShowNewOpenComm(true)}
                            className={classes.addButton}
                            startIcon={<Add/>}>??????</Button>
                }
            </Box>
            <NewOpenCommissionModal open={showNewOpenComm} onClose={() => setShowNewOpenComm(false)}/>
            {
                isOwner && editingComm
                && <EditOpenCommissionModal openCommission={editingComm} open={true} onClose={() => setEditingComm(null)}/>
            }
            {
                !isOwner && newComm
                && <NewCommissionModal openComm={newComm} open={true} onClose={() => setNewComm(null)}/>
            }
            <AppDialog
                open={deletingComm != null}
                onClose={() => setDeletingComm(null)}
                onConfirm={onConfirmDeleteOpenComm}
                title="?????????????????????????"
                content="???????????????????????????"/>
        </Box>
    )

}
