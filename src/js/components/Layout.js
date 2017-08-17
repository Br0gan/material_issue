import React from "react";

export default class Layout extends React.Component {
    constructor() {
      super();
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar">
                    <div className="navbar-header">
                        <h1>Suminoe Textiles <small>| Fiber Mixing Material Issue</small></h1>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><h3>Login</h3></a></li>
                    </ul>
                    <div className="col-md-12"><hr/></div>
                </nav>
            </div>
        );
    }
}
