import React, { Component } from 'react';
import '../custom.css'
import {Card, CardTitle} from 'react-materialize'
import myimage from '../images/HangJu_SanSung.jpeg'
import {Redirect} from "react-router-dom";
import socketIOClient from "socket.io-client";


class Detail extends Component {

     componentDidMount() {
        // const { endpoint } = this.state;
<<<<<<< HEAD
        const {seatbelt_on, update_socket} = this.props;
        const socket = socketIOClient("http://127.0.0.1:6508");
        // socket.on("off", data => this.setState({ response: data.data }));
        // socket.on("off", data => console.log("action_off function here"))
        socket.on("busData", data => update_socket(data))

=======
        const {seatbelt_on, action_off} = this.props;
        const socket = socketIOClient("http://192.168.0.103:6508");
        // socket.on("test", data => this.setState({ response: data }));
        socket.on("off", data => console.log("action_off function here"))
>>>>>>> 621351c1fa419d02b3f255e810eaa34f063f726b
      }


    render(){

        return (
            <div className = "row">
                <div className = "container">
                This is Detail Page <br />
                Only shown when you get close to your destination.
                </div>
            </div>

        )
    }
}



export default Detail;
