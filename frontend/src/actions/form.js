import axios from 'axios';


import {
  FORM_SUCCESS,
  UPDATE_COLOR,
  CHECK
} from './types';

export const form = (about1, about2, history) => async dispatch => {
  const compact = {about1, about2}
  // const res = await axios.get('http://127.0.0.1:8000/api/instagram/1/',compact)
  // dispatch({type: FORM_SUCCESS, payload: res.data})
  dispatch({type : FORM_SUCCESS, "title" : "This is a test"})
  history.push('/output')
}

export const updateColor = (value) => async dispatch => {
    dispatch({ type : UPDATE_COLOR, payload : value});
}

// export const checkConnection = () => async dispatch => {
//   dispatch({ type : CHECK});
// }
