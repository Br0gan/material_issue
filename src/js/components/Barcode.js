import React from "react";

export default class Barcode extends React.Component {
  render() {

    var barcodeId = this.props.barcodeId;

    return(
      <div className="container">
        <div className="panel panel-primary">
          <div className="panel panel-heading text-center"><p id="heading-title">Enter Barcode Being Issued</p></div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-6">
                <label for="barcode_id">Barcode:</label>
                <input className="well well-sm form-control input-lg" id="barcode_id" value={barcodeId} type="text"/>
              </div>
              <div className="col-md-6">
                <label for="scale">Scale Reading:</label>
                <p className="well text-center" id="scale"><strong>{barcodeId}</strong><small>kg</small></p>
              </div>
            </div>
            <div>
              <a href="#" id="issue" className="btn btn-info btn-block">ISSUE AMOUNT</a> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
