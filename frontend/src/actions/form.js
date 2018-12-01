import axios from 'axios';

import {
  UPDATE_COLOR,
  NOT_WEARING_BELT,
  SEAT_BUT_NOT_BELT,
  STILL_GOING,
  ARRIVE
} from './types';

export const updateColor = (value) => async dispatch => {
    const sending = {"destination" : value.name}
    axios.post('http://192.168.0.103:6508/destination/',sending)
    dispatch({ type : UPDATE_COLOR, payload : value});
}

export const update_socket = (data,history) => async dispatch => {
  const {seat, belt, stop} = data;
  // console.log(seat);
  // console.log(belt);
  // console.log(stop);

  // nothing will happen
  if(belt==false && seat==true){
    console.log("안긴했는데 벨트안맴 -> 경고메세지")
    dispatch({type : SEAT_BUT_NOT_BELT})
  }
  else if(belt==false){
    console.log("벨트안하면 아무것도못함")
    dispatch({type : NOT_WEARING_BELT})
    history.push('/')
  }
  else if(belt==true && seat == true && stop == false){
    console.log("안고 맸는데, 도착을안함")
    dispatch({type : STILL_GOING})
  }
  else if(belt==true && seat == true && stop == true){
    console.log("안고,매고,도착")
    dispatch({type : ARRIVE})
    history.push('/detail')
  }
  else{
    console.log("nothing")
  }

  // dispatch({ type : ON, payload : });
}

// export const checkConnection = () => async dispatch => {
//   dispatch({ type : CHECK});
// }
