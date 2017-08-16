import React from "react";
import ReactDOM from "react-dom";

import "./client.css";
import Layout from "./components/Layout";
import OrderEntry from "./components/OrderEntry";

const app = document.getElementById('app');
ReactDOM.render(
  <div>
    <Layout/>
    <OrderEntry/>
  </div>
  , app)
