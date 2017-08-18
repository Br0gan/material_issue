import React from "react";

export default class OrderSearch extends React.Component {
  render() {
    const handleOrder = this.props.handleOrder;

    return(
      <div className="container" id="enter_order">
        <div className="form-group">
          <label className="col-sm-2 control-label text-right">Shop Order:</label>
          <div className="col-sm-3">
            <input className="form-control input-sm" id="enter_order_no" type="text" onKeyPress={handleOrder}/>
          </div>
          <div className="col-sm-3">
            <a href="#" class="btn btn-sm btn-danger">Clear Order</a>
          </div>
        </div>
      </div>
    );
  }
}
