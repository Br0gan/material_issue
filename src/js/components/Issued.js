import React from "react";
import axios from "axios"

export default class Issued extends React.Component {
  constructor(props) {
    super(props)
  }
  handleQty(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    var name = e.target.name
    axios({
      url: '/unissuemats',
      method: 'post',
      data: {
        user_id: this.props.userId,
        contract: 'STA',
        order_no: this.props.orderNo,
        barcode_id: e.target.name,
        qty_unissued: this.state[e.target.name]
      }
    }).then((res) => {
      document.getElementById("un-qty").value = "";
      var e = {
          which: 13,
          target: {
            value: this.props.orderNo,
          },
        }
        this.props.handleOrder(e)
    })
  }

  render() {
    var issuedItems = this.props.issuedItems.map((part) =>
          <tr key={part.barcode_id}>
            <td>{part.part_no}</td>
            <td>{part.barcode_id}</td>
            <td>{part.lot_batch_no}</td>
            <td>{part.qty_issued}</td>
            <td>
                <input className="form-control" id="un-qty" name={part.barcode_id} type="number" onChange={this.handleQty.bind(this)}/>
            </td>
            <td>
                <button className="btn btn-sm btn-warning" name={part.barcode_id} onClick={this.handleSubmit.bind(this)}>Submit</button>
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
