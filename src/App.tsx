import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./app/header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./app/home/Home";
import Auth from "./app/auth/Auth";
import Artist from "./app/artist/Artist";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/auth">
                        <Auth/>
                    </Route>
                    <Route exact path="/artists/:id" component={Artist}>

                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
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
