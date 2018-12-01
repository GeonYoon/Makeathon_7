import React, { Component } from 'react';
import '../custom.css'
import {Card, CardTitle} from 'react-materialize'
import myimage from '../images/HangJu_SanSung.jpeg'
import {Redirect} from "react-router-dom";


// const iconPath = process.env.PUBLIC_URL + '/assets/icons/';

const Color = ({ color, active, onClick}) => {
    return (
        <div className={`color ${active && 'active'}`} onClick={onClick}  style={{ background : color}} />

    )
}

class Main extends Component {
    render(){
        const { stations, current_location, onSelect, seatbelt_on} = this.props;
        const colorList = stations.map(
            function(item) {
                return (
                <Color
                    color = {item.color}
                    onClick = {() => onSelect(item)}
                    active = {current_location === item }
                    key = {item.color}
                />
            )
        }
    )
        return !seatbelt_on
            ? (<Redirect to='/' />)
            : (
            <div className = "row">
                <div className = "container">
                    <div className="title" style ={{ textAlign : 'center'}}>
                        <h3 >
                            Choose Your Destination!
                        </h3>
                    </div>
                    <div className = "col s3 palette">
                        { colorList }
                    </div>
                    <div className = "col s9 palette">
                        <Card className='small'
                            header={<CardTitle image={myimage}>{current_location.name}</CardTitle>}
                        >
                        This is {current_location.id} stop.<br />
                        {current_location.description}
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}



export default Main;
