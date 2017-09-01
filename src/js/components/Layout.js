import React from "react";
import axios from "axios";
import AlertContainer from "react-alert";

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

    alertOptions = {
      offset: 125,
      position: 'top right',
      theme: 'light',
      transistion: 'scale',
    }
    
  showAlert(string, type, duration) {
    var img = <img src="../../assets/success.gif"/>
    if (type === 'error') {
      var img = <img src="../../assets/error.gif"/>
    }
    if (type === 'info') {
      var img = <img src="../../assets/info.gif"/>
    }  
    this.msg.show(string, {
      type: type,
      time: duration,
      icon: img 
    })
  }
  handleLogin(e) {
      if (this.state.userId === "" || this.state.pass === "") {
        return
      }
      this.setState({loading:true, loginWrn: ""})
      axios({
        method: 'POST',
        url: '/api/login',
        data: {id: this.state.userId, pass: this.state.pass},
        transformRequest: data => JSON.stringify(data)
      })
      .then((res) => {
        if (!res.data.status) {
          this.showAlert(res.data.error, 'info', 5000)
          this.setState({loading: false})
          return
        }
          this.setState({loading: false, loggedIn: true, pass: ""})
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
                ? <OrderEntry userId={this.state.userId} showAlert={this.showAlert.bind(this)}/> 
                : <Login handleId={this.handleId.bind(this)} handlePw={this.handlePw.bind(this)} handleLogin={this.handleLogin.bind(this)}/>}
            <div>
              <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
          </div>
        );
    }
}
