import React from "react";
import axios from "axios";
import Websocket from 'react-websocket';
import Loading from 'react-loading-overlay';

export default class Barcode extends React.Component {
  constructor() {
    super();
    this.state = {isActive: false, weight: 0, connected: false, barcodeId: ""};

    this.handleBarcode = this.handleBarcode.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleClose   = this.handleClose.bind(this);
    this.handleData    = this.handleData.bind(this);
    this.handleScale   = this.handleScale.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }
  handleBarcode(e) {
    this.setState({barcodeId: e.target.value});
  }
  handleConnect() {
    this.setState({connected: true});
  }

  handleClose() {
    this.setState({connected: false});
  }

  handleScale(e) {
    this.setState({qty_issued: e.target.value});
  }

  handleData(data) {
   if (!data || this.state.weight == data) {
      return
   }
   this.setState({weight: data});
  }

  handleSubmit(e) {
    const re = /[0-9.]+/g;
    if (!this.state.weight || !this.state.barcodeId) {
      return
    }
    if (weight.indexOf('-') >= 0) {
      this.props.showAlert("Can not issue less than 1...", 'info', 4000);
      return
    }

    var out = re.exec(this.state.weight);
    var weight = out[0];

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
          this.props.handleOrder(e);
          this.props.showAlert('Barcode ID: ' + this.state.barcodeId + ' issued successfully!', 'success', 3500);
        } else {
          this.props.showAlert(res.data.error, 'error', 0);
        }
        this.setState({barcodeId:"", qty_issued: "", isActive: false});
        this.inputBarcode.focus();
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
                <input ref={(input) => this.inputBarcode = input} className="well well-sm form-control input-lg" 
                  id="barcode_id" type="text" value={this.state.barcodeId} onChange={this.handleBarcode}/>
              </div>
              <div className="col-md-6">
                <label for="scale">Quantity/ScaleReading: {this.state.connected ? "Connected" : "Disconnected"}</label>
                <input className="well well-sm form-control input-lg" id="scale" 
                  type="text" value={this.state.weight} onChange={this.handleScale}/>
              </div>
            </div>
            <div>
              <a href="#" id="issue" className="btn btn-info btn-block" onClick={this.handleSubmit}>ISSUE QTY TO ORDER</a> 
            </div>
          </div>
        </div>
      </Loading>
      <Websocket url='ws://172.27.13.215:3001/ws' 
        onMessage={this.handleData} 
        onOpen={this.handleConnect}
        onClose={this.handleClose}/>
      </div>
    );
  }
}
