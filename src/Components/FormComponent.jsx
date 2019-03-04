import React, { Component } from "react";
import './../Cssy/Form.css';

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'visible',
            classWait: 'hidden',
            classError: 'hidden',
            classError2: 'hidden',
            classResponse: 'hidden',
            place: 'Jelenia Góra',
            date: '2019-03-04T12:00',
            temp: 14,
            cityLat: '',
            cityLon: '',

            precipIntensityTwo: '',

            precipIntensityOne: '',
            windSpeedOne: '',
            windSpeedSureOne: '',

            precipIntensity: '',
            precipIntensityInfo: '',
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
            arrayDesc: [],
            respNumber: 0,
            condStatus: "",
            condDesc: "",
            lis: ""
        }
    }

    conditionCalc = () => {

        setTimeout(() => {

            if (this.state.precipIntensityTwo === 2) {
                this.setState({
                    arayResult: [...this.state.arayResult, 2],
                    arrayDesc: [...this.state.arrayDesc, 'padało dwa dni wcześniej']
                });
            }

            if (this.state.precipIntensityTwo === 4) {
                this.setState({
                    arayResult: [...this.state.arayResult, 4],
                    arrayDesc: [...this.state.arrayDesc, 'lało dwa dni wcześniej']
                });
            }

            if (this.state.precipIntensityOne === 2) {
                this.setState({
                    arayResult: [...this.state.arayResult, 4],
                    arrayDesc: [...this.state.arrayDesc, 'padało dzień wczesniej']
                });
            }

            if (this.state.precipIntensityOne === 4) {
                this.setState({
                    arayResult: [...this.state.arayResult, 6],
                    arrayDesc: [...this.state.arrayDesc, 'lało dzień wcześniej']
                });
            }

            if (this.state.precipIntensityTwo >= 2 && this.state.precipIntensityOne === 0 && (this.state.windSpeedOne <= -2 || this.state.windSpeedSureOne <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'dzień wcześniej wiatr szuszył skały']
                });
            }

            if (this.state.precipIntensityTwo >= 2 && this.state.precipIntensityOne === 0 && (this.state.windSpeedOne <= -4 || this.state.windSpeedSureOne <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'dzień wcześniej wiatr mocno szuszył skały']
                });
            }

            if (this.state.precipIntensityOne >= 2 && (this.state.windSpeed <= -2 || this.state.windSpeedSure <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'po deszczu wiatr szuszy skały']
                });
            }

            if (this.state.precipIntensityOne >= 2 && (this.state.windSpeed === -4 || this.state.windSpeedSure <= -4)) {
                this.setState({
                    arayResult: [...this.state.arayResult, -2],
                    arrayDesc: [...this.state.arrayDesc, 'po deszczu wiatr mocno szuszy skały']
                });
            }

            //current conditions

            if ((this.state.precipIntensity + this.state.precipSureNorm + this.state.precipSureHard) >= 6) {
                this.setState({
                    windSpeed: 0,
                    windSpeedSure: 0,
                    currTemp: 0,
                });
            }

            this.setState({
                arayResult: [...this.state.arayResult, this.state.precipIntensity, this.state.precipSureNorm, this.state.precipSureHard, this.state.windSpeed, this.state.windSpeedSure, this.state.currTemp, this.state.currHum],
                arrayDesc: [...this.state.arrayDesc, this.state.precipIntensityInfo, this.state.precipSureNormInfo, this.state.precipSureHardInfo, this.state.windSpeedInfo, this.state.windSpeedSureInfo, this.state.currTempInfo, this.state.currHumInfo],
            });

            console.log('wyniki: ', this.state.arayResult)
            console.log('opisy: ', this.state.arrayDesc)

            this.setState({
                respNumber: this.state.arayResult.reduce((a, b) => {
                    return a + b
                }, 0)
            });

            console.log('liczba opisująca warun: ', this.state.respNumber)

            if (this.state.respNumber >= 10) {
                this.setState({
                    condStatus: "BEZNADZIEJNY",
                    condDesc: "Lepiej zostań i ładuj na panelu."
                });
            }

            if (this.state.respNumber >= 4 && this.state.respNumber < 10) {
                this.setState({
                    condStatus: "KIEPSKI",
                    condDesc: "Może rower albo kajaki?"
                });
            }

            if (this.state.respNumber > 0 && this.state.respNumber < 4) {
                this.setState({
                    condStatus: "SŁABY",
                    condDesc: "Może być ciężko ..."
                });
            }

            if (this.state.respNumber >= -4 && this.state.respNumber <= 0) {
                this.setState({
                    condStatus: "DOBRY",
                    condDesc: "Skóra będzie się zacierać"
                });
            }

            if (this.state.respNumber >= -8 && this.state.respNumber < -4) {
                this.setState({
                    condStatus: "ŚWIETNY",
                    condDesc: "Już spakowany? Nie zastanawiaj się długo, jedź!"
                });
            }

            if (this.state.respNumber < -8) {
                this.setState({
                    condStatus: "REWELACYJNY",
                    condDesc: "Ciśnij na projekt, teraz na bank puści!!!"
                });
            }

            console.log('warun: ', this.state.condStatus)
            console.log('opis warunu : ', this.state.condDesc)

            this.liSetUp()
            this.showResultForm()

        }, 1000);
    }

    liSetUp = () => {
        const lis = this.state.arrayDesc.map((elem, index) => (
            <li key={index}>{elem}</li>
        ))
        this.setState({
            lis: lis
        });
    }


    showResultForm = () => {
        this.setState({
            classWait: 'hidden',
            classResponse: 'visible'
        });
    }

    hideForm = () => {
        this.setState({
            class: 'hidden',
            classWait: 'visible'
        });
    }

    showForm = () => {
        this.setState({
            class: 'visible',
            classWait: 'hidden',
            classError: 'hidden',
            classError2: 'hidden',
            classResponse: 'hidden',
            arayResult: [],
            arrayDesc: [],
            respNumber: 0,
            condStatus: "",
            condDesc: "",
            temp: 14,
            currTempInfo: '',
            currTemp: ''
        });
    }

    formCleaner = () => {
        if (this.state.temp >= 0 && this.state.temp <= 9) {
            const tempKonkat = "0" + this.state.temp
            this.setState({
                temp: tempKonkat
            });
        }
    }

    changeHandlerTemp = event => {
        this.setState({
            temp: event.target.value
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
                cityLat: obj.hits[0].point.lat,
                cityLon: obj.hits[0].point.lng,
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
                classWait: 'hidden',
                classError: 'visible'
            });
        })
    }

    fetchPastWeatherTwoDayAgo = () => {
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000) - 172800
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            //console.log('dwa dni wcześniej', obj)
            const precipIntensityArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].precipIntensity > 0.025) {
                    precipIntensityArray.push(obj.hourly.data[i].precipIntensity)
                }
            }
            //console.log('tablica opadów, dwa dni wcześniej', precipIntensityArray)
            if (precipIntensityArray.length === 0) {
                this.setState({
                    precipIntensityTwo: 0
                })
            }
            else if (precipIntensityArray.length > 0 && precipIntensityArray.length < 4) {
                this.setState({
                    precipIntensityTwo: 2
                })
            }
            else {
                this.setState({
                    precipIntensityTwo: 4
                })
            }
            // console.log('wartość dla opadów, dwa dni wcześniej', this.state.precipIntensityTwo)

        }).catch(err => {
            console.log(err)
            this.setState({
                classWait: 'hidden',
                classError2: 'visible'
            });
        })
    }

    fetchPastWeatherOneDayAgo = () => {
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000) - 86400
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            //console.log('dzień wcześniej', obj)
            const precipIntensityArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].precipIntensity > 0.015) {
                    precipIntensityArray.push(obj.hourly.data[i].precipIntensity)
                }
            }
            //console.log('tablica opadów, dzień wcześniej', precipIntensityArray)
            if (precipIntensityArray.length === 0) {
                this.setState({
                    precipIntensityOne: 0
                })
            }
            else if (precipIntensityArray.length > 0 && precipIntensityArray.length < 4) {
                this.setState({
                    precipIntensityOne: 2
                })
            }
            else {
                this.setState({
                    precipIntensityOne: 4
                })
            }
            //console.log('wartość opadów', this.state.precipIntensityOne)

            const windSpeedArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].windSpeed > 12 && obj.hourly.data[i].windSpeed < 30) {
                    windSpeedArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            //console.log('tablica wiatru, dzień wcześniej', windSpeedArray)
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
            //console.log('wartość dla wiatru, dzień wcześniej', this.state.windSpeedOne)

            const windSpeedSureArray = []
            for (let i = 0; i < 24; i++) {
                if (obj.hourly.data[i].windSpeed > 30) {
                    windSpeedSureArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            //console.log('tablica silnego wiatru, dzień wcześniej', windSpeedSureArray)
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
            //console.log('wartość dla silnego wiatru, dzień wcześniej', this.state.windSpeedSureOne)

            this.conditionCalc();

        }).catch(err => {
            console.log(err)
            this.setState({
                classWait: 'hidden',
                classError2: 'visible'
            });
        })
    }

    fetchWeather = () => {
        const searchDate = new Date(this.state.date)
        const searchDateNumber = Math.round(searchDate.getTime() / 1000)
        const hours = searchDate.getHours()
        console.log('ilość godzin:', hours)
        const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fdc3afa63c316609cb321c3c33772d51/' + this.state.cityLat + ',' + this.state.cityLon + ',' + searchDateNumber
        fetch(url).then(r => r.json()).then(obj => {
            console.log('dzisiaj', obj)
            const precipIntensityArray = []
            for (let i = 0; i < (hours); i++) {
                if (obj.hourly.data[i].precipIntensity > 0.025) {
                    precipIntensityArray.push(obj.hourly.data[i].precipIntensity)
                }
            }
            //console.log('tablica drobnych opadów, dzień sprawdzany', precipIntensityArray)
            if (precipIntensityArray.length === 0) {
                this.setState({
                    precipIntensity: 0,
                    precipIntensityInfo: 'brak drobnych opadów',
                })
            }
            else if (precipIntensityArray.length > 0 && precipIntensityArray.length < 4) {
                this.setState({
                    precipIntensity: 2,
                    precipIntensityInfo: 'przelotne drobne opady',
                })
            }
            else {
                this.setState({
                    precipIntensity: 6,
                    precipIntensityInfo: 'częste drobne opady',
                })
            }
            //console.log('wartość drobnych opadów, dzień sprawdzany', this.state.precipIntensity, this.state.precipIntensityInfo)


            const precipSureNormArray = []
            for (let i = 0; i < (hours); i++) {
                if (obj.hourly.data[i].precipIntensity >= 0.1 && obj.hourly.data[i].precipIntensity < 0.4) {
                    precipSureNormArray.push(obj.hourly.data[i].precipIntensity)
                }
            }
            //console.log('tablica średnich opadów, dzień sprawdzany', precipSureNormArray)
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
            //console.log('wartość średnich opadów, dzień sprawdzany', this.state.precipSureNorm, this.state.precipSureNormInfo)

            const precipSureHardArray = []
            for (let i = 0; i < (hours + 1); i++) {
                if (obj.hourly.data[i].precipIntensity >= 0.4) {
                    precipSureHardArray.push(obj.hourly.data[i].precipIntensity)
                }
            }
            //console.log('tablica mocnych opadów, dzień sprawdzany', precipSureHardArray)
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
            //console.log('wartość mocnych opadów, dzień sprawdzany', this.state.precipSureHard, this.state.precipSureHardInfo)

            const windSpeedArray = []
            for (let i = 0; i < (hours); i++) {
                if (obj.hourly.data[i].windSpeed > 12 && obj.hourly.data[i].windSpeed < 30) {
                    windSpeedArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            //console.log('tablica wiatru, dzień sprawdzany', windSpeedArray)
            if (windSpeedArray.length === 0) {
                this.setState({
                    windSpeed: 0,
                    windSpeedInfo: "brak wiatru"
                })
            }
            else if (windSpeedArray.length > 0 && windSpeedArray.length < 4) {
                this.setState({
                    windSpeed: -2,
                    windSpeedInfo: "momentami lekki wiatr"
                })
            }
            else {
                this.setState({
                    windSpeed: -4,
                    windSpeedInfo: "wietrznie"
                })
            }
            //console.log('wartość dla wiatru, dzień sprawdzany', this.state.windSpeed, this.state.windSpeedInfo)

            const windSpeedSureArray = []
            for (let i = 0; i < (hours); i++) {
                if (obj.hourly.data[i].windSpeed > 30) {
                    windSpeedSureArray.push(obj.hourly.data[i].windSpeed)
                }
            }
            //console.log('tablica silnego wiatru, dzień sprawdzany', windSpeedSureArray)

            if (windSpeedSureArray.length === 0) {
                this.setState({
                    windSpeedSure: 0,
                    windSpeedSureInfo: "brak silnego wiatru"
                })
            }
            else if (windSpeedSureArray.length > 0 && windSpeedSureArray.length < 4) {
                this.setState({
                    windSpeedSure: -4,
                    windSpeedSureInfo: "momentami silny wiatr"
                })
            }
            else {
                this.setState({
                    windSpeedSure: -8,
                    windSpeedSureInfo: "bardzo wietrznie"
                })
            }

            const currTempCelsius = ((obj.currently.temperature - 32) * (5 / 9)).toFixed(2);

            if (currTempCelsius <= this.state.temp - 5.5) {
                this.setState({
                    currTemp: 8,
                    currTempInfo: `okrutnie zimno: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 5.5 && currTempCelsius <= this.state.temp - 4.5) {
                this.setState({
                    currTemp: 6,
                    currTempInfo: `strasznie zimno: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 4.5 && currTempCelsius <= this.state.temp - 3.5) {
                this.setState({
                    currTemp: 4,
                    currTempInfo: `zdecydowanie za zimno: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 3.5 && currTempCelsius <= this.state.temp - 2.5) {
                this.setState({
                    currTemp: 2,
                    currTempInfo: `za zimno: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 2.5 && currTempCelsius <= this.state.temp - 2) {
                this.setState({
                    currTemp: 0,
                    currTempInfo: `trochę za zimno: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 2 && currTempCelsius <= this.state.temp - 1.5) {
                this.setState({
                    currTemp: -2,
                    currTempInfo: `odrobinę za zimno: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 1.5 && currTempCelsius <= this.state.temp - 1) {
                this.setState({
                    currTemp: -4,
                    currTempInfo: `temperatura dobra :  ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 1 && currTempCelsius <= this.state.temp - 0.5) {
                this.setState({
                    currTemp: -6,
                    currTempInfo: `temperatura prawie idealna: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > this.state.temp - 0.5 && currTempCelsius < this.state.temp) {
                this.setState({
                    currTemp: -8,
                    currTempInfo: `temperatura idealna: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius > (this.state.temp) && currTempCelsius < Number(this.state.temp) + 0.5) {
                this.setState({
                    currTemp: -8,
                    currTempInfo: `temperatura idealna: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 0.5 && currTempCelsius < Number(this.state.temp) + 1) {
                this.setState({
                    currTemp: -6,
                    currTempInfo: `temperatura prawie idealna: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 1 && currTempCelsius < Number(this.state.temp) + 1.5) {
                this.setState({
                    currTemp: -4,
                    currTempInfo: `temperatura dobra : ${currTempCelsius} 1`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 1.5 && currTempCelsius < Number(this.state.temp) + 2) {
                this.setState({
                    currTemp: -2,
                    currTempInfo: `odrobinę za ciepło: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 2 && currTempCelsius < Number(this.state.temp) + 2.5) {
                this.setState({
                    currTemp: 0,
                    currTempInfo: `trochę za ciepło: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 2.5 && currTempCelsius < Number(this.state.temp) + 3.5) {
                this.setState({
                    currTemp: 2,
                    currTempInfo: `za ciepło: ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 3.5 && currTempCelsius < Number(this.state.temp) + 4.5) {
                this.setState({
                    currTemp: 4,
                    currTempInfo: `stanowczo za ciepło:  ${currTempCelsius}`,
                })
            }

            else if (currTempCelsius >= Number(this.state.temp) + 4.5 && currTempCelsius < Number(this.state.temp) + 5.5) {
                this.setState({
                    currTemp: 6,
                    currTempInfo: `gorąco : ${currTempCelsius}`,
                })
            }

            else {
                this.setState({
                    currTemp: 8,
                    currTempInfo: `stanowczo za gorąco : ${currTempCelsius}`,
                })
            }
            console.log('this.state.temp', this.state.temp)
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
            this.setState({
                classWait: 'hidden',
                classError2: 'visible'
            });
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
                            <form className='form'>
                                <div>temperatura</div>
                                <input
                                    className="inp"
                                    type="number"
                                    value={this.state.temp}
                                    name="temp"
                                    onChange={this.changeHandlerTemp}
                                    min={-15}
                                    max={25}
                                />
                            </form>
                            <button onClick={(e) => {
                                this.formCleaner()
                                this.fetchLocation(e)
                                this.hideForm()
                            }
                            }>SPRAWDŹ!</button>
                        </div>
                    </nav>
                </div>
                <div className={this.state.classWait}>
                    <nav className='formContainer'>
                        <div className='formList'>
                            <div className='form'>
                                <p>Czekaj</p>
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
                <div className={this.state.classError2}>
                    <nav className='formContainer'>
                        <div className='formList'>
                            <div className='formErr'>
                                <p className='blue'>Bardzo nam przykro. Wystąpił problem z pobraniem danych.</p>
                                <p>{'Wróć za jakiś czas i spróbuj ponownie'}</p>
                            </div>
                            <button onClick={(e) => {
                                this.showForm()
                            }
                            }>POWRÓT</button>
                        </div>
                    </nav>
                </div>
                <div className={this.state.classResponse}>
                    <nav className='formContainer'>
                        <div className='formList'>
                            <div className='formErr'>
                                <p>Prognozowany warun: <span className='blue'>{this.state.condStatus}</span></p>
                                <p>{this.state.condDesc}</p>
                            </div>
                            <div className='formUl'>
                                <ul>
                                    {this.state.lis}
                                </ul>
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


// When classified according to amount of precipitation, rain can be divided into:[1]

// * very light rain &#8212; when the precipitation rate is < 0.25 mm/hour
// * light rain &#8212; when the precipitation rate is between 0.25 mm/hour -
// 1.0mm/hour
// * moderate rain &#8212; when the precipitation rate is between 1.0 mm/hour -
// 4.0mm/hour
// * heavy rain &#8212; when the precipitation rate is between 4.0 mm/hour -
// 16.0mm/hour
// * very heavy rain &#8212; when the precipitation rate is between 16.0 mm/hour -
// 50mm/hour
// * extreme rain &#8212; when the precipitation rate is > 50.0 mm/hour