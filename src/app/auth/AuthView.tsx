import {Box, Button, createStyles, Grid, makeStyles, Theme, useMediaQuery} from "@material-ui/core";
import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {AuthType} from "../../domain/auth/model/auth-type";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import AuthUseCase from "../../domain/auth/auth.usecase";
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import {submitAuthCallback} from "./usecase/authSlice";
import {AuthState} from "../../domain/auth/model/auth-state";
import {UserState} from "../../domain/user/user";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

interface LocationState {
    search: string
}

export default function AuthView() {

    const authUseCase = useInjection<AuthUseCase>(TYPES.AuthUseCase)
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector((state) => state.auth)

    const location = useLocation<LocationState>()
    const history = useHistory();

    const query = new URLSearchParams(location.search)
    const authType = query.get('auth_type')
    const code = query.get('code')
    const state = query.get('state')

    if (authType && code && state && authSelector.authState === AuthState.Idle) {
        dispatch(submitAuthCallback({authType: (authType as AuthType), code, state}))
        console.log('1')
        return <></>
    } else if (authSelector.authState === AuthState.Authed) {
        console.log('2')
        switch (authSelector?.authUser?.state) {
            case UserState.Active:
                return <Redirect to='/'/>
            case UserState.Pending:
                return <Redirect to='/register'/>
            case UserState.Terminated:
                return <Redirect to='/home'/>
            default:
                break
        }
    }

    const onButtonClick = (authType: AuthType) => {
        console.log(authType)
        // dispatch(getAuthUrl(authType))
        authUseCase.getAuthUrl(authType)
            .then(r => {
                console.log(r)
                document.location.href = r
            })
    }

    return (
        <Box mt={4}>
            <Grid container justify="center" spacing={4}>
                <Grid item xs={12}>
                    <AuthButton authType={AuthType.Facebook} onClick={onButtonClick}>
                        Facebook
                    </AuthButton>
                </Grid>
                <Grid item xs={12}>
                    <AuthButton authType={AuthType.Twitter} onClick={onButtonClick}>
                        Twitter
                    </AuthButton>
                </Grid>
                <Grid item xs={12}>
                    <AuthButton authType={AuthType.Google} onClick={onButtonClick}>
                        Google
                    </AuthButton>
                </Grid>
            </Grid>
        </Box>
    )
}

const AuthButton = ({authType, onClick, children}:
                        { authType: AuthType, onClick: (authType: AuthType) => void, children: React.ReactNode }) => {
    return (
        <Button variant="contained" color="primary" onClick={() => onClick(authType)}>
            {children}
        </Button>
    )
}
