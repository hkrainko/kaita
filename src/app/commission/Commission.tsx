import {
    AppBar,
    Box,
    Breadcrumbs,
    Container,
    createStyles,
    IconButton,
    InputAdornment,
    ListItem,
    makeStyles,
    OutlinedInput,
    Paper,
    StandardProps,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Link, useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {ListChildComponentProps, VariableSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {AccountCircle, AssignmentOutlined, AttachFile, LinearScaleOutlined, Send} from "@material-ui/icons";
import {KeyboardEvent, useCallback, useEffect, useState} from "react";
import {Message} from "../../domain/message/model/message";
import CommissionMessage from "./message/CommissionMessage";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";
import {
    connectCommissionService,
    disconnectCommissionService, getCommission, getCommissions,
    getMessages,
    sendMessage
} from "./usecase/commissionSlice";
import {User, UserState} from "../../domain/user/user";
import {SimpleUser} from "../../domain/user/simple-user";
import {Commission as DomainCommission} from "../../domain/commission/model/commission";
import {OpenCommission} from "../../domain/open-commission/model/open-commission";
import CommissionDetail from "./CommissionDetails";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '80vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(5),
            }
        },
        toolBar: {
            position: 'relative',
            boxShadow: 'none',
        },
        paper: {
            height: '100%',
            // backgroundColor: 'grey',
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            height: theme.spacing(6),
            borderRadius: '30px',
        },
        container: {
            height: '100%'
        },
        grow: {
            flexGrow: 1
        },
        progressButton: {},
    }),
);

function getItemSize(message: Message): number {
    return 20
}


interface Props extends StandardProps<any, any> {

}

export default function Commission({...props}: Props) {
    const classes = useStyles(props.className)

    const location = useLocation()
    let {id} = useParams<{ id: string }>()
    const [openDrawer, setOpenDrawer] = useState(false);
    const [showCommDetails, setShowCommDetails] = useState<boolean>(false)
    const [showCommProgress, setShowCommProgress] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
    const authUser = useAppSelector((state) => state.auth.authUser)
    const commission = useAppSelector<DomainCommission | null>(state => {
        return state.commission.byId[id]
    })
    const messages = useAppSelector(state => {
        return state.commission.messageIdsByCommissionId[id]?.map( msgId => {
            return state.commission.messageByIds[msgId]
        });
    })
    useEffect(() => {
        dispatch(getCommission({commId: id}))
    }, [dispatch, id])

    const [text, setText] = useState("")

    const onClickSend = useCallback(() => {
        dispatch(sendMessage({
            msgCreator: {
                commissionId: id,text
            }
        }))
        setText("")
    }, [dispatch, id, text])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key !== "Enter") {
            return
        }
        dispatch(sendMessage({
            msgCreator: {
                commissionId: id,text
            }
        }))
        setText("")
    }, [dispatch, id, text])

    const onClickAttachment = useCallback(() => {
    }, [])

    const renderRow = useCallback((props: ListChildComponentProps): JSX.Element => {
        const {index, style, data} = props;
        const message = data[index]

        if (!authUser || !commission) {
            return (<></>)
        }
        let user: SimpleUser | undefined
        if (message.from === commission.artistId) {
            user = {
                userId: commission.artistId,
                userName: commission.artistName,
                profilePath: commission.artistProfilePath,
            }
        } else if (message.from === commission.requesterId) {
            user = {
                userId: commission.requesterId,
                userName: commission.requesterName,
                profilePath: commission.requesterProfilePath,
            }
        }

        return (
            <ListItem button style={style} key={index}>
                <CommissionMessage
                    user={user}
                    message={message}
                    direction={'receive'}/>
            </ListItem>
        );
    }, [authUser, commission])

    useEffect(() => {
        dispatch(getMessages({commId: id, count: 10, lastMessageId: undefined}))
    }, [id, dispatch])

    useEffect(() => {
        dispatch(connectCommissionService())
        return () => {
            dispatch(disconnectCommissionService())
        }
    }, [dispatch])

    return (
        <React.Fragment>
            <Container className={classes.root} disableGutters>
                <Breadcrumbs aria-label="breadcrumb">
                    {
                        (commission && (commission.artistId === authUser?.userId)) &&
                        <Link to={`/commissions?t=received`}>接收委託</Link>
                    }
                    {
                        (commission && (commission?.requesterId === authUser?.userId)) &&
                        <Link to={`/commissions?t=submitted`}>發出委託</Link>
                    }
                    <Link to={`/commissions/${id}`}>{id}</Link>
                </Breadcrumbs>
                <Paper className={classes.paper}>
                    <AppBar color="default" className={classes.toolBar}>
                        <Toolbar>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                // aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={() => {
                                }}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Typography variant="h6">
                                Photos
                            </Typography>
                            <div className={classes.grow}/>
                            <IconButton
                                aria-label="show commission details"
                                onClick={() => setShowCommDetails(true)}
                                color="inherit">
                                <AssignmentOutlined/>
                            </IconButton>
                            <IconButton
                                aria-label="show commission progress"
                                color="inherit"
                                hidden={openDrawer}
                                onClick={() => setShowCommProgress(true)}>
                                <LinearScaleOutlined/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box height="100%">
                        {
                            messages ? <AutoSizer>
                                {({height, width}) => {
                                    return <VariableSizeList itemSize={(index) => 100} height={height} itemCount={messages?.length}
                                                             width={width} itemData={messages}>
                                        {renderRow}
                                    </VariableSizeList>
                                }}
                            </AutoSizer> : <Typography variant={"h5"}>沒有訊息</Typography>
                        }
                    </Box>
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={onClickAttachment}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    <AttachFile/>
                                </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={onClickSend}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    <Send/>
                                </IconButton>
                            </InputAdornment>
                        }
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={onKeyDown}
                        className={classes.input}
                    />
                </Paper>
            </Container>
            {
                (showCommDetails && commission) &&
                    <CommissionDetail commission={commission} open={true} onClose={() => setShowCommDetails(false)}/>
            }
        </React.Fragment>
    )
}
