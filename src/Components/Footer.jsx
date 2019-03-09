import React, { Component } from "react";
import './../Cssy/Footer.css';


export default class Footer extends Component {
    render() {
        return (
            <nav className='footerConatiner'>
                <div className='footer'>
                    <p>Made by <span className='blue'>Albert Łuniewicz</span></p>
                    <p>luniewicz.albert@gmail.com</p>
                    <a href="https://github.com/gruzin2046" className='blue'>github</a>
                    <a href="https://www.linkedin.com/in/albert-%C5%82uniewicz">linkedIn</a>
                </div>
            </nav>
        )
    }
}

