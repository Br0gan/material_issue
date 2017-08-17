import React from "react";

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

      this.components = [
        {
          part_no: "3-TLA39-NH900-01",
          qty_req: 100,
          qty_iss: 100,
        },
        {
          part_no: "3-TLA30-NH900-02",
          qty_req: 80,
          qty_iss: 90,
        },
        {
          part_no: "3-TLA30-NH900-04",
          qty_req: 30,
          qty_iss: 20,
        }
      ];
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

    clearOrder(e) {
      this.setState({isFound: false});
    }

    render() {
    var order = this.state.order;
    var handleOrder = this.handleOrder.bind(this);
    var clearOrder = this.clearOrder.bind(this);
    var components = this.components;

    function enterOrder(found) {
      if (found) {
        return;
      }
      return <OrderSearch handleOrder={handleOrder}/>
    }

    function finder(x) {
      if(x) {
        return [<Barcode barcodeId={order}/>, <OrderInfo/>, <ToIssue components={components}/>, <Issued/>,];
      }
      return <OrderNotFound/>;
    }

    return (
      <div>
        {enterOrder(this.state.isFound)}
        {finder(this.state.isFound)}
      </div>
    );
  }
}
