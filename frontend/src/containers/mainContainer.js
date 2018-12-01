import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from '../components/Main';
import { updateColor } from '../actions';
import { withRouter } from 'react-router-dom';

class mainContainer extends Component {
  render(){
    const { updateColor,stations,current_location,seatbelt_on} = this.props;
    return <Main
              onSelect = {updateColor}
              stations = {stations}
              current_location = {current_location}
              seatbelt_on = {seatbelt_on}

              // colors = {colors}
              // selected = {color}
           />;
  }
}

const mapStateToProps = ({form}) => {
    return {
      stations : form.stations,
      current_location : form.current_location,
      seatbelt_on : form.seatbelt
      // colors : form.colors,
      // color : form.color
    }
};
const mapDispatchToProps = (dispatch) => ({
  updateColor : (color) => {
    dispatch(updateColor(color));
  }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(mainContainer));
