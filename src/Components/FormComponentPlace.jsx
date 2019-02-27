import React, { Component } from "react";
import './../Cssy/Form.css';

export default class FormComponentPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: 'Zielona Góra',
            cityLat: '',
            cityLon: ''
        }
    }

    changeHandlerPlace = event => {
        this.setState({
            place: event.target.value
        });
    }

    fetchData = event => {
        const url = 'https://graphhopper.com/api/1/geocode?key=1e78f6b4-82e6-4c73-8616-f415c4ee623d&q=' + this.state.place
        fetch(url).then(r => r.json()).then(obj => {
            console.log(obj)
            this.setState({
                cityLat: `${obj.hits[0].point.lat}`,
                cityLon: `${obj.hits[0].point.lng}`
            })
            console.log(this.state.cityLat)
            console.log(this.state.cityLon)

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <nav className='formContainer'>
                <form className='form'>
                    <div>Gdzie?</div>
                    <input
                        className="inp"
                        type="text"
                        name="place"
                        value={this.state.place}
                        onChange={this.changeHandlerPlace}
                        placeholder='nazwa najbliższej miejscowości'
                    />
                </form>
            </nav>
        );
    }
}
