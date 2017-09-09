import React from "react";
import axios from "axios"
import Loading from 'react-loading-overlay';

export default class Issued extends React.Component {
  constructor(props) {
    super(props);
    const { orderNo, userId, handleOrder, showAlert } = this.props;
    this.state = {isActive: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handQty = this.handleQty.bind(this);
  }
  handleQty(e) {
    var id = e.target.id;
    this.setState({[id]: e.target.value});
  }

  handleSubmit(e) {
    var id = e.target.id;
    var qtyUnissued = this.state[id];
    if (!qtyUnissued || qtyUnissued == 0) {
      return
    };
    this.setState({isActive: true});
    axios.post('/api/unissuemats', {
      user_id: userId,
      order_no: orderNo,
      barcode_id: id,
      qty_unissued: qtyUnissued
    })
    .then((res) => {
      if (res.data.status) {
        var e = {
            which: 13,
            target: {
              value: orderNo,
            },
          };
          handleOrder(e);
        showAlert(name + ': successfully unissed!', 'success', 3000);
      } else {
        showAlert(res.data.error, 'error', 0);
      }
        document.getElementById(id).value = ''; 
        this.setState({[id]: "", isActive: false});
    })
  }

  render() {
    function renderIssuedItems(part) {
        return (
        <tr key={part.lot_batch_no}>
            <td>{part.part_no}</td>
            <td>{part.barcode_id}</td>
            <td>{part.lot_batch_no}</td>
            <td>{part.qty_issued}</td>
            <td>
                <input className="form-control un-qty" id={(part.barcode_id != 'No Barcode') ? part.barcode_id : part.lot_batch_no} type="number" onChange={this.handleQty}/>
            </td>
            <td>
                <button className="btn btn-sm btn-warning" id={(part.barcode_id != 'No Barcode') ? part.barcode_id : part.lot_batch_no} onClick={this.handleSubmit}>Submit</button>
            </td>
        </tr>
        )};

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
              {this.props.issuedItems.map(renderIssuedItems)}
            </tbody>
          </table>
          </Loading>
        </div>
      </div>
    );
  }
}
