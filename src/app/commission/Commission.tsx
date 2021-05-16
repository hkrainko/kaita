import {
    Breadcrumbs,
    Container,
    createStyles,
    ListItem,
    makeStyles,
    Paper,
    StandardProps,
    Theme
} from "@material-ui/core";
import {Link, useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import CommissionMessage from "./message/CommissionMessage";
import {FixedSizeList, ListChildComponentProps} from "react-window";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(5),
            height: 440,
        },
        paper: {
            height: '80vh',
            backgroundColor: 'grey'
        },
        container: {
            height: '100%'
        },
    }),
);

function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <CommissionMessage direction={'receive'}/>
        </ListItem>
    );
}


interface Props extends StandardProps<any, any> {

}

export default function Commission({...props}: Props) {
    const classes = useStyles(props.className)

    const location = useLocation()
    let {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const commission = useAppSelector(state => {
        return state.commission.byId[id]
    })

    return (
        <Container className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to={`/commissions?t=received`}>委託</Link>
                <Link to={`/commissions/${id}`}>{id}</Link>
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <FixedSizeList itemSize={10} height={400} itemCount={200} width={300}>
                    {renderRow}
                </FixedSizeList>
            </Paper>
        </Container>
    )
}
