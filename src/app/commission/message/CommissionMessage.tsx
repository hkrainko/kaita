import {Box, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import {ImageMessage, Message, MessageType, SystemMessage, TextMessage} from "../../../domain/message/model/message";
import {useCallback, useEffect, useMemo} from "react";

enum MessageDirectionType {
    Receive,
    Send,
    System
}

interface MessageDisplay {
    text: string | undefined
    messageDirection: MessageDirectionType
}

const displayElementFor = (message: Message, userId: string): MessageDisplay => {
    switch (message.messageType) {
        case MessageType.Text:
            return {
                text: (message as TextMessage).text,
                messageDirection: (message as TextMessage).from === userId ? MessageDirectionType.Send : MessageDirectionType.Receive
            }
        case MessageType.Image:
            return {
                text: (message as ImageMessage).text,
                messageDirection: (message as ImageMessage).from === userId ? MessageDirectionType.Send : MessageDirectionType.Receive,
            }
        case MessageType.System:
            return {
                text: (message as SystemMessage).text,
                messageDirection: MessageDirectionType.System,
            }
        default:
            return {
                text: '未支援此訊息',
                messageDirection: MessageDirectionType.System,
            };
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '30%',
            height: '50px',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        },
    }),
);

interface Props extends StandardProps<any, any> {
    message: Message
}

export default function CommissionMessage({direction, message, ...props}: Props) {
    const classes = useStyles(props.className)

    const messageDisplay = useMemo(() => {
        return displayElementFor(message, "123")
    }, [message])


    return (
        <div className={props.className}>
            {messageDisplay.text}
        </div>
    )
}
