import React, { Component } from "react";
import './../Cssy/Form.css';

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'visible',
            class1: 'hidden',
            classError: 'hidden',
            place: 'Zielona Góra',
            date: '2019-02-28T12:00',
            cityLat: '',
            cityLon: '',
            precipIntencityTwo: '',

            precipIntencityOne: '',
            windSpeedOne: '',
            windSpeedSureOne: '',

            precipIntencity: '',
            precipIntencityInfo: '',
            precipSureNorm: '',
            precipSureNormInfo: '',
            precipSurehard: '',
            precipSurehardInfo: '',
            windSpeed: '',
            windSpeedInfo: '',
            windSpeedSure: '',
            windSpeedSureInfo: '',
            currTemp: '',
            currTempInfo: '',
            currHum: '',
            currHumInfo: '',

            arayResult: [],
            arrayDesc: []
        }
    }

    conditionCalc = () => {

        setTimeout(() => {

            if (this.state.precipIntencityTwo === 2) {
                this.setState({
                    arayResult: [...this.state.arayResult, 2],
                    arrayDesc: [...this.state.arrayDesc, 'padało dwa dni wcześniej']
                });
            }

            if (this.state.precipIntencityTwo === 4) {
                this.setState({
                    arayResult: [...this.state.arayResult, 4],
                    arrayDesc: [...this.state.arrayDesc, 'lało dwa dni wcześniej']
                });
            }

            if (this.state.precipIntencityOne === 2) {
                this.setState({
                    arayResult: [...this.state.arayResult, 4],
                    arrayDesc: [...this.state.arrayDesc, 'padało dzień wczesniej']
                });
            }

            if (this.state.precipIntencityOne === 4) {
                this.setState({
                    arayResult: [...this.state.arayResult, 6],
                    arrayDesc: [...this.state.arrayDesc, 'lało dzień wcześniej']
                });
            }

            if (this.state.precipIntencityTwo >= 2 && this.state.precipIntencityOne === 0 && (this.state.windSpeedOne <= -2 || this.state.windSpeedSureOne <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'dzień wcześniej wiatr szuszył skały']
                });
            }

            if (this.state.precipIntencityTwo >= 2 && this.state.precipIntencityOne === 0 && (this.state.windSpeedOne <= -4 || this.state.windSpeedSureOne <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'dzień wcześniej wiatr mocno szuszył skały']
                });
            }

            if (this.state.precipIntencityOne >= 2 && (this.state.windSpeed <= -2 || this.state.windSpeedSure <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'po deszczu wiatr szuszy skały']
                });
            }

            if (this.state.precipIntencityOne >= 2 && (this.state.windSpeed === -4 || this.state.windSpeedSure <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'po deszczu wiatr mocno szuszy skały']
                });
            }

            //current conditions

            if ((this.state.precipIntencity + this.state.precipSureNorm + this.state.precipSureHard) >= 6) {
                this.setState({
                    windSpeed: 0,
                    windSpeedSure: 0,
                    currTemp: 0,
                });
            }

            this.setState({
                arayResult: [...this.state.arayResult, this.state.precipIntencity, this.state.precipSureNorm, this.state.precipSureHard, this.state.windSpeed, this.state.windSpeedSure, this.state.currTemp, this.state.currHum],
                arrayDesc: [...this.state.arrayDesc, this.state.precipIntencityInfo, this.state.precipSureNormInfo, this.state.precipSureHardInfo, this.state.windSpeedInfo, this.state.windSpeedSureInfo, this.state.currTempInfo, this.state.currHumInfo]
            });

            console.log('wyniki: ', this.state.arayResult)
            console.log('opisy: ', this.state.arrayDesc)

        }, 1000);
    }

    hideForm = () => {
        this.setState({
            class: 'hidden',
            class1: 'visible'
        });
    }

    showForm = () => {
        this.setState({
            class: 'visible',
            class1: 'hidden',
            classError: 'hidden'
        });
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
            //console.log(obj)
            this.setState({
                cityLat: `${obj.hits[0].point.lat}`,
                cityLon: `${obj.hits[0].point.lng}`,
            }, () => {
                this.fetchPastWeatherTwoDayAgo(event)
                this.fetchPastWeatherOneDayAgo(event)
                this.fetchWeather(event)
            })
            // console.log(this.state.cityLat)
            // console.log(this.state.cityLon)
        }).catch(err => {
            console.log(err)
            this.setState({
                class1: 'hidden',
                classError: 'visible'
            });
        })
    }

    fetchPastWeatherTwoDayAgo = event => {
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000) - 172800
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            //console.log('dwa dni wcześniej', obj)
            const precipIntencityArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].precipIntencity > 0.25) {
                    precipIntencityArray.push(obj.hourly.data[i].precipIntencity)
                }
            }
            console.log('tablica opadów, dwa dni wcześniej', precipIntencityArray)
            if (precipIntencityArray.length === 0) {
                this.setState({
                    precipIntencityTwo: 0
                })
            }
            else if (precipIntencityArray.length > 0 && precipIntencityArray.length < 4) {
                this.setState({
                    precipIntencityTwo: 2
                })
            }
            else {
                this.setState({
                    precipIntencityTwo: 4
                })
            }
            console.log('wartość dla opadów, dwa dni wcześniej', this.state.precipIntencityTwo)

        }).catch(err => {
            console.log(err)
        })
    }

    fetchPastWeatherOneDayAgo = event => {
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000) - 86400
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            //console.log('dzień wcześniej', obj)
            const precipIntencityArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].precipIntencity > 0.25) {
                    precipIntencityArray.push(obj.hourly.data[i].precipIntensity)
                }
            }
            console.log('tablica opadów, dzień wcześniej', precipIntencityArray)
            if (precipIntencityArray.length === 0) {
                this.setState({
                    precipIntencityOne: 0
                })
            }
            else if (precipIntencityArray.length > 0 && precipIntencityArray.length < 4) {
                this.setState({
                    precipIntencityOne: 2
                })
            }
            else {
                this.setState({
                    precipIntencityOne: 4
                })
            }
            console.log('wartość opadów', this.state.precipIntencityOne)

            const windSpeedArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].windSpeed > 12 && obj.hourly.data[i].windSpeed < 30) {
                    windSpeedArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            console.log('tablica wiatru, dzień wcześniej', windSpeedArray)
            if (windSpeedArray.length === 0) {
                this.setState({
                    windSpeedOne: 0
                })
            }
            else if (windSpeedArray.length > 0 && windSpeedArray.length < 4) {
                this.setState({
                    windSpeedOne: -2
                })
            }
            else {
                this.setState({
                    windSpeedOne: -4
                })
            }
            console.log('wartość dla wiatru, dzień wcześniej', this.state.windSpeedOne)

            const windSpeedSureArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].windSpeed > 30) {
                    windSpeedSureArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            console.log('tablica silnego wiatru, dzień wcześniej', windSpeedSureArray)
            if (windSpeedSureArray.length === 0) {
                this.setState({
                    windSpeedSureOne: 0
                })
            }
            else if (windSpeedSureArray.length > 0 && windSpeedSureArray.length < 4) {
                this.setState({
                    windSpeedSureOne: -4
                })
            }
            else {
                this.setState({
                    windSpeedSureOne: -8
                })
            }
            console.log('wartość dla silnego wiatru, dzień wcześniej', this.state.windSpeedSureOne)

            this.conditionCalc();

        }).catch(err => {
            console.log(err)
        })
    }

    fetchWeather = event => {
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000)
        const hours = searchDate.getHours()
        console.log('ilość godzin:', hours)
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            console.log('dzisiaj', obj)
            const precipIntencityArray = []
            for (let i = 0; i < (hours + 1); i++) {
                if (obj.hourly.data[i].precipIntencity > 0.25) {
                    precipIntencityArray.push(obj.hourly.data[i].precipIntencity)
                }
            }
            console.log('tablica drobnych opadów, dzień sprawdzany', precipIntencityArray)
            if (precipIntencityArray.length === 0) {
                this.setState({
                    precipIntencity: 0,
                    precipIntencityInfo: 'brak drobnych opadów',
                })
            }
            else if (precipIntencityArray.length > 0 && precipIntencityArray.length < 4) {
                this.setState({
                    precipIntencity: 2,
                    precipIntencityInfo: 'przelotne drobne opady',
                })
            }
            else {
                this.setState({
                    precipIntencity: 6,
                    precipIntencityInfo: 'częste drobne opady',
                })
            }
            console.log('wartość drobnych opadów, dzień sprawdzany', this.state.precipIntencity, this.state.precipIntencityInfo)


            const precipSureNormArray = []
            for (let i = 0; i < (hours + 1); i++) {
                if (obj.hourly.data[i].precipIntencity > 1 && obj.hourly.data[i].precipIntencity < 4) {
                    precipSureNormArray.push(obj.hourly.data[i].precipIntencity)
                }
            }
            console.log('tablica średnich opadów, dzień sprawdzany', precipSureNormArray)
            if (precipSureNormArray.length === 0) {
                this.setState({
                    precipSureNorm: 0,
                    precipSureNormInfo: 'brak średnich opadów',
                })
            }
            else if (precipSureNormArray.length > 0 && precipSureNormArray.length < 4) {
                this.setState({
                    precipSureNorm: 4,
                    precipSureNormInfo: 'przelotne średnie opady',
                })
            }
            else {
                this.setState({
                    precipSureNorm: 8,
                    precipSureNormInfo: 'częste średnie opady',
                })
            }
            console.log('wartość średnich opadów, dzień sprawdzany', this.state.precipSureNorm, this.state.precipSureNormInfo)

            const precipSureHardArray = []
            for (let i = 0; i < (hours + 1); i++) {
                if (obj.hourly.data[i].precipIntencity > 4) {
                    precipSureHardArray.push(obj.hourly.data[i].precipIntencity)
                }
            }
            console.log('tablica mocnych opadów, dzień sprawdzany', precipSureHardArray)
            if (precipSureNormArray.length === 0) {
                this.setState({
                    precipSureHard: 0,
                    precipSureHardInfo: 'brak silnych opadów',
                })
            }
            else if (precipSureNormArray.length > 0 && precipSureNormArray.length < 3) {
                this.setState({
                    precipSureHard: 6,
                    precipSureHardInfo: 'przelotne silne opady',
                })
            }
            else {
                this.setState({
                    precipSureHard: 12,
                    precipSureHardInfo: 'częste silne opady',
                })
            }
            console.log('wartość mocnych opadów, dzień sprawdzany', this.state.precipSureHard, this.state.precipSureHardInfo)

            const windSpeedArray = []
            for (let i = 0; i < (hours + 1); i++) {
                if (obj.hourly.data[i].windSpeed > 12 && obj.hourly.data[i].windSpeed < 30) {
                    windSpeedArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            console.log('tablica wiatru, dzień sprawdzany', windSpeedArray)
            if (windSpeedArray.length === 0) {
                this.setState({
                    windSpeed: 0,
                    windSpeedSureInfo: "brak wiatru"
                })
            }
            else if (windSpeedArray.length > 0 && windSpeedArray.length < 4) {
                this.setState({
                    windSpeed: -2,
                    windSpeedSureInfo: "momentami wietrznie"
                })
            }
            else {
                this.setState({
                    windSpeed: -4,
                    windSpeedSureInfo: "wietrznie"
                })
            }
            console.log('wartość dla wiatru, dzień sprawdzany', this.state.windSpeed, this.state.windSpeedSureInfo)

            const windSpeedSureArray = []
            for (let i = 0; i < (hours + 1); i++) {
                if (obj.hourly.data[i].windSpeed > 30) {
                    windSpeedSureArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            console.log('tablica silnego wiatru, dzień sprawdzany', windSpeedSureArray)

            if (windSpeedSureArray.length === 0) {
                this.setState({
                    windSpeedSure: 0,
                    windSpeedSureInfo: "brak silnego wiatru"
                })
            }
            else if (windSpeedSureArray.length > 0 && windSpeedSureArray.length < 4) {
                this.setState({
                    windSpeedSure: -4,
                    windSpeedSureInfo: "momentami bardzo wietrznie"
                })
            }
            else {
                this.setState({
                    windSpeedSure: -8,
                    windSpeedSureInfo: "bardzo wietrznie"
                })
            }
            console.log('wartość dla silnego wiatru, dzień sprawdzany', this.state.windSpeedSure, this.state.windSpeedSureInfo)

            ///temp

            if (obj.currently.temperature < 41) {
                this.setState({
                    currTemp: 2,
                    currTempInfo: "bardzo zimno (mniej niż 5 stopni)"
                })
            }

            else if (obj.currently.temperature > 41 && obj.currently.temperature < 50) {
                this.setState({
                    currTemp: 0,
                    currTempInfo: "zimno (5 - 10 stopni)"
                })
            }

            else if (obj.currently.temperature > 50 && obj.currently.temperature < 53.6) {
                this.setState({
                    currTemp: -2,
                    currTempInfo: "temperatura może być (10 - 12,5 stopni)"
                })
            }

            else if (obj.currently.temperature > 53.6 && obj.currently.temperature < 57.2) {
                this.setState({
                    currTemp: -6,
                    currTempInfo: "temperatura dobra (12,5 - 14 stopni)"
                })
            }

            else if (obj.currently.temperature > 57.2 && obj.currently.temperature < 60.8) {
                this.setState({
                    currTemp: -10,
                    currTempInfo: "temperatura idealna (14 - 16 stopni)"
                })
            }

            else if (obj.currently.temperature > 60.8 && obj.currently.temperature < 62.6) {
                this.setState({
                    currTemp: -4,
                    currTempInfo: "temperatura dobra (16 - 17,5 stopni)"
                })
            }

            else if (obj.currently.temperature > 62.6 && obj.currently.temperature < 68) {
                this.setState({
                    currTemp: 0,
                    currTempInfo: "temperatura może być (17,5 - 20 stopni)"
                })
            }

            else if (obj.currently.temperature > 68 && obj.currently.temperature < 71.6) {
                this.setState({
                    currTemp: 4,
                    currTempInfo: "ciepło (20 - 22,5 stopni)"
                })
            }

            else {
                this.setState({
                    currTemp: 10,
                    currTempInfo: "gorąco (więcej niż 22,5 stopni)"
                })
            }

            console.log('temperatura:', this.state.currTemp)
            console.log('temperatura: opis', this.state.currTempInfo)

            ///humid

            if (obj.currently.humidity < 0.3) {
                this.setState({
                    currHum: -4,
                    currHumInfo: "niska wilgotność powietrza"
                })
            }

            else if (obj.currently.humidity > 0.3 && obj.currently.humidity > 0.5) {
                this.setState({
                    currHum: 0,
                    currHumInfo: "średnia wilgotność powietrza"
                })
            }

            else {
                this.setState({
                    currHum: 4,
                    currHumInfo: "wysoka wilgotność powietrza"
                })
            }

            console.log('wilgotność:', this.state.currHum)
            console.log('wilgotność: opis', this.state.currHumInfo)


        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        //const now = new Date()
        // const year = now.getFullYear()
        // console.log(year)
        // const month = now.getMonth()
        // const day = now.getDate()
        // const hour = now.getHours()
        // const minute = now.getMinutes()
        // const combineTime = `${year}-${month}-${day}-${hour}-${minute}`
        // console.log(now)


        return (
            <div>
                <div className={this.state.class}>
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
                            <button onClick={(e) => {
                                this.fetchLocation(e)
                                this.hideForm()
                            }
                            }>SPRAWDŹ!</button>
                        </div>
                    </nav>
                </div>
                <div className={this.state.class1}>
                    <nav className='formContainer'>
                        <div className='formList'>
                            <div className='form'>
                                <p>tutaj</p>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className={this.state.classError}>
                    <nav className='formContainer'>
                        <div className='formList'>
                            <div className='formErr'>
                                <p className='blue'>Twoje zapytanie nie jest prawidłowe.</p>
                                <p>{'Jeśli nie umiesz pisać lub (co gorsza) nie myślisz - wróć do szkoły.'}</p>
                            </div>
                            <button onClick={(e) => {
                                this.showForm()
                            }
                            }>POWRÓT</button>
                        </div>
                    </nav>
                </div>
            </div >
        );
    }
}
