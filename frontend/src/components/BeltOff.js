import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import socketIOClient from "socket.io-client";

class Login extends Component {

  componentDidMount() {
       // const { endpoint } = this.state;
       const {seatbelt_on, action_off} = this.props;
       const socket = socketIOClient("http://192.168.0.103:6508");
       // socket.on("test", data => this.setState({ response: data }));
       socket.on("on", data => console.log("action_off function here"))
     }

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
