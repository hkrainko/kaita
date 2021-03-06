import React, {useEffect} from 'react';
import './App.css';
import Header from "./app/header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./app/home/Home";
import AuthView from "./app/auth/AuthView";
import Artist from "./app/artist/Artist";
import {Snackbar} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {dismissErrorAlert} from "./app/error/usecase/errorSlice";
import Loading from "./app/loading/Loading";
import RegisterView from "./app/register/RegisterView";
import RegisterForm from "./app/register/register-form/RegisterForm";
import applyHttpInterceptors from "./app/error/httpInterceptors";
import Commissions from "./app/commission/Commissions";
import Commission from "./app/commission/Commission";
import Artwork from "./app/artwork/Artwork";
import Search from "./app/search/Search";
import Account from "./app/account/Account";
import {getAuthUser} from "./app/auth-user/usecase/authUserSlice";


function App() {

    const dispatch = useAppDispatch();
    const errorSelector = useAppSelector((state) => state.error)
    const loadingSelector = useAppSelector((state) => state.loading)
    const isLoggedIn = useAppSelector((state) => state.auth.authUser !== null)

    const handleCloseAlert = () => {
        dispatch(dismissErrorAlert())
    }

    useEffect(() => {
        applyHttpInterceptors()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getAuthUser())
        }
    }, [dispatch, isLoggedIn])

    return (
        <div className="App">
            <BrowserRouter>
                {loadingSelector.loading && <Loading/>}
                <Header/>
                <Switch>
                    <Route path="/auth" component={AuthView}/>
                    <Route exact path="/register" component={RegisterView}/>
                    <Route path="/register/form" component={RegisterForm}/>
                    <Route path="/artists/:id" component={Artist}/>
                    <Route exact path="/commissions" component={Commissions}/>
                    <Route path="/commissions/:id" component={Commission}/>
                    <Route path="/artworks/:id" component={Artwork}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/account" component={Account}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="*" component={Home}/>
                </Switch>
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
