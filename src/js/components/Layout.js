import React from "react";
import axios from "axios";

import OrderEntry from "./OrderEntry";
import Login from "./Login"
import Loading from "./Loading"
import LoginAlert from "./LoginAlert.js"

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
      this.setState({loading:true, loginWrn: ""})
      axios({
        method: 'POST',
        url: '/login',
        data: {id: this.state.userId, pass: this.state.pass},
        transformRequest: data => JSON.stringify(data)
      })
      .then((res) => {
        if (res.data.status) {
          this.setState({loading: false, loggedIn: true, loginWrn:""})
        }
        console.log(res.data.error)
        this.setState({loading: false, loginWrn: res.data.error})
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
        loggedIn: false,
        userId: "",
        pass: ""
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
            {this.state.loading ? <Loading/> : (this.state.loggedIn) 
                ? <OrderEntry userId={this.state.userId} pass={this.state.pass}/> 
                : <Login handleId={this.handleId.bind(this)} handlePw={this.handlePw.bind(this)} handleLogin={this.handleLogin.bind(this)}/>}
            {this.state.loginWrn ? <LoginAlert loginWrn={this.state.loginWrn}/> : ""}
          </div>
        );
    }
}
