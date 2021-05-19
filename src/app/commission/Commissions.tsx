import {
    Box,
    Container,
    createStyles,
    makeStyles,
    Paper,
    StandardProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Typography
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../hooks";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {getCommissions} from "./usecase/commissionSlice";
import {Link, useLocation} from "react-router-dom";
import {Commission} from "../../domain/commission/model/commission";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '80hv',
            marginTop: theme.spacing(5),
        },
        paper: {
            height: '80vh',
        },
        container: {
            height: '100%'
        },
    }),
);

enum ColumnType {
    id,
    requester,
    message,
    lastUpdateDate,
    price,
    dayNeed
}

interface Column {
    type: ColumnType;
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: Column[] = [
    {type: ColumnType.id, label: '委托編號', minWidth: 170},
    {type: ColumnType.requester, label: '委托人', minWidth: 100},
    {type: ColumnType.message, label: '訊息', minWidth: 170, align: 'right'},
    {type: ColumnType.price, label: '預算', minWidth: 170, align: 'right'},
    {type: ColumnType.dayNeed, label: '要求日期', minWidth: 170, align: 'right'},
    {type: ColumnType.lastUpdateDate, label: '最後更新', minWidth: 170, align: 'right'},
];

interface Props extends StandardProps<any, any> {

}

export default function Commissions(props: Props) {
    const classes = useStyles(props.className)

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const type = query.get('t')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useAppDispatch()
    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
    const getCommissionsResult = useAppSelector(state => {
        if (type === 'submitted') {
            const commissions = state.commission.submitted.ids.map(id => {
                return state.commission.byId[id]
            })
            return {
                commissions: commissions,
                offset: state.commission.submitted.offset,
                fetchCount: state.commission.submitted.fetchCount,
                total: state.commission.submitted.total,
            }
        } else if (type === 'received') {
            const commissions = state.commission.received.ids.map(id => {
                return state.commission.byId[id]
            })
            return {
                commissions: commissions,
                offset: state.commission.received.offset,
                fetchCount: state.commission.received.fetchCount,
                total: state.commission.received.total,
            }
        }
    })

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        console.log(`AAA api call page:${page},rowsPerPage${rowsPerPage}`)
        dispatch(getCommissions({
            filter: {
                count: rowsPerPage,
                offset: rowsPerPage * page
            }, sorter: {
                lastUpdateTime: true,
            }, type: type as 'submitted' | 'received'
        }))
    }, [dispatch, page, rowsPerPage, type])

    const getCellByColumnType = useCallback((type: ColumnType, commission: Commission): string => {
        switch (type) {
            case ColumnType.id:
                return commission.id
            case ColumnType.requester:
                return `${commission.requesterName}@${commission.requesterId}`
            case ColumnType.message:
                return commUseCase.getLastMessage(commission)
            case ColumnType.price:
                return `${commission.price.amount} ${commission.price.currency}`
            case ColumnType.dayNeed:
                return commission.dayNeed.toString()
            case ColumnType.lastUpdateDate:
                return commission.lastUpdateTime
            default:
                return ''
        }
    }, [commUseCase])

    return (
        <Container className={classes.root}>
            <Box display="flex">
                <Typography variant="h5">發出委托</Typography>
            </Box>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.type}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                getCommissionsResult &&
                                getCommissionsResult.commissions.map(comm => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={comm.id}>
                                            {columns.map((column) => {
                                                if (column.type === ColumnType.id) {
                                                    return (
                                                        <Link to={`commissions/${comm.id}`}>
                                                            <TableCell key={column.type} align={column.align}>
                                                                {getCellByColumnType(column.type, comm)}
                                                            </TableCell>
                                                        </Link>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={column.type} align={column.align}>
                                                            {getCellByColumnType(column.type, comm)}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={getCommissionsResult?.total ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    )
}
