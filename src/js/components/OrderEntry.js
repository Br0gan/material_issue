import React from "react";

export default class OrderEntry extends React.Component {

  render() {
    return (
      <div className="container" id="enter_order">
        <div className="form-group">
          <label className="col-sm-2 control-label text-right">Shop Order:</label>
          <div className="col-sm-3">
            <input className="form-control input-sm" id="enter_order_no" type="text" value="Enter Shop Order..."/>
          </div>
        </div>
      </div>
    );
  }
}
