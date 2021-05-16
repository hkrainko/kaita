import {AppBar, createStyles, fade, InputBase, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import {useAppDispatch, useAppSelector} from "../hooks";
import {Link, useHistory, useLocation} from "react-router-dom";
import React from "react";
import {AuthState} from "../../domain/auth/model/auth-state";
import {logout} from "../auth/usecase/authSlice";
import HeaderDesktopMenu from "./HeaderDesktopMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        grow: {
            flexGrow: 1,
        },
        halfGrow: {
            flexGrow: 0.5,
        },
        toolBar: {

        },
        artistPageToolBar: {
            // backgroundColor: 'white'
        },
        title: {
            // flexGrow: 0,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '40ch',
                // '&:focus': {
                //     width: '20ch',
                // },
            },
        },
    }),
);

export default function Header() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const auth = useAppSelector((state) => state.auth)

    const onClickCommission = () => {
        if (!auth.authUser) {
            return
        }
        history.push(`/commissions?t=received`)
    }

    const onClickArtist = () => {
        if (!auth.authUser) {
            return
        }
        history.push(`/artists/${auth.authUser.userId}`)
    }

    const onClickUserProfile = () => {

    }

    const onClickLogout = () => {
        dispatch(logout())
        history.push('')
    }

    const isInArtistPage = (): boolean => {
        return location.pathname.indexOf('/artists') !== -1
    }

    console.log(`pathname:${location.pathname}`)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={isInArtistPage()? classes.artistPageToolBar : classes.toolBar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to={`/`}>
                            {`Kaita`}
                        </Link>
                    </Typography>
                    <div className={classes.halfGrow}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div className={classes.grow}/>
                    {auth.authState === AuthState.Authed && auth.authUser
                        ? <HeaderDesktopMenu
                            authUser={auth.authUser}
                            onClickCommission={onClickCommission}
                            onClickArtist={onClickArtist}
                            onClickUserProfile={onClickUserProfile}
                            onClickLogout={onClickLogout}
                        />
                        : <Link to={`/auth`}>註冊/登入</Link>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
