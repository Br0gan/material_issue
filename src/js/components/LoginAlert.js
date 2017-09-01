import React from "react"
import AlertContainer from 'react-alert'

export default class LoginAlert extends React.Component {
  constructor() {
    super()
  }
  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'fade'

  }

  showAlert() {
    this.msg.info(this.props.loginWrn)
  }

  componentDidMount() {
    this.showAlert(); 
  }

  render() {
          
    return ( 
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    )
  }
}
