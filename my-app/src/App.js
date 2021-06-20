import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import About from "./components/About"
import Calculator from "./components/Calculator"
import Product from "./components/Home"

class App extends React.Component {



    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-sm navMain">
                        <ul className="navbar-nav">
                            <li className="nav-item active myNav">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="nav-item myNav">
                                <Link to="/cal">Price Calculator</Link>
                            </li>
                            <li className="nav-item myNav">
                                <Link to="/about">About Us</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/cal">
                            <Calculator />
                        </Route>
                        <Route path="/">
                            <Product />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );

    };
}

export default App;

