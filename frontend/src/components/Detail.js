import React, { Component } from 'react';
import '../custom.css'
import {Card, CardTitle} from 'react-materialize'
import myimage from '../images/HangJu_SanSung.jpeg'
import {Redirect} from "react-router-dom";
import socketIOClient from "socket.io-client";


class Detail extends Component {

     componentDidMount() {
        // const { endpoint } = this.state;
        const {seatbelt_on, update_socket} = this.props;
        const socket = socketIOClient("http://127.0.0.1:6508");
        // socket.on("off", data => this.setState({ response: data.data }));
        // socket.on("off", data => console.log("action_off function here"))
        socket.on("busData", data => update_socket(data))
    }

    render(){

        return (
            <div className = "row">
                <div className = "container">
                <div>
                    <div className="col s7">
                      <h1> Destination </h1>
                    </div>
                    <div className="col s5">
                      <h1> QR_Code </h1>
                    </div>
                </div>

                <div>
                <div class="col s4">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">Card Title</span>
                          <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                          <a href="#">This is a link</a>
                          <a href="#">This is a link</a>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="col s4">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">Card Title</span>
                          <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                          <a href="#">This is a link</a>
                          <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">Card Title</span>
                          <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                          <a href="#">This is a link</a>
                          <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>



                </div>
            </div>

        )
    }
}



export default Detail;
