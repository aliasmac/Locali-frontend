import React, { Component } from "react";
import './Stats.css'

class Stats extends Component {


    render() {
        return (
            <div className="stats-container">
                <div className="coming-soon-div">
                    <h1>Coming Soon.</h1>
                    <h3>Features currently in development:</h3>
                    <div>Broadcast History</div>
                    <div>Charts and statisics for your broadcasts</div>
                    <div>Live updates</div>
                </div>
            </div>
        )
    }
}


export default Stats;

