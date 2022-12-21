import React from "react";
import ReactDOM from "react-dom";

import { StrictMode } from "react";
import { NavbarDropdown } from "./modules/navbar";
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./pages";
import FanMsgs from "./pages/fan_msgs";

var rootElement = document.getElementById("root");
rootElement.style.overflow = "hidden";

ReactDOM.render
(
    <StrictMode>
        <App/>
    </StrictMode>,
    rootElement
);


function App()
{
    document.body.style.backgroundColor = "black";
    document.body.style.margin = 0;
    const router = (
        <Router>
            <NavbarDropdown/>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/fan-msgs' element={<FanMsgs />} />
                </Routes>
        </Router>
    );

    return router;
}