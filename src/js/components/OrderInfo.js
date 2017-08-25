import React from "react";

export default class OrderInfo extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <label>Site:</label>
            <h4>{this.props.orderInfo.contract}</h4>
          </div>
          <div className="col-md-2">
            <label>Order No:</label>
            <h4>{this.props.orderInfo.orderNo}</h4>
          </div>
          <div className="col-md-4">
            <label>Part No:</label>
            <h4>{this.props.orderInfo.partNo}</h4>
          </div>
          <div className="col-md-2">
            <label>Status:</label>
            <h4>{this.props.orderInfo.state}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12"><hr/></div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label for="lot">Lot Size:</label>
            <h5 id="lot">{this.props.orderInfo.lotSize}</h5>
          </div>
          <div className="col-md-3">
            <label for="qc">Qty Complete</label>
            <h5 id="lot">{this.props.orderInfo.qtyComplete}</h5>
          </div>
          <div className="col-md-3">
            <label for="qs">Qty Scrapped:</label>
            <h5 id="lot">{this.props.orderInfo.qtyScrapped}</h5>
          </div>
          <div className="col-md-2">
            <label for="lot">Qty Remaining:</label>
            <h5 id="lot">{this.props.orderInfo.qtyRemaining}</h5>
          </div>
          <div className="row">
            <div className="col-md-12"><hr /></div>
       </div>
      </div>
    </div>
    );
  }
}
