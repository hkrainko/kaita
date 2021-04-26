import {Box, Button, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {useAppDispatch} from "../hooks";
import {AuthType} from "../../domain/auth/auth-type";
import {useInjection} from "../../iocReact";
import {TYPES} from "../../types";
import AuthUseCase from "../../domain/auth/auth.usecase";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


export default function Auth() {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const authUseCase = useInjection<AuthUseCase>(TYPES.AuthUseCase)

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
