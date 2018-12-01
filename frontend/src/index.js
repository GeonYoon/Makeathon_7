import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
window.axios = axios;



let socket = io('http://localhost:6508');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

//const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers, {}, applyMiddleware(reduxThunk,socketIoMiddleware));
store.subscribe(()=>{
  console.log('new client state', store.getState());
  
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
