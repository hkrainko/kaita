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
import {ListChildComponentProps, ListOnScrollProps, VariableSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {AccountCircle, AssignmentOutlined, AttachFile, LinearScaleOutlined, Send} from "@material-ui/icons";
import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import {
    ImageMessage,
    Message,
    MessageType,
    SystemMessage,
    SystemMessageType,
    TextMessage
} from "../../domain/message/model/message";
import CommissionMessage, {MessageDirectionType} from "./message/CommissionMessage";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";
import {
    connectCommissionService,
    disconnectCommissionService,
    getCommission,
    getMessages,
    sendMessage
} from "./usecase/commissionSlice";
import {SimpleUser} from "../../domain/user/simple-user";
import {Commission as DomainCommission} from "../../domain/commission/model/commission";
import CommissionDetail from "./CommissionDetails";
import CommissionProgress from "./CommissionProgress";
import CommissionActionPanel from "./CommissionActionPanel";
import AppRemovableImage from "../component/AppRemovableImage";
import UserAvatar from "../component/UserAvatar";
import config from "../config";
import imgBySize, {ImageSize} from "../utils/imageUrl";


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
        textOnlyInput: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            height: theme.spacing(6),
            borderRadius: '30px',
        },
        imageInput: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            height: theme.spacing(16),
            borderRadius: '30px',
        },
        attachmentFileInput: {
            display: 'none',
        },
        attachedImage: {
            marginLeft: theme.spacing(1),
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '100px',
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

const getItemHeight = (listWidth: number, msg: Message): number => {
    switch (msg.messageType) {
        case MessageType.Text:
            let textMsg = (msg as TextMessage)
            return 100
        case MessageType.Image:
            return 160
        case MessageType.System:
            switch ((msg as SystemMessage).systemMessageType) {
                case SystemMessageType.Plain:
                    return 100
                case SystemMessageType.UploadProofCopy:
                    return 160
                case SystemMessageType.UploadProduct:
                    return 160
                case SystemMessageType.AcceptProduct:
                    return 160
                default:
                    return 160
            }
        default:
            return 100
    }
}

interface Props extends StandardProps<any, any> {

}

export default function Commission({...props}: Props) {
    const classes = useStyles(props.className)

    const location = useLocation()
    const msgListRef = useRef<VariableSizeList>(null)
    let {id} = useParams<{ id: string }>()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [attachedImage, setAttachedImage] = useState<File | null>(null)
    const [showCommDetails, setShowCommDetails] = useState<boolean>(false)
    const [showCommProgress, setShowCommProgress] = useState<boolean>(false)
    const lastTriggerScrollingMsgId = useRef<string | null>(null)
    const dispatch = useAppDispatch()
    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)
    const authUser = useAppSelector((state) => state.auth.authUser)

    const commission = useAppSelector<DomainCommission | null>(state => {
        return state.commission.byId[id]
    })
    const messages = useAppSelector(state => {
        const msgs = state.commission.messageIdsByCommissionId[id]?.map(msgId => state.commission.messageByIds[msgId]);
        if (msgs && msgs.length > 0) {
            const lastMsg = msgs[msgs.length - 1]
            if (lastMsg.messageType === MessageType.System) {
                if (lastTriggerScrollingMsgId.current !== lastMsg.id) {
                    lastTriggerScrollingMsgId.current = lastMsg.id
                    dispatch(getCommission({commId: id}))
                    msgListRef.current?.scrollTo(Number.MAX_SAFE_INTEGER)
                }
            } else if (lastMsg.messageType === MessageType.Text && (lastMsg as TextMessage).from === authUser?.userId) {
                if (lastTriggerScrollingMsgId.current !== lastMsg.id) {
                    lastTriggerScrollingMsgId.current = lastMsg.id
                    msgListRef.current?.scrollTo(Number.MAX_SAFE_INTEGER)
                }
            } else if (lastMsg.messageType === MessageType.Image && (lastMsg as ImageMessage).from === authUser?.userId) {
                if (lastTriggerScrollingMsgId.current !== lastMsg.id) {
                    lastTriggerScrollingMsgId.current = lastMsg.id
                    msgListRef.current?.scrollTo(Number.MAX_SAFE_INTEGER)
                }
            }
        }
        return msgs
    })
    useEffect(() => {
        dispatch(getCommission({commId: id}))
    }, [dispatch, id, lastTriggerScrollingMsgId])

    const [text, setText] = useState("")

    const onClickSend = useCallback(() => {
        dispatch(sendMessage({
            msgCreator: {
                commissionId: id,
                text: text.length > 0 ? text : undefined,
                image: attachedImage ?? undefined
            }
        }))
        setText("")
        setAttachedImage(null)
    }, [attachedImage, dispatch, id, text])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key !== "Enter") {
            return
        }
        dispatch(sendMessage({
            msgCreator: {
                commissionId: id,
                text: text.length > 0 ? text : undefined,
                image: attachedImage ?? undefined
            }
        }))
        setText("")
        setAttachedImage(null)
    }, [attachedImage, dispatch, id, text])

    const onScroll = useCallback((props: ListOnScrollProps) => {
        // console.log(`onScroll ${JSON.stringify(props)}`)
        // if (props.scrollOffset <= 0) {
        //     dispatch(getMessages({commId: id, count: Math.pow(2, 31) - 1, lastMessageId: undefined}))
        // }
    }, [dispatch, id])

    const renderRow = useCallback((props: ListChildComponentProps): JSX.Element => {
        const {index, style, data} = props;
        const message = data[index]

        if (!authUser || !commission) {
            return (<></>)
        }
        let user: SimpleUser | undefined
        let direction: MessageDirectionType
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
        if (message.from === authUser?.userId) {
            direction = MessageDirectionType.Send
        } else if (message.from) {
            direction = MessageDirectionType.Receive
        } else {
            direction = MessageDirectionType.System
        }

        return (
            <ListItem button style={style} key={index}>
                <CommissionMessage
                    user={user}
                    message={message}
                    direction={direction}/>
            </ListItem>
        );
    }, [authUser, commission])

    const onFileInputChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setAttachedImage(null)
            return
        }
        setAttachedImage(event.target.files[0])
    }, [])

    useEffect(() => {
        dispatch(getMessages({commId: id, count: Math.pow(2, 31) - 1, lastMessageId: undefined}))
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
                        <Link to={`/commissions?t=received`}>????????????</Link>
                    }
                    {
                        (commission && (commission?.requesterId === authUser?.userId)) &&
                        <Link to={`/commissions?t=submitted`}>????????????</Link>
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
                                {
                                    commission?.anonymous || !(commission?.requesterProfilePath)
                                        ? <AccountCircle/>
                                        : <UserAvatar size={45}
                                                      path={imgBySize(ImageSize.Small, commission.requesterProfilePath)}/>

                                }
                            </IconButton>
                            <Typography variant="h6">
                                {
                                    commission?.anonymous
                                        ? <Typography variant={"h6"}>????????????</Typography>
                                        : <Typography variant={"h6"}>{commission?.requesterName}@{commission?.requesterId}</Typography>
                                }
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
                                    return <VariableSizeList
                                        ref={msgListRef}
                                        itemSize={(index) => getItemHeight(width, messages[index])}
                                        height={height}
                                        itemCount={messages?.length}
                                        width={width}
                                        itemData={messages}
                                        initialScrollOffset={Number.MAX_SAFE_INTEGER}
                                        onScroll={onScroll}
                                    >
                                        {renderRow}
                                    </VariableSizeList>
                                }}
                            </AutoSizer> : <Typography variant={"h5"}>????????????</Typography>
                        }
                    </Box>
                    {
                        commission &&
                        <Box mx={3} mt={1}>
                            <CommissionActionPanel commission={commission}/>
                        </Box>
                    }
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                {
                                    attachedImage
                                        ? <AppRemovableImage
                                            key={0}
                                            className={classes.attachedImage}
                                            src={attachedImage}
                                            onClickDelete={() => setAttachedImage(null)}
                                        />
                                        :
                                        <Box>
                                            <input id="icon-button-file"
                                                   type="file"
                                                   accept="image/*"
                                                   className={classes.attachmentFileInput}
                                                   onChange={onFileInputChanged}
                                            />
                                            <label htmlFor="icon-button-file">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onMouseDown={handleMouseDownPassword}
                                                    component="span"
                                                >
                                                    <AttachFile/>
                                                </IconButton>
                                            </label>
                                        </Box>
                                }
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
                        className={attachedImage ? classes.imageInput : classes.textOnlyInput}
                    />
                </Paper>
            </Container>
            {
                (showCommDetails && commission) &&
                <CommissionDetail commission={commission} open={true} onClose={() => setShowCommDetails(false)}/>
            }
            {
                (showCommProgress && commission) &&
                <CommissionProgress commission={commission} open={true} onClose={() => setShowCommProgress(false)}/>
            }
        </React.Fragment>
    )
}
