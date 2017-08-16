import React from "react";
import "../client.css"

export default class ToIssue extends React.Component {
  render() {
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
          <tr className="success">
            <td>3-TLA39-NH900-01</td>
            <td>100</td>
            <td>100</td>
            <td>0</td>
          </tr>
          <tr>
            <td>3-TLA39-NH900-02</td>
            <td>100</td>
            <td>20</td>
            <td>80</td>
          </tr>
          <tr>
            <td>3-TLA39-NH900-03</td>
            <td>100</td>
            <td>20</td>
            <td>80</td>
          </tr>
        </tbody>
        </table>
        <div className="row">
          <div className="col-md-12"><hr /></div>
        </div>
      </div>
    )
  }
}
