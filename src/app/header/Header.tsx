import {
    AppBar,
    createStyles,
    fade,
    IconButton,
    InputBase,
    makeStyles, Menu, MenuItem,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import {useAppDispatch, useAppSelector} from "../hooks";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import {
    AccountCircleRounded,
    AssignmentRounded,
    ViewCompactRounded
} from "@material-ui/icons";
import {AuthUser} from "../../domain/auth-user/auth-user";
import {AuthState} from "../../domain/auth/model/auth-state";
import {logout} from "../auth/usecase/authSlice";

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
        menuButton: {
            marginRight: theme.spacing(2),
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

    const auth = useAppSelector((state) => state.auth)

    const onClickCommission = () => {

    }

    const onClickArtist = () => {

    }

    const onClickUserProfile = () => {

    }

    const onClickLogout = () => {
        dispatch(logout())
        history.push('')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>
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
                        ? <UserProfileButton
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

interface UserProfileProps {
    authUser: AuthUser,
    onClickCommission: () => void,
    onClickArtist: () => void,
    onClickUserProfile: () => void,
    onClickLogout: () => void,
}

function UserProfileButton({authUser, onClickCommission, onClickArtist, onClickUserProfile, onClickLogout}: UserProfileProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleCommission = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        onClickCommission()
    };

    const handleArtist = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        onClickArtist()
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickUserProfile = () => {
        setAnchorEl(null);
        onClickUserProfile()
    }

    const handleClickLogout = () => {
        setAnchorEl(null);
        onClickLogout()
    }

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleCommission}
                color="inherit"
            >
                <AssignmentRounded />
            </IconButton>
            {authUser.isArtist &&
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleArtist}
                color="inherit"
            >
                <ViewCompactRounded />
            </IconButton>
            }
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircleRounded />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClickUserProfile}>用戶資料</MenuItem>
                <MenuItem onClick={handleClickLogout}>登出</MenuItem>
            </Menu>
        </div>
    )
}
