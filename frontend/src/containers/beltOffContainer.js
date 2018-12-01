import React, {Component} from 'react';
import {connect} from 'react-redux';
import BeltOff from '../components/BeltOff';
import { withRouter } from 'react-router-dom';


class beltOffContainer extends Component {
  render() {
    const { seatbelt_on } = this.props;
    return <BeltOff seatbelt_on={seatbelt_on}/>;
  }
}

const mapStateToProps = ({form}) => {
    return {seatbelt_on : form.seatbelt}
};

export default withRouter(connect(mapStateToProps,null)(beltOffContainer));
