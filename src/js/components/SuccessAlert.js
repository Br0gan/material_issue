import React from "react"
import AlertContainer from 'react-alert'

export default class SuccessAlert extends React.Component {
  constructor() {
    super()
  }
  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 3000,
    transition: 'fade'

  }

  showAlert() {
    this.msg.success(this.props.info +  ' successfuly')
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
