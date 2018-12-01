import React, { Component } from 'react';
import '../custom.css'
import {Card, CardTitle} from 'react-materialize'
import myimage from '../images/HangJu_SanSung.jpeg'
import {Redirect} from "react-router-dom";
import socketIOClient from "socket.io-client";


class Detail extends Component {
    // constructor() {
    //    super();
    //    this.state = {
    //      response: '',
    //      endpoint: "http://127.0.0.1:6508"
    //    };
    //  }

     componentDidMount() {
        // const { endpoint } = this.state;
        const {seatbelt_on, action_off} = this.props;
        const socket = socketIOClient("http://192.168.0.103:6508");
        // socket.on("test", data => this.setState({ response: data }));
        socket.on("off", data => console.log("action_off function here"))
      }

    render(){
        // console.log(this.state.response);
        return (
            <div className = "row">
                <div className = "container">
               HI
                </div>
            </div>

        )
    }
}



export default Detail;
