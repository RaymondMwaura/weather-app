import React, { Component } from 'react';
import NavSearch from './components/navbar';
import cities from './components/capitalcities';
import {convertTemperature, convertTime, filterData} from './helpers/filterWeather'
import BackgroundImage from './components/BackgroundImage';
import Details from "./components/Details/Details";
import Load5Days from './components/Load5Days/Load5Days';
import Preloader from './components/Preloader';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            isLoading: true,
            isSearching: false,
            search: '',
            city: '',
            position: {
                latitude: null,
                longitude: null,
            },
            selected: {}
        };
    }

    setSearchedCity = (searchedCity) => {
        this.setState({city: searchedCity});
        // console.log(this.state.city)
        const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
        this.setState({isSearching: true});
        fetch(API)
            .then(response => response.json())
            .then(data => {
                const {main, weather, wind, dt_txt, dt} = data.list[0];
                this.setState({
                    weather: data,
                    city: this.state.city,
                    selected: {
                        data: {
                            city: this.state.city,
                            day: convertTime(dt).day,
                            date: dt_txt,
                            iconUrl: "http://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png",
                            type: weather[0].main,
                            averageTemp: `${convertTemperature(main.temp)}°C`,
                            minTemp: `${convertTemperature(main.temp_min)}°C`,
                            maxTemp: `${convertTemperature(main.temp_max)}°C`,
                            humidity: `${main.humidity}%`,
                            Wind: `${wind.speed} km/h`,
                            Pressure: `${main.pressure} hpa`
                        }
                    },
                    isSearching: false,
                })
            })
    };
    async componentDidMount() {
        const geo = navigator.geolocation;

        if (geo) {
            const position = new Promise((resolve, reject) => {

                geo.getCurrentPosition(pos => {

                    resolve(this.setState({
                        position: {
                            latitude: (pos.coords.latitude).toFixed(1),
                            longitude: (pos.coords.longitude).toFixed(1),
                        }
                    }))
                })
            });
            await position.then(state => {
                const API = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.position.latitude}&lon=${this.state.position.longitude}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
                this.setState({isLoading: true});
                fetch(API)
                    .then(response => response.json())
                    .then(data => {
                        const {main, weather, wind, dt_txt, dt} = data.list[0];
                        this.setState({
                            weather: data,
                            city: data.city.name,
                            isLoading: false,
                            selected: {
                                data: {
                                    city: data.city.name,
                                    day: convertTime(dt).day,
                                    date: dt_txt,
                                    iconUrl: "http://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png",
                                    type: weather[0].main,
                                    averageTemp: `${convertTemperature(main.temp)}°C`,
                                    minTemp: `${convertTemperature(main.temp_min)}°C`,
                                    maxTemp: `${convertTemperature(main.temp_max)}°C`,
                                    humidity: `${main.humidity}%`,
                                    Wind: `${wind.speed} km/h`,
                                    Pressure: `${main.pressure} hpa`
                                }
                            }
                        })
                    })
            })
        }
    }

    render() {
        const {weather, isLoading, isSearching} = this.state;
        const weatherList = weather && filterData(weather.list);

        if(isLoading) {
            return <Preloader />
        } else if (isSearching) {
          return (
            <BackgroundImage className='layer' list={weatherList[0]}>
                  <Preloader>
                    <NavSearch setCity={this.setSearchedCity} cities={cities}/>
                    <div className="weather-data">
                        <Details selected={this.state.selected}/>
                        <Load5Days weatherData={weatherList} />
                    </div>
                    </Preloader>
              </BackgroundImage>
        )
        }
        else {
            return (
                <BackgroundImage className='layer' list={weatherList[0]}>
                    <NavSearch setCity={this.setSearchedCity} cities={cities}/>
                    <div className="weather-data">
                        <Details selected={this.state.selected}/>
                        <Load5Days weatherData={weatherList} />
                    </div>
                </BackgroundImage>
            )
        }

    }
}
