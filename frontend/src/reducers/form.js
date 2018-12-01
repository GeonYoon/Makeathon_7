import {
  UPDATE_COLOR,
  NOT_WEARING_BELT,
  SEAT_BUT_NOT_BELT,
  STILL_GOING,
  ARRIVE
} from '../actions/types';
import { handleActions } from 'redux-actions';

const formInitialState = {
  output: null,

  seatbelt : false,
  seat : false,
  stop : false,
  error : '',
  current_location : {id:1,"name":"Starfield","color":"343a40","description":"Here is Starfield","img_path" : '../images/starfield.jpeg'},
  stations : [{
      id : 1,
      "name" : "Starfield",
      "color" : "#343a40",
      "description" : "Here is Starfield",
      "img_path" : '../images/starfield.jpeg'
    },{
      id : 2,
      "name" : "IKEA",
      "color" : "#f03e3e",
      "description" : "Here is IKEA",
      "img_path" : '../images/ikea.jpg'
    },{
      id : 3,
      "name" : "HangJu_SanSung",
      "color" : "#12b886",
      "description" : "Here is HangJu_SanSung",
      "img_path" : '../images/HangJu_SanSung.jpeg'
    },{
      id : 4,
      "name" : "KWave_Gallery",
      "color" : "#228ae6",
      "description" : "Here is KWave_Gallery",
      "img_path" : '../images/KWave_Gallery.jpeg'
    }
  ]
}

export default handleActions({
  [UPDATE_COLOR] : (state, {payload : value}) => {
    return { ...state,
              current_location : value
           };
  },
  [NOT_WEARING_BELT] : (state, action) => {
    return { ...state,
            seatbelt : false,
           };
  },
  [SEAT_BUT_NOT_BELT] : (state, action) => {
    return { ...state,
            seatbelt : false,
            error : 'Sitting is not enough! Fasten your Seat Belt!!!!!'
           };
  },
  [STILL_GOING] : (state, action) => {
    return { ...state,
            seatbelt : true,
            error : ''
           };
  },
  [ARRIVE] : (state, action) => {
    return { ...state,
            seatbelt : true,
            error : '',
            stop: 'true'
           };
  },
}, formInitialState)
