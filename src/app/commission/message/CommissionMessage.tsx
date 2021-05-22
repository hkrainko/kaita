import {Box, Card, CardContent, createStyles, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import {ImageMessage, Message, MessageType, SystemMessage, TextMessage} from "../../../domain/message/model/message";
import {useMemo} from "react";
import moment from "moment";
import {SimpleUser} from "../../../domain/user/simple-user";

enum MessageDirectionType {
    Receive,
    Send,
    System
}

interface MessageDisplay {
    text: string | undefined
    messageDirection: MessageDirectionType
}

const displayElementFor = (message: Message, user: SimpleUser | undefined): MessageDisplay => {
    switch (message.messageType) {
        case MessageType.Text:
            return {
                text: (message as TextMessage).text,
                messageDirection: (message as TextMessage).from === user?.userId ? MessageDirectionType.Send : MessageDirectionType.Receive
            }
        case MessageType.Image:
            return {
                text: (message as ImageMessage).text,
                messageDirection: (message as ImageMessage).from === user?.userId ? MessageDirectionType.Send : MessageDirectionType.Receive,
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
            alignItems: 'center',
            display: 'flex',
            width: '100%'
        },
        userAvatar: {
            height: '10px',
            width: '10px'
        },
        userName: {
            fontsize: '6px'
        },
    }),
);

interface Props extends StandardProps<any, any> {
    user?: SimpleUser
    message: Message
}

export default function CommissionMessage({direction, message, user, ...props}: Props) {
    const classes = useStyles(props.className)

    const messageDisplay = useMemo(() => {
        return displayElementFor(message, user)
    }, [message, user])

    const renderDirection = (type: MessageDirectionType): string => {
        switch(type) {
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
            justifyContent={renderDirection(messageDisplay.messageDirection)}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="body2">
                        {messageDisplay.text}
                    </Typography>
                    <Typography variant="body2">
                        {moment(message.createTime).calendar()}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
