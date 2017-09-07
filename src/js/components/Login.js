import React from "react"


export default class Login extends React.Component {

    componentDidMount() {
        document.getElementById("userId").focus();
    }

    render() {
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 center-block login-box">
                    <h3>Login into your account.</h3>
                    <form>
                    <div className="form-group">
                        <label for="userId">User ID:</label>
                        <input className="form-control" id="userId" onChange={this.props.handleId}/>
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" onChange={this.props.handlePw}/>
                    </div>
                    <button className="btn btn-info btn-block" onClick={this.props.handleLogin}>Submit</button>
                </form>
                </div>
            </div>
        </div>
        );
    }
}
