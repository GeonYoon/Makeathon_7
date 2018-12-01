import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../custom.css'


class Header extends Component {
    renderContent() {
        switch (this.props.seatbelt_on) {
            case null:
                return;
            case true:
                 return [
                   <li key='1'><Link to={'/main'}>Main</Link></li>,
                   <li key='2'><Link to={'/detail'}>Detail</Link></li>
                 ];
            default:
                return [];
        }
    };

    render() {
        return (
                <nav>
                    <div className="nav-wrapper logoleft">
                        <Link
                            to={this.props.seatbelt_on ? '/main' : '/'}
                            className="left brand-logo "
                        >
                            Makeathon
                        </Link>
                        <ul className = "right">
                            { this.renderContent() }
                        </ul>
                    </div>
                </nav>
            );
    }
}

// function mapStateToProps( { auth } ) {
//     return { auth };
// }
export default Header;
