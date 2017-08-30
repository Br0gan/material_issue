import React from "react"

export default class LoginAlert extends React.Component {
  constructor() {
    super()
  }

  render() {
          
    return ( 
      <div class="container" id="loginAlert">
        <br/>
      <div class="col-md-4"></div>
      <div class="col-md-4 alert alert-warning text-center">
        <strong>Warning!</strong> {this.props.loginWrn}
      </div>
      <div class="col-md-4"></div>
    </div>
    )
  }
}
