import React, { Component } from "react";
import './../Cssy/Main.css';

export default class Main extends Component {
    render() {
        return (
            <nav className='mainContainer'>
                <div className='main'>
                    <p id='logo' >CLIMBING  <span>CONDITIONS</span></p>
                    <p>Chcesz pojechać na wspin ale nie wiesz, </p>
                    <span>jaki będzie warun?</span>
                    <p>Dzięki nam możesz to sprawdzić</p>
                    <span>{' zaledwie w kilka sekund :)'} </span>
                </div>
            </nav>
        )
    }
}
