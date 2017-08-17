import React from "react";
import "../client.css"
import uuid from "uuid/v4";

export default class ToIssue extends React.Component {
  render() {
   var components = this.props.components.map((part) =>
        <tr key={uuid()} className={getIssuedStatus((part.qty_req - part.qty_iss))}>
          <td>{part.part_no}</td>
          <td>{part.qty_req}</td>
          <td>{part.qty_iss}</td>
          <td>{part.qty_req - part.qty_iss}</td>
        </tr>

    );
    function getIssuedStatus(x) {
      if (x === 0) {
        return 'success';
      }
      if (x < 0) {
        return 'danger';
      }
      return;
    }

    return (
      <div className="container" id="toIssue">
        <h2>Components</h2>
        <p>List of componets to issue.</p>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Qty Required</th>
            <th>Qty Issued</th>
            <th>Qty Remaining</th>
          </tr>
        </thead>
        <tbody>
          {components}
        </tbody>
        </table>
        <div className="row">
          <div className="col-md-12"><hr /></div>
        </div>
      </div>
    )
  }
}
