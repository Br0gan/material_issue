import React from "react";
import axios from "axios";

import OrderEntry from "./OrderEntry";
import Login from "./Login"
import Loading from "./Loading"

export default class Layout extends React.Component {
    constructor() {
      super();
      this.state = {
        userId: "",
        loggedIn: false,
        loading: false
      }
    }
    
  handleLogin(e) {
      this.setState({loading:true})
      axios({
        baseURL: 'http://localhost:3000/login',
        method: 'POST',
        data: {id: this.state.userId, pass: this.state.pass},
        transformRequest: data => JSON.stringify(data)
      })
      .then((res) => {
        if (res.data.status) {
          this.setState({loading: false, loggedIn: true, pass: ""})
        }
        this.setState({loading: false, pass: ""})
      })
        .catch((err) => {console.log(err)})
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
    
    handleLogout(e) {
      this.setState({
        loggedIn: false
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
                      <li><h4>{(this.state.loggedIn) ? "Welcome, " + this.state.userId : ""}</h4></li>
                      <li><a href="#" onClick={this.handleLogout.bind(this)}>{(this.state.loggedIn) ? "Logout" : ""}</a></li>
                    </ul>
                    <div className="col-md-12"><hr/></div>
                </nav>
            </div>
            {this.state.loading ? <Loading/> : (this.state.loggedIn) ? <OrderEntry/> : <Login handleId={this.handleId.bind(this)} handlePw={this.handlePw.bind(this)} handleLogin={this.handleLogin.bind(this)}/>}
          </div>
        );
    }
}
