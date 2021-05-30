import {Box, createStyles, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import {
    AcceptProductSystemMessage,
    ImageMessage,
    Message,
    MessageType,
    SystemMessage,
    SystemMessageType,
    TextMessage, UploadProductSystemMessage, UploadProofCopySystemMessage
} from "../../../domain/message/model/message";
import React, {useMemo} from "react";
import moment from "moment";
import {SimpleUser} from "../../../domain/user/simple-user";
import AuthImage from "../../component/AuthImage";
import AuthFile from "../../component/AuthFile";

export enum MessageDirectionType {
    Receive,
    Send,
    System
}

interface MessageDisplay {
    text: string | undefined
    imagePath?: string
    filePath?: string
    rating?: number
    comment?: string
}

const displayElementFor = (message: Message, user: SimpleUser | undefined): MessageDisplay => {
    switch (message.messageType) {
        case MessageType.Text:
            return {
                text: (message as TextMessage).text
            }
        case MessageType.Image:
            return {
                text: (message as ImageMessage).text
            }
        case MessageType.System:
            switch ((message as SystemMessage).systemMessageType) {
                case SystemMessageType.UploadProofCopy:
                    const uploadProofCopySystemMessage = (message as UploadProofCopySystemMessage)
                    return {
                        text: uploadProofCopySystemMessage.text,
                        imagePath: uploadProofCopySystemMessage.imagePath
                    }
                case SystemMessageType.UploadProduct:
                    const uploadProductSystemMessage = (message as UploadProductSystemMessage)
                    return {
                        text: uploadProductSystemMessage.text,
                        filePath: uploadProductSystemMessage.filePath
                    }
                case SystemMessageType.AcceptProduct:
                    const acceptProductSystemMessage = (message as AcceptProductSystemMessage)
                    return {
                        text: acceptProductSystemMessage.text,
                        rating: acceptProductSystemMessage.rating,
                        comment: acceptProductSystemMessage.comment
                    }
                default:
                    return {
                        text: (message as SystemMessage).text
                    }
            }
        default:
            return {
                text: '未支援此訊息'
            };
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            alignItems: 'center',
            display: 'flex',
            width: '100%'
        },
        card: {
            padding: theme.spacing(0),
            margin: theme.spacing(0),
            borderRadius: theme.spacing(2),
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.grey["400"]
        },
        cardContent: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        userAvatar: {
            height: '10px',
            width: '10px'
        },
        userName: {
            fontsize: '6px'
        },
        messageImage: {
            width: '100px'
        },
        messageFile: {}
    }),
);

interface Props extends StandardProps<any, any> {
    user?: SimpleUser
    message: Message
    direction: MessageDirectionType
}

export default function CommissionMessage({user, message, direction, ...props}: Props) {
    const classes = useStyles(props.className)

    const messageDisplay = useMemo(() => {
        return displayElementFor(message, user)
    }, [message, user])

    const renderDirection = (type: MessageDirectionType): string => {
        switch (type) {
            case MessageDirectionType.Receive:
                return 'flex-start';
            case MessageDirectionType.Send:
                return 'flex-end';
            default:
                return 'center';
        }
    }

    return (
        <Box
            className={classes.root}
            justifyContent={renderDirection(direction)}>
            <div className={classes.card}>
                <div className={classes.cardContent}>
                    <Typography variant="h6">
                        {messageDisplay.text}
                    </Typography>
                    {
                        messageDisplay.imagePath &&
                        <Box className={classes.messageImage}>
                            <AuthImage
                                src={`http://192.168.64.12:31398/${messageDisplay.imagePath}`}
                            />
                        </Box>
                    }
                    {
                        messageDisplay.filePath &&
                        <Box className={classes.messageFile}>
                            <AuthFile src={`http://192.168.64.12:31398/${messageDisplay.filePath}`}/>
                        </Box>
                    }
                    {
                        messageDisplay.rating &&
                        <Typography>評分: {messageDisplay.rating}</Typography>
                    }
                    {
                        messageDisplay.comment &&
                        <Typography>評語: {messageDisplay.comment}</Typography>
                    }
                    <Typography variant="body2" align="right">
                        {moment(message.createTime).calendar()}
                    </Typography>
                </div>
            </div>
        </Box>
    )
}
