import React, {Component} from 'react';
import {connect} from 'react-redux';
import BeltOff from '../components/BeltOff';
import { withRouter } from 'react-router-dom';
import {update_socket} from '../actions';



class beltOffContainer extends Component {
  render() {
    const { seatbelt_on, action_on,update_socket } = this.props;
    return <BeltOff
              seatbelt_on={seatbelt_on}
              action_on = {action_on}
              update_socket = {update_socket}
            />;
  }
}

const mapStateToProps = ({form}) => {
    return {seatbelt_on : form.seatbelt}
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  update_socket: (data) => {
    dispatch(update_socket(data));
  }
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(beltOffContainer));
