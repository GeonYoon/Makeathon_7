import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import About from './About';

import BeltOff from './BeltOff'
import Main from './Main'
import Detail from './Detail'

import HeaderContainer from '../containers/headerContainer';
import MainContainer from '../containers/mainContainer';
import DetailContainer from '../containers/detailContainer';
import BeltOffContainer from '../containers/beltOffContainer';


import BeltRoute from '../containers/beltRoute';



class App extends Component {

    render() {
        return (
        <div className="container">
            <BrowserRouter>
                <div>
                  <HeaderContainer />
                  <Switch>
                    <Route exact path="/" component={BeltOffContainer} />
                    <BeltRoute exact path="/main" component={MainContainer} />
                    <BeltRoute exact path="/detail" component={DetailContainer} />

                  </Switch>
                </div>
            </BrowserRouter>
        </div>
        );
    }
}


export default connect(null, actions)(App);
