import React, { Component } from "react";
import './../Cssy/Main.css';
import FormComponent from "./FormComponent";
import Footer from "./Footer";

import Background1 from './../images/StockSnap_XM8EM3JBYR.jpg';
import Background2 from './../images/StockSnap_CETLCQ8FDR7.jpg';
import Background3 from './../images/StockSnap_DCHQPNB939.jpg';
import Background4 from './../images/StockSnap_H3BKHKHAQ8.jpg';
import Background5 from './../images/StockSnap_JSMS7R8B43.jpg';
import Background6 from './../images/StockSnap_VH7WM9GNWA.jpg';
import Background7 from './../images/StockSnap_5NU3A9BR97.jpg';
import Background8 from './../images/StockSnap_5NU3A9BR98.jpg';


const backgroundChange = [
    { background: `url(${Background1})` },
    { background: `url(${Background2})` },
    { background: `url(${Background3})` },
    { background: `url(${Background4})` },
    { background: `url(${Background5})` },
    { background: `url(${Background6})` },
    { background: `url(${Background7})` },
    { background: `url(${Background8})` },
];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elemIndex: Math.floor((Math.random() * 8) + 1),
            background: backgroundChange,
        }
    }

    componentDidMount() {

        this.intervalID = setInterval(() => {
            if (this.state.elemIndex === this.state.background.length - 1) {
                this.setState({
                    elemIndex: 0
                })
            } else {
                this.setState({
                    elemIndex: this.state.elemIndex + 1,
                });
            }
        }, 20000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }



    render() {
        const slider = this.state.background[this.state.elemIndex];

        const sectionBackground = {
            backgroundImage: slider.background,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };
        return (
            <div>
                <div style={sectionBackground}>
                    <div>
                        <nav className='mainContainer'>
                            <div className='main'>
                                <p id='logo' >CLIMBING <span>CONDITIONS</span></p>
                                <p>Chcesz pojechać na wspin ale nie wiesz, </p>
                                <span>jaki będzie warun?</span>
                                <p>Dzięki nam możesz to sprawdzić</p>
                                <span>{' zaledwie w kilka sekund :)'} </span>
                            </div>
                        </nav>
                        <FormComponent></FormComponent>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
