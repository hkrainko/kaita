import {Box, Card, CardContent, createStyles, makeStyles, StandardProps, Theme, Typography} from "@material-ui/core";
import {ImageMessage, Message, MessageType, SystemMessage, TextMessage} from "../../../domain/message/model/message";
import {useMemo} from "react";
import moment from "moment";
import {SimpleUser} from "../../../domain/user/simple-user";

export enum MessageDirectionType {
    Receive,
    Send,
    System
}

interface MessageDisplay {
    text: string | undefined
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
            return {
                text: (message as SystemMessage).text
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
            margin: theme.spacing(0)
        },
        cardContent: {
            padding: theme.spacing(2),
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
    direction: MessageDirectionType
}

export default function CommissionMessage({user, message, direction, ...props}: Props) {
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
            justifyContent={renderDirection(direction)}>
            <Card variant="outlined" className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6">
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
