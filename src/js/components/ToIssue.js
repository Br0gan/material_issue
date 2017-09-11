import React from "react";
import "../client.css"

export default class ToIssue extends React.Component {
  render() {

    const { components } = this.props;

    function getIssuedStatus(x) {
      if (x === 0) {
        return 'success';
      }
      if (x < 0) {
        return 'danger';
      }
      return;
    }

    function renderComponents(part) {
      return (
        <tr key={part.part_no} className={getIssuedStatus((part.qty_remaining))}>
          <td>{part.part_no}</td>
          <td>{part.qty_required}</td>
          <td>{part.qty_issued}</td>
          <td>{part.qty_remaining}</td>
        </tr>
      )};
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
          {components.map(renderComponents)}
        </tbody>
        </table>
        <div className="row">
          <div className="col-md-12"><hr /></div>
        </div>
      </div>
    )
  }
}
