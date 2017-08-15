import React from "react";
import ReactDOM from "react-dom";

import "./client.css";
import Barcode from "./components/Barcode";
import Issued from "./components/Issued";
import Layout from "./components/Layout";
import OrderEntry from "./components/OrderEntry";
import OrderInfo from "./components/OrderInfo";
import ToIssue from "./components/ToIssue";

const app = document.getElementById('app');
ReactDOM.render(
  <div>
    <Layout/>
    <OrderEntry/>
    <Barcode/>
    <OrderInfo/>
    <ToIssue/>
    <Issued/>
  </div>
  , app)
