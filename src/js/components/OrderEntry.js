import React from "react";
import axios from "axios";

import Barcode from "./Barcode";
import OrderInfo from "./OrderInfo";
import OrderNotFound from "./OrderNotFound";
import OrderSearch from "./OrderSearch";
import ToIssue from "./ToIssue";
import Issued from "./Issued";

function aysncReq(url, data) {
  return axios.post(url, data)
}
export default class OrderEntry extends React.Component {
    constructor() {
      super();
      this.state = {
        isFound: false,
        orderNo: ""
      }
  }

  handleOrder(e) {
      if (e.which === 13) {
        const orderNo = e.target.value;
        const noOrderMsg = 'No order found for: ' + orderNo;
        if (orderNo == "") {
          return
        }
        const data = {order_no: orderNo, user_id: this.props.userId}
        axios.post('/api/orderinfo', data)
          .then((res) => {
            if (!res.data.status) {
              this.props.showAlert(noOrderMsg, 'info', 3000)
              this.setState({isFound: false})
              return
            }

            if (res.data.payload.state === 'Closed') {
              this.props.showAlert('Shop Order: ' + res.data.payload.order_no + ' is currently Closed', 'info', 3000)
              this.setState({isFound: false})
              return
            }

            this.setState({orderNo: orderNo})
            this.orderInfo = {
              orderNo: res.data.payload.order_no,
              partNo: res.data.payload.part_no,
              contract: res.data.payload.contract,
              lotSize: res.data.payload.lot_size,
              qtyComplete: res.data.payload.qty_complete,
              qtyScrapped: res.data.payload.qty_scrapped,
              qtyRemaining: res.data.payload.qty_remaining,
              state: res.data.payload.state
            };
            axios.all([aysncReq('/api/components', data), aysncReq('/api/issued', data)])
              .then(axios.spread((comps, issued) => {
                this.components = comps.data.data
                this.issuedItems = issued.data.data
                this.setState({isFound: true})
              }));
            });
      }
    }

    handleOrderNo(e) {
      this.setState({orderNo: e.target.value});
    };

    clearOrder(e) {
      this.setState({
        isFound: false,
        orderNo: ""
      });
      document.getElementById("enterOrder").focus();
    }

    render() {
    var orderNo = this.state.orderNo;
    var userId = this.props.userId;
    var handleOrder = this.handleOrder.bind(this);
    var clearOrder = this.clearOrder.bind(this);
    var handleOrderNo = this.handleOrderNo.bind(this);
    var components = this.components;
    var issuedItems = this.issuedItems;
    var orderInfo = this.orderInfo;
    var showAlert = this.props.showAlert;


    function finder(x) {
      if(x) {
        return [
          <Barcode key="4" handleOrder={handleOrder} orderNo={orderNo} userId={userId} showAlert={showAlert}/>,
          (orderInfo) ? <OrderInfo key="1" orderInfo={orderInfo}/> : "",
          (components) ? <ToIssue key="2" components={components}/> : "",
          (issuedItems) ? <Issued key="3" userId={userId} orderNo={orderNo} issuedItems={issuedItems} handleOrder={handleOrder} showAlert={showAlert}/> : ""
        ];
      }
      return <OrderNotFound/>;
    }

    return (
      <div>
        <OrderSearch key="1" handleOrder={handleOrder} clearOrder={clearOrder} handleOrderNo={handleOrderNo} orderNo={orderNo} found={this.state.isFound}/>
        {finder(this.state.isFound)}
      </div>
    );
  }
}
