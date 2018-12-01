import axios from 'axios';
import socketIOClient from "socket.io-client";



import {
  FORM_SUCCESS,
  UPDATE_COLOR,
  CHECK,
  ON
} from './types';

export const form = (about1, about2, history) => async dispatch => {
  const compact = {about1, about2}
  // const res = await axios.get('http://127.0.0.1:8000/api/instagram/1/',compact)
  // dispatch({type: FORM_SUCCESS, payload: res.data})
  dispatch({type : FORM_SUCCESS, "title" : "This is a test"})
  history.push('/output')
}

export const updateColor = (value) => async dispatch => {
    const sending = {"destination" : value.name}
    // const res = await axios.post('http://192.168.0.103:6508/destination/',sending)
    const socket = socketIOClient("http://127.0.0.1:6508");
    socket.emit("message",{"destination" : value.name})

    dispatch({ type : UPDATE_COLOR, payload : value});
}

export const update_socket = (data) => async dispatch => {
  const {seat, belt, stop} = data;
  // console.log(seat);
  // console.log(belt);
  // console.log(stop);

  // nothing will happen
  if(belt==false){
    console.log("벨트안하면 아무것도못함")

  }
  else if(belt==true && seat == true && stop == true){
    console.log("안고,매고,도착")
  }
  else if(belt==true && seat == true && stop == false){
    console.log("안고 맸는데, 도착을안함")
  }
  else{
    console.log("안긴했느데 벨트안맴 -> 경고메세지")
  }
  // dispatch({ type : ON, payload : });
}

// export const checkConnection = () => async dispatch => {
//   dispatch({ type : CHECK});
// }
