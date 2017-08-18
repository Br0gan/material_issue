import React from "react";
import uuid from "uuid/v4";

export default class Issued extends React.Component {
  render() {
    var issuedItems = this.props.issuedItems.map((part) =>
          <tr key={uuid()}>
            <td>{part.part_no}</td>
            <td>{part.barcode_id}</td>
            <td>{part.lot_batch_no}</td>
            <td>{part.qty_issued}</td>
            <td>
                <input className="form-control" id="un-qty" type="Text"/>
            </td>
            <td>
                <button className="btn btn-sm btn-warning">Submit</button>
            </td>
          </tr>
    );
    return (
			<div className="container" id="issued">
				<h2>Issued Items</h2>
				<p>List of componets already issued.</p>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Barcode ID</th>
            <th>Lot Batch No</th>
            <th>Qty Issued</th>
            <th>Qty To Unissue</th>
            <th>Submit</th>
          </tr>
        </thead>
          <tbody>
            {issuedItems}
          </tbody>
          </table>
      </div>
    );
  }
}
