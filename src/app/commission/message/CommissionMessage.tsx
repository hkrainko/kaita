import {Box, createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '30%'
        },
    }),
);

interface Props extends StandardProps<any, any> {
    direction: 'send' | 'receive' | 'system'
}

export default function CommissionMessage({direction, ...props}: Props) {
    const classes = useStyles(props.className)


    return (
        <Box className={classes.root}>
            Message
        </Box>
    )
}
