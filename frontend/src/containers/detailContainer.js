import React, {Component} from 'react';
import {connect} from 'react-redux';
import Detail from '../components/Detail';
import { withRouter } from 'react-router-dom';
import {off} from '../actions';



class detailContainer extends Component {
  render() {
    const { seatbelt_on, action_off } = this.props;
    return <Detail
              seatbelt_on={seatbelt_on}
              action_off = {action_off}
            />;
  }
}

const mapStateToProps = ({form}) => {
    return {seatbelt_on : form.seatbelt}
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  action_off: () => {
    dispatch(off());
  }
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(detailContainer));
