import React from "react";
import axios from "axios"
import Loading from 'react-loading-overlay';

export default class Issued extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isActive: false}
  }
  handleQty(e) {
    var id = e.target.id
    this.setState({[id]: e.target.value})
  }

  handleSubmit(e) {
    var id = e.target.id
    if (!this.state[id] || this.state[id] == 0) {
      return
    }
    console.log(this.state[id])
    this.setState({isActive: true})
    axios.post('/api/unissuemats', {
      user_id: this.props.userId,
      contract: 'STA',
      order_no: this.props.orderNo,
      barcode_id: id,
      qty_unissued: this.state[id]
    })
    .then((res) => {
      if (res.data.status) {
        var e = {
            which: 13,
            target: {
              value: this.props.orderNo,
            },
          }
          this.props.handleOrder(e)
        this.props.showAlert(name + ': successfully unissed!', 'success', 3000)
      } else {
        this.props.showAlert(res.data.error, 'error', 0) 
      }
        document.getElementById(id).value = '';
        this.setState({[id]: "", isActive: false})
    })
  }

  render() {
    var issuedItems = this.props.issuedItems.map((part) =>
          <tr key={part.lot_batch_no}>
            <td>{part.part_no}</td>
            <td>{part.barcode_id}</td>
            <td>{part.lot_batch_no}</td>
            <td>{part.qty_issued}</td>
            <td>
                <input className="form-control un-qty" id={(part.barcode_id != 'No Barcode') ? part.barcode_id : part.lot_batch_no} type="number" onChange={this.handleQty.bind(this)}/>
            </td>
            <td>
                <button className="btn btn-sm btn-warning" id={(part.barcode_id != 'No Barcode') ? part.barcode_id : part.lot_batch_no} onClick={this.handleSubmit.bind(this)}>Submit</button>
            </td>
          </tr>
    );
    return (
      <div>
        <div className="container" id="issued">
          <h2>Issued Items</h2>
          <p>List of componets already issued.</p>
            <Loading
              active={this.state.isActive}
              spinner
              text='Processing..'
              color='grey'
              background='clear'>
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
          </Loading>
        </div>
      </div>
    );
  }
}
