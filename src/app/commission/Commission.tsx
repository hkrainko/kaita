import {
    AppBar,
    Badge,
    Breadcrumbs,
    Container,
    createStyles,
    IconButton,
    ListItem,
    makeStyles,
    Paper,
    StandardProps,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Link, useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import CommissionMessage from "./message/CommissionMessage";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {AccountCircle, AssignmentOutlined, PlaylistAddCheckOutlined} from "@material-ui/icons";
import {useState} from "react";

const drawerWidth = 240;

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
        paper: {
            height: '100%',
            backgroundColor: 'grey',
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

function renderRow(props: ListChildComponentProps) {
    const {index, style} = props;

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
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useAppDispatch()
    const commission = useAppSelector(state => {
        return state.commission.byId[id]
    })

    return (
        <Container className={classes.root} disableGutters>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to={`/commissions?t=received`}>委託</Link>
                <Link to={`/commissions/${id}`}>{id}</Link>
            </Breadcrumbs>
            <AppBar position="relative" color="default">
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
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <AssignmentOutlined/>
                    </IconButton>
                    <IconButton
                        aria-label="show 17 new notifications"
                        color="inherit"
                        hidden={openDrawer}
                        onClick={() => setOpenDrawer(true)}>
                        <Badge badgeContent={17} color="secondary">
                            <PlaylistAddCheckOutlined/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Paper className={classes.paper}>
                <AutoSizer>
                    {({height, width}) => {
                        console.log(`AAA: height:${height} width:${width}`)
                        return <FixedSizeList itemSize={10} height={height} itemCount={200} width={width}>
                            {renderRow}
                        </FixedSizeList>
                    }}
                </AutoSizer>
            </Paper>
        </Container>

    )
}
