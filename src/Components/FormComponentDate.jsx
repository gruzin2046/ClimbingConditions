import React, { Component } from "react";
import './../Cssy/Form.css';

export default class FormComponentDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        }
    }

    changeHandler = event => {
        this.setState({
            date: event.target.value
        });
    }

    render() {
        return (
            <nav className='formContainer'>
                <form className='form'>
                    <div>Kiedy?</div>
                    <input
                        className="inp"
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.changeHandlerDate}
                        placeholder=''
                    />
                </form>
            </nav>
        );
    }
}

