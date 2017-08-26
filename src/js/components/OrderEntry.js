import React from "react";
import uuid from "uuid/v4";
import axios from "axios";

import Barcode from "./Barcode";
import OrderInfo from "./OrderInfo";
import OrderNotFound from "./OrderNotFound";
import OrderSearch from "./OrderSearch";
import ToIssue from "./ToIssue";
import Issued from "./Issued";

export default class OrderEntry extends React.Component {
    constructor() {
      super();
      this.state = {
        isFound: false,
      }
    }
    
    handleOrder(e) {
      if (e.which === 13) {
        const orderNo = e.target.value;
        axios({
          baseURL: 'http://localhost:3000/orderinfo',
          method: 'post',
          data: {
            id: this.props.userId,
            pass: this.props.pass,
            order_no: orderNo,
            contract: 'STA'
          },
          transformRequest: (data) => JSON.stringify(data) 
        })
          .then((res) => {
            this.orderInfo = {
              orderNo: res.data.order_no,
              partNo: res.data.part_no,
              contract: res.data.contract,
              lotSize: res.data.lot_size,
              qtyComplete: res.data.qty_complete,
              qtyScrapped: res.data.qty_scrapped,
              qtyRemaining: res.data.qty_remaining,
              state: res.data.state
            };
            
            axios({
                baseURL: 'http://localhost:3000/components',
                method: 'post',
                data: {
                  id: this.props.userId,
                  pass: this.props.pass,
                  order_no: orderNo,
                  contract: 'STA'
                },
                transformRequest: (data) => JSON.stringify(data) 
              })
                .then((res) => {
                  this.components = res.data;
                  this.setState({isFound:true})
                });
        });
        axios({
          baseURL: 'http://localhost:3000/issued',
          method: 'post',
          data: {
            id: this.props.userId,
            pass: this.props.pass,
            order_no: orderNo,
            contract: 'STA'
          },
          transformRequest: (data) => JSON.stringify(data)
        })
          .then((res) => {
            console.log(res.data)
            this.issuedItems = res.data;
            this.setState({isFound: true});
          });
      }
    }

    clearOrder(e) {
      this.setState({
        isFound: false,
        order: ""
      });
    }

    render() {
    var order = this.state.order;
    var handleOrder = this.handleOrder.bind(this);
    var clearOrder = this.clearOrder.bind(this);
    var components = this.components;
    var issuedItems = this.issuedItems;
    var orderInfo = this.orderInfo;

    function finder(x) {
      if(x) {
        return [
          <Barcode key={uuid()} barcodeId={order}/>,
          <OrderInfo key={uuid()} orderInfo={orderInfo}/>,
          <ToIssue key={uuid()} components={components}/>,
          <Issued key={uuid()} issuedItems={issuedItems}/>
      ];
      }
      return <OrderNotFound/>;
    }

    return (
      <div>
        <OrderSearch handleOrder={handleOrder} clearOrder={clearOrder} barcodeId={order} found={this.state.isFound}/>
        {finder(this.state.isFound)}
      </div>
    );
  }
}
