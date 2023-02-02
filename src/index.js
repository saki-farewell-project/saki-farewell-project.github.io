import React from "react";
import ReactDOM from "react-dom";

import { StrictMode } from "react";
import { NavbarDropdown } from "./modules/navbar";
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./pages";
import Debug from "./pages/debug";
import FanMsgs from "./pages/fan_msgs";
import FanArt from "./pages/fanart";
import Credit from "./pages/credit";

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
                    <Route exact path='/fanart' element={<FanArt />} />
                    <Route exact path='/fan-msgs' element={<FanMsgs />} />
                    <Route exact path='/credit' element={<Credit />} />
                    <Route exact path='/debug' element={<Debug />} />
                </Routes>
        </Router>
    );

    return router;
}