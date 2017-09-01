import React from "react";
import ReactDOM from "react-dom";

import "./client.css";
import Layout from "./components/Layout";
import OrderEntry from "./components/OrderEntry";
import Login from "./components/Login";
import "babel-polyfill"

const app = document.getElementById('app');
ReactDOM.render(
  <div>
    <Layout/>
  </div>
  , app)
