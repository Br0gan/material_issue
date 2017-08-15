import React from "react";

export default class Barcode extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="panel panel-primary">
          <div className="panel panel-heading text-center"><h4>Scan Barcode Being Issued</h4><h4></h4></div>
            <div className="panel-body">
              <div className="col-md-6">
                <label for="barcode_id">Barcode:</label>
                <input className="well well-sm form-control input-lg" id="barcode_id" value="123123123" type="text" />
              </div>
              <div className="col-md-6">
                <label for="scale">Scale Reading:</label>
                <p className="well text-center" id="scale"><strong>123.23</strong></p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
