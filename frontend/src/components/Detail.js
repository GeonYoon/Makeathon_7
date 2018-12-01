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
        socket.on("busData", data => update_socket(data,this.props.history))
    }

    render(){
        const { name } = this.props.current_location
        return (
            <div className = "row">
                <div className = "container">
                <div>
                    <div className="col s8">
                      <h2> { name } </h2>
                    </div>
                    <div className="col s4">
                      <h2> QR_Code </h2>
                    </div>
                </div>

                <div className="graycard">
                    <div className="col s4">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">{ name }_detail_1</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="col s4">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">{ name }_detail_2</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s4">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">{ name }_detail_3</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="graycard">
                    <div className="col s2">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">pose_1</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="col s2">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">pose_2</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s2">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">Pose_3</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s2">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">Pose_4</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s2">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">Pose_5</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s2">
                          <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">Pose_6</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                </div>


            </div>

        )
    }
}



export default Detail;
