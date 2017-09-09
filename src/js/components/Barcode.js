import React from "react";
import axios from "axios";
import Websocket from 'react-websocket';

import Loading from 'react-loading-overlay';

export default class Barcode extends React.Component {
  constructor() {
    super()
    this.state = {isActive: false, weight: 0, connected: false}
  }
  handleBarcode(e) {
    this.setState({barcodeId: e.target.value})
  }

  handleConnect() {
    this.setState({connected: true})
  }

  handleClose() {
    this.setState({connected: false})
  }

  handleScale(e) {
    this.setState({qty_issued: e.target.value})
  }

  handleData(data) {
   console.log(data)
   if (!data) {
      return
   }
   if (this.state.weight == data) {
     return
   }
   this.setState({weight: data})
  }

  handleSubmit(e) {
    if (!this.state.weight || !this.state.barcodeId) {
      return
    }
    var weight = this.state.weight
    if (weight.indexOf('-') >= 0) {
      this.props.showAlert("Can not issue less than 1...", 'info', 4000) 
      return
    }
    var re = /[0-9.]+/g;
    var out = re.exec(weight);
    weight = out[0]
    this.setState({isActive: true});
    axios.post('/api/issuemats',
      {
        contract: 'STA',
        order_no: this.props.orderNo,
        barcode_id: this.state.barcodeId,
        qty_issued: weight,
        user_id: this.props.userId
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
          this.props.showAlert('Barcode ID: ' + this.state.barcodeId + ' issued successfully!', 'success', 3500)
        } else {
          this.props.showAlert(res.data.error, 'error', 0) 
        }
        this.setState({barcodeId:"", qty_issued: "", isActive: false})
        document.getElementById("barcode_id").value = "";
        document.getElementById("barcode_id").focus();
      })
  }

  render() {
    return(
      <div className="container">
        <Loading active={this.state.isActive}
          spinner
          text='Processing..'
          color='black'
          background='clear'>
       <div className="panel panel-primary">
        <div className="panel panel-heading text-center"><p id="heading-title">Enter Item Being Issued</p></div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-6">
                <label for="barcode_id">Barcode/LotNumber:</label>
                <input autoFocus={true} className="well well-sm form-control input-lg" 
                  id="barcode_id" type="text" onChange={this.handleBarcode.bind(this)}/>
              </div>
              <div className="col-md-6">
                <label for="scale">Quantity/ScaleReading: {this.state.connected ? "Connected" : "Disconnected"}</label>
                <input className="well well-sm form-control input-lg" id="scale" 
                  type="text" value={this.state.weight} onChange={this.handleScale.bind(this)}/>
              </div>
            </div>
            <div>
              <a href="#" id="issue" className="btn btn-info btn-block" onClick={this.handleSubmit.bind(this)}>ISSUE QTY TO ORDER</a> 
            </div>
          </div>
        </div>
      </Loading>
      <Websocket url='ws://172.27.13.215:3001/ws' 
        onMessage={this.handleData.bind(this)} 
        onOpen={this.handleConnect.bind(this)}
        onClose={this.handleClose.bind(this)}/>
      </div>
    );
  }
}
