import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';


class headerContainer extends Component {
  render() {
    const { seatbelt_on } = this.props;
    return <Header seatbelt_on={seatbelt_on}/>;
  }
}

const mapStateToProps = ({form}) => {
    return {seatbelt_on : form.seatbelt}
};

export default withRouter(connect(mapStateToProps,null)(headerContainer));
