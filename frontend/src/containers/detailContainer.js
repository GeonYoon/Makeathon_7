import React, {Component} from 'react';
import {connect} from 'react-redux';
import Detail from '../components/Detail';
import { withRouter } from 'react-router-dom';
import {update_socket} from '../actions';



class detailContainer extends Component {
  render() {
    const { seatbelt_on, update_socket } = this.props;
    return <Detail
              seatbelt_on={seatbelt_on}
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(detailContainer));
