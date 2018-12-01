import {
  FORM_SUCCESS,
  UPDATE_COLOR,
  CHECK,
  ON,
  OFF
} from '../actions/types';
import { handleActions } from 'redux-actions';

const formInitialState = {
  output: null,

  seatbelt : true,
  destination : '',
  qr_code : '',
  recommanded_sub_locataions : '',
  recommanded_pose : '',
  color : '#343a40',
  colors :['#343a40', '#f03e3e', '#12b886', '#228ae6'],
  seat : false,
  stop : false,
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
  [FORM_SUCCESS] : (state, action) => {

    return { ...state,
             output : action.title
           };
  },
  [CHECK] : (state, action) => {
    console.log("got here");
    console.log(action.data);
    return { ...state,
           };
  },
  [ON] : (state, action) => {
    console.log("action_on");
    return { ...state,
            seatbelt : true
           };
  },
  [OFF] : (state, action) => {
    return { ...state,
            seatbelt : false
           };
  }
}, formInitialState)
