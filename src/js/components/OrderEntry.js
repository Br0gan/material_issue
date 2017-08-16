import React from "react";

import Barcode from "./Barcode";
import OrderInfo from "./OrderInfo";
import OrderNotFound from "./OrderNotFound";
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
      const orderNo = e.target.value;
      this.setState({order: orderNo});
      if (orderNo.length > 5) {
        this.setState({isFound: true});
        return;
      }
        this.setState({isFound: false});
    }

    render() {
    var order = this.state.order;
    function finder(x) {
      if(x) {
        return [<Barcode barcodeId={order}/>, <ToIssue/>, <Issued/>,];
      }
      return <OrderNotFound/>;
    }
    console.log();
    return (
      <div>
      <div className="container" id="enter_order">
        <div className="form-group">
          <label className="col-sm-2 control-label text-right">Shop Order:</label>
          <div className="col-sm-3">
            <input className="form-control input-sm" id="enter_order_no" type="text" onChange={this.handleOrder.bind(this)}/>
          </div>
        </div>
      </div>
      {finder(this.state.isFound)}
      </div>
    );
  }
}
