import React from "react"

export default class Loading extends React.Component {
    render() {
        return(
            <div className="container">
              <div className="progress">
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>Loading..</div>
                </div>
            </div>
        )
    }
}
