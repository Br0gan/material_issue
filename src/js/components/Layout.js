import React from "react";

import OrderEntry from "./OrderEntry";
import Login from "./Login"

export default class Layout extends React.Component {
    constructor() {
      super();
      this.state = {
        userId: "",
        loggedIn: false 
      }
    }

    handleLogin(e) {
      this.setState({
        loggedIn: true
      })
    }
    handleId(e) {
      this.setState({
        userId: e.target.value
      })
    }

    handlePw(e) {
      this.setState({
        pass: e.target.value
      })
    }
    render() {
        return (
          <div>
            <div className="container">
                <nav className="navbar navbar">
                    <div className="navbar-header">
                        <h1>Suminoe Textiles <small>| Fiber Mixing Material Issue</small></h1>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="#"><h4>{(this.state.loggedIn) ? "Welcome, " + this.state.userId : ""}</h4></a></li>
                    </ul>
                    <div className="col-md-12"><hr/></div>
                </nav>
            </div>
            {(this.state.loggedIn) ? <OrderEntry/> : <Login handleId={this.handleId.bind(this)} handlePw={this.handlePw.bind(this)} handleLogin={this.handleLogin.bind(this)}/>}
          </div>
        );
    }
}
