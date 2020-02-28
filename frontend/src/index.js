import App from "./components/App";
import React from "react";
import ReactDOM, {render} from "react-dom";


const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App/>, wrapper) : null;