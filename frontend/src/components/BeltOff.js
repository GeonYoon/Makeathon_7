import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import socketIOClient from "socket.io-client";


class Login extends Component {

  componentDidMount() {
     // const { endpoint } = this.state;
     const {seatbelt_on, update_socket} = this.props;
     const socket = socketIOClient("http://127.0.0.1:6508");
     // socket.on("off", data => this.setState({ response: data.data }));
     // socket.on("off", data => console.log("action_off function here"))
     socket.on("busData", data => update_socket(data,this.props.history))

   }

  render() {
    const seatbelt_on = this.props.seatbelt_on
    return seatbelt_on
          ? (<Redirect to="/main" />)
          : (
            <div style ={{ textAlign : 'center'}}>
              <h1>Seat Belt Off</h1>
              Fasten Your Seat Belt On Please
              <h3>{this.props.error}</h3>
            </div>
          );
  }
}

export default Login
