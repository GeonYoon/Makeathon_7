import React, {Component} from 'react';
import {connect} from 'react-redux';
import BeltOff from '../components/BeltOff';
import { withRouter } from 'react-router-dom';
import {on} from '../actions';



class beltOffContainer extends Component {
  render() {
    const { seatbelt_on, action_on } = this.props;
    return <BeltOff
              seatbelt_on={seatbelt_on}
              action_on = {action_on}
            />;
  }
}

const mapStateToProps = ({form}) => {
    return {seatbelt_on : form.seatbelt}
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  action_on: () => {
    dispatch(on());
  }
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(beltOffContainer));
