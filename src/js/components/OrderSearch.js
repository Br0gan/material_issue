import React from "react";

export default class OrderSearch extends React.Component {
  constructor() {
    super();
  };
  componentDidMount() {
    this.inputOrder.focus();
  };

  render() {
    const { handleOrder, handleOrderNo, found, clearOrder, orderNo } = this.props;

    function handleButton(found, handler) {
      if (found) {
        return <a href="#" class="btn btn-sm btn-danger" onClick={handler}>Clear Order</a>;
      }
      return;
    }

    return (
      <div className="container" id="enter_order">
        <div className="form-group">
          <div class="row">
            <label className="col-sm-2 control-label text-right">Shop Order:</label>
            <div className="col-sm-3">
              <input className="form-control input-sm" ref={(input) => {this.inputOrder = input;}} value={orderNo} id="enterOrder" type="text" onChange={handleOrderNo} onKeyPress={handleOrder}/>
            </div>
            <div class="col-sm-4"></div>
            <div className="col-sm-2">
              {handleButton(found, clearOrder)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
