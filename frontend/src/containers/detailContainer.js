import React, {Component} from 'react';
import {connect} from 'react-redux';
import Detail from '../components/Detail';
import { withRouter } from 'react-router-dom';
import {update_socket} from '../actions';



class detailContainer extends Component {
  render() {
    const { seatbelt_on, update_socket, current_location,photos } = this.props;
    return <Detail
              seatbelt_on={seatbelt_on}
              update_socket = {update_socket}
              current_location = {current_location}
              photos = {photos.split(',')}
            />;
  }
}

const mapStateToProps = ({form}) => {
    return {
              seatbelt_on : form.seatbelt,
              current_location : form.current_location,
              photos : form.photos
           }
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  update_socket: (data) => {
    dispatch(update_socket(data,ownProps.history));
  }
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(detailContainer));
