import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Login extends Component {

  render() {
    const seatbelt_on = this.props.seatbelt_on
    return !seatbelt_on
          ? (<Redirect to="/main" />)
          : (
            <div style ={{ textAlign : 'center'}}>
              <h1>Seat Belt Off</h1>
              Fasten Your Seat Belt On Please
            </div>
          );
  }
}

export default Login
