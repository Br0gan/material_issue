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
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleId = this.handleId.bind(this);
      this.handlePw = this.handlePw.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.showAlert = this.showAlert.bind(this);
    };

    alertOptions = {
      offset: 125,
      position: 'top right',
      theme: 'light',
      transistion: 'scale',
    };
    
  showAlert(string, type, duration) {
    this.msg.show(string, {
      type: type,
      time: duration
    });
  }
  handleLogin(e) {
    if (this.state.userId === "" || this.state.pass === "") {
      return
    };
    this.setState({loading:true, loginWrn: ""})
    axios.post('api/login', {
      id: this.state.userId.trim(),
      pass: this.state.pass.trim()
      })
      .then((res) => {
        if (!res.data.status) {
          this.showAlert(res.data.error, 'info', 5000);
          this.setState({loading: false});
          return
        }
          this.setState({loading: false, loggedIn: true, pass: ""});
      })
        .catch((err) => {console.log(err)})
    }

    handleId(e) {
      this.setState({
        userId: e.target.value
      });
    }

    handlePw(e) {
      this.setState({
        pass: e.target.value
      });
    }
    
    handleLogout(e) {
      this.setState({
        loggedIn: false,
        userId: "",
      });
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
                ? <OrderEntry userId={this.state.userId} showAlert={this.showAlert}/> 
                : <Login handleId={this.handleId} handlePw={this.handlePw} handleLogin={this.handleLogin}/>}
            <div>
              <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
          </div>
        );
    }
}
