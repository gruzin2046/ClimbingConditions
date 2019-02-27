import React, { Component } from "react";
import './../Cssy/Form.css';

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: 'Zielona Góra',
            date: '2019-02-28T00:00',
            cityLat: '',
            cityLon: ''
        }
    }

    changeHandlerPlace = event => {
        this.setState({
            place: event.target.value
        });
    }

    changeHandlerDate = event => {
        this.setState({
            date: event.target.value
        });
    }

    fetchLocation = event => {
        event.preventDefault()
        const url = 'https://graphhopper.com/api/1/geocode?key=1e78f6b4-82e6-4c73-8616-f415c4ee623d&q=' + this.state.place
        fetch(url).then(r => r.json()).then(obj => {
            console.log(obj)
            this.setState({
                cityLat: `${obj.hits[0].point.lat}`,
                cityLon: `${obj.hits[0].point.lng}`,
            }, () => {
                this.fetchPastWeatherOneDayAgo(event)
            })
            console.log(this.state.cityLat)
            console.log(this.state.cityLon)

        }).catch(err => {
            console.log(err)
        })
    }

    fetchPastWeatherOneDayAgo = event => {
        // event.preventDefault()
        //const now = new Date()
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000)
        console.log(searchDateNumber)
        console.log(this.state.cityLat)
        console.log(this.state.cityLon)
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            console.log('tam', obj)
            // this.setState({
            //     cityLat: `${obj.hits[0].point.lat}`,
            //     cityLon: `${obj.hits[0].point.lng}`
            // })
            // console.log(this.state.cityLat)
            // console.log(this.state.cityLon)

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        // const now = new Date()
        // const year = now.getFullYear()
        // console.log(year)
        // const month = now.getMonth()
        // const day = now.getDate()
        // const hour = now.getHours()
        // const minute = now.getMinutes()
        // const combineTime = `${year}-${month}-${day}-${hour}-${minute}`
        // console.log(combineTime)
        return (
            <nav className='formContainer'>
                <div className='formList'>
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
                    <form className='form'>
                        <div>Kiedy?</div>
                        <input
                            className="inp"
                            type="datetime-local"
                            value={this.state.date}
                            // min="2019-02-25T00:00"
                            // max="2019-02-28T00:00"
                            name="date"
                            onChange={this.changeHandlerDate}
                        />
                    </form>
                    <button onClick={(e) => this.fetchLocation(e)}>SPRAWDŹ!</button>
                </div>
            </nav>
        );
    }
}
