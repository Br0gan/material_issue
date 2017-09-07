import React from "react";

export default class OrderSearch extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    document.getElementById("enterOrder").focus();
  }

  render() {
    const handleOrder = this.props.handleOrder;
    const found = this.props.found;

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
              <input className="form-control input-sm" id="enterOrder" type="text" onKeyPress={handleOrder}/>
            </div>
            <div class="col-sm-4"></div>
            <div className="col-sm-2">
              {handleButton(this.props.found, this.props.clearOrder)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
