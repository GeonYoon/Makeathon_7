import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import {connect} from 'react-redux';


const BeltRouteComponent = ({component: Component, ...rest}) => {
  const {seatbelt_on} = rest;

  return (
    <Route {...rest} render={props => (
      seatbelt_on ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/'
        }}/>
      )
    )}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
    return {
        seatbelt_on: state.form.seatbelt,
        routeProps: {
            exact: ownProps.exact,
            path: ownProps.path
        }
    };
};

const BeltRoute = withRouter(connect(mapStateToProps, null, null, { pure: false })(BeltRouteComponent));
export default BeltRoute
