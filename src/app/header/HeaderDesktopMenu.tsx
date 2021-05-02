import React, {useState} from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {AccountCircleRounded, AssignmentRounded, ViewCompactRounded} from "@material-ui/icons";
import HeaderMenuProps from "./HeaderMenuProps";

export default function HeaderDesktopMenu({authUser, onClickCommission, onClickArtist, onClickUserProfile, onClickLogout}: HeaderMenuProps) {

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
