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

import BeltRoute from '../containers/beltRoute';



class App extends Component {

    render() {
        return (
        <div className="container">
            <BrowserRouter>
                <div>
                  <HeaderContainer />
                  <Switch>
                    <Route exact path="/" component={BeltOff} />
                    <BeltRoute exact path="/main" component={MainContainer} />
                    <BeltRoute exact path="/detail" component={Detail} />

                  </Switch>
                </div>
            </BrowserRouter>
        </div>
        );
    }
}


export default connect(null, actions)(App);
