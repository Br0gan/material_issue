import React from "react";

export default class Issued extends React.Component {
  render() {
    return (
			<div className="container" id="issued">
				<h2>Issued Items</h2>
				<p>List of componets already issued.</p>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Barcode ID</th>
            <th>Qty Issued</th>
            <th>Qty To Unissue</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3-TLA39-NH900-01</td>
            <td>12345</td>
            <td>80</td>
            <td>
                <input className="form-control" id="un-qty" type="Text"/>
            </td>
            <td>
                <button className="btn btn-warning">Submit</button>
            </td>
          </tr>
          <tr>
            <td>3-TLA39-NH900-01</td>
            <td>12345</td>
            <td>80</td>
            <td>
                <input className="form-control" id="un-qty" type="Text"/>
            </td>
            <td>
                <button className="btn btn-warning">Submit</button>
            </td>
          </tr>
          <tr>
            <td>3-TLA39-NH900-01</td>
            <td>12345</td>
            <td>80</td>
            <td>
                <input className="form-control" id="un-qty" type="Text"/>
            </td>
            <td>
                <button className="btn btn-warning">Submit</button>
            </td>
          </tr>
          </tbody>
          </table>
      </div>
    );
  }
}
