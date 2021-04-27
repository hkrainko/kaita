import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./app/header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./app/home/Home";
import AuthView from "./app/auth/AuthView";
import Artist from "./app/artist/Artist";
import {Button, Snackbar} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {dismissErrorAlert, showErrorAlert} from "./app/error/usecase/errorSlice";
import {UserTerminatedError} from "./domain/error/model/user-error";
import Loading from "./app/loading/Loading";
import RegisterView from "./app/register/RegisterView";
import RegisterForm from "./app/auth/register-form/RegisterForm";


function App() {

    const dispatch = useAppDispatch();
    const errorSelector = useAppSelector((state) => state.error)
    const loadingSelector = useAppSelector((state) => state.loading)

    const handleCloseAlert = () => {
        dispatch(dismissErrorAlert())
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                {loadingSelector.loading && <Loading/>}
                <Switch>
                    <Route path="/auth" component={AuthView}/>
                    <Route exact path="/register" component={RegisterView}/>
                    <Route path="/register/form" component={RegisterForm}/>
                    <Route exact path="/artists/:id" component={Artist}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
                <Button onClick={() => {dispatch(showErrorAlert(new UserTerminatedError()))}}>Show Alert</Button>
            </BrowserRouter>
            <Snackbar
                open={errorSelector.message != null}
                message={errorSelector.message}
                onClose={handleCloseAlert}
                autoHideDuration={5000}
            />
            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*    <Button variant="contained">Default</Button>*/}
            {/*    <p>*/}
            {/*        Edit <code>src/App.tsx</code> and save to reload.*/}
            {/*    </p>*/}
            {/*    <a*/}
            {/*        className="App-link"*/}
            {/*        href="https://reactjs.org"*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*    >*/}
            {/*        Learn React*/}
            {/*    </a>*/}
            {/*</header>*/}
        </div>
    );
}

export default App;
