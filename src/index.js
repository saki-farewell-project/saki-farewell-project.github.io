import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import About from './pages/about';
import { NavbarDropdown } from "./modules/navbar";

import Home from "./pages";
import { merge } from "./utils";
import Contact from "./pages/contact";
import FanMsgs from "./pages/fan_msgs";

var rootElement = document.getElementById("root");
rootElement.style.overflow = "hidden";
//rootElement.style.backgroundColor = "black";

ReactDOM.render(
    <StrictMode>
        <App/>
    </StrictMode>,
    rootElement
);




function App() {
    document.body.style.backgroundColor = "black";

    //const pages = merge(prevPages.get(0), prevPages.get(1));
    const router = (
        <Router>
            <NavbarDropdown/>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/about' element={<About/>} />
                    <Route exact path='/fan-msgs' element={<FanMsgs />} />
                </Routes>
        </Router>
    );

    return router;
}