import {Commission} from "../../domain/commission/model/commission";
import {Box, Button, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {useInjection} from "../../iocReact";
import {CommissionUseCase} from "../../domain/commission/commission.usecase";
import {TYPES} from "../../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: theme.palette.grey["400"],
            width: '100%',
            borderStyle: 'solid',
        },
    }),
);

interface Props {
    commission: Commission
}

export default function CommissionActionPanel(props: Props) {
    const classes = useStyles();

    const commUseCase = useInjection<CommissionUseCase>(TYPES.CommissionUseCase)



    return (
        <Box className={classes.root}>
            <Box py={{xs: 1, md: 1}} px={{xs: 2, md: 3}} alignItems="center" display="flex" justifyContent="flex-around">
                <Box marginRight={5}>
                    <Typography>等待接受委托。</Typography>
                </Box>
                <Button color="inherit" size="medium">
                    取消
                </Button>
                <Button color="inherit" size="medium">
                    確定
                </Button>
            </Box>
        </Box>
    )
}
