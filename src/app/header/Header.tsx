import {
    AppBar,
    createStyles,
    Divider,
    fade,
    IconButton,
    InputBase,
    makeStyles,
    Paper,
    Select,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import {useAppDispatch, useAppSelector} from "../hooks";
import {Link, useHistory, useLocation} from "react-router-dom";
import React, {ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useState} from "react";
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
        toolBar: {},
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
            position: 'absolute',
            left: '36%',
            right: '36%'
        },
        searchBox: {
            padding: '0px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 'auto',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        selectRoot: {
        },
        selectSelect: {
            paddingLeft: theme.spacing(1),
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

enum SearchType {
    // All= 'all',
    OpenCommissions = 'open-commissions',
    Artists = 'artists',
    Artworks = 'artworks'
}

export default function Header() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const auth = useAppSelector((state) => state.auth)
    const [searchText, setSearchText] = useState<string>('')
    const [searchType, setSearchType] = useState<SearchType>(SearchType.OpenCommissions)
    const [showSearchType, setShowSearchType] = useState<boolean>(false)

    const onClickSubmittedCommission = useCallback(() => {
        if (!auth.authUser) {
            return
        }
        history.push(`/commissions?t=submitted`)
    }, [auth.authUser, history])

    const onClickReceivedCommission = useCallback(() => {
        if (!auth.authUser) {
            return
        }
        history.push(`/commissions?t=received`)
    }, [auth.authUser, history])

    const onClickArtist = useCallback(() => {
        if (!auth.authUser) {
            return
        }
        history.push(`/artists/${auth.authUser.userId}`)
    }, [auth.authUser, history])

    const onClickUserProfile = useCallback(() => {
        history.push(`/account`)
    }, [history])

    const onClickLogout = useCallback(() => {
        dispatch(logout())
        history.push('')
    }, [dispatch, history])

    const isInArtistPage = useCallback((): boolean => {
        return location.pathname.indexOf('/artists') !== -1
    }, [location.pathname])

    const onClickSearch = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        history.push(`/search?t=${searchType}&s=${searchText}`)
        event.stopPropagation()
    }, [history, searchText, searchType])

    const onSearchKeyDown = useCallback((event: KeyboardEvent) => {
        console.log(`event:${event.key}`)
        if (event.key !== 'enter') {
            return
        }
        history.push(`/search?t=${searchType}&s=${searchText}`)
    }, [history, searchText, searchType])

    const onSearchInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchText(event.target.value)
    }, [])

    console.log(`pathname:${location.pathname}`)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={isInArtistPage() ? classes.artistPageToolBar : classes.toolBar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to={`/`}>
                            {`Kaita`}
                        </Link>
                    </Typography>
                    <div className={classes.halfGrow}/>
                    <div className={classes.search}>
                        <Paper component="form" className={classes.searchBox}>
                            {
                                showSearchType &&
                                    <React.Fragment>
                                        <Select
                                            native
                                            value={searchType}
                                            disableUnderline
                                            onChange={event => setSearchType(event.target.value as SearchType)}
                                            classes={{
                                                root: classes.selectRoot,
                                                select: classes.selectSelect
                                            }}
                                        >
                                            <option value={SearchType.OpenCommissions}>開放委托</option>
                                            <option value={SearchType.Artists}>繪師</option>
                                            <option value={SearchType.Artworks}>作品</option>
                                        </Select>
                                        <Divider className={classes.divider} orientation="vertical" />
                                    </React.Fragment>
                            }
                            <InputBase
                                className={classes.input}
                                placeholder=""
                                onChange={onSearchInputChange}
                                onKeyDown={onSearchKeyDown}
                                onFocus={() => setShowSearchType(true)}
                            />
                            <IconButton
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={onClickSearch}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                    <div className={classes.grow}/>
                    {auth.authState === AuthState.Authed && auth.authUser
                        ? <HeaderDesktopMenu
                            authUser={auth.authUser}
                            onClickSubmittedCommission={onClickSubmittedCommission}
                            onClickReceivedCommission={onClickReceivedCommission}
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
