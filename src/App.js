import React, {Component} from 'react'
import MobileDays from './components/MobileDays';
import NavSearch from './components/navbar';
import cities from './components/capitalcities';
import {convertTemperature, convertTime, filterData} from './helpers/filterWeather'
import BackgroundImage from './components/BackgroundImage';
import Details from "./components/details/Details";
import Load5Days from './components/Load5Days/Load5Days';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isLoading: true,
      city: '',
      position: {
        latitude: null,
          longitude: null
      },
      selected: {}
    };

      this.handleSelectedDay = this.handleSelectedDay.bind(this);
      this.selected = {};
  }


    handleSelectedDay = (data) => {
        const {main, weather, wind, dt_txt, dt} = data;

        const API = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.position.latitude}&lon=${this.state.position.longitude}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
        this.setState({isLoading: true});
        fetch(API)
            .then(response => response.json())
            .then($data => {
                this.setState({
                    weather: $data,
                    city: this.state.city,
                    selected: {
                        data: {
                            city: this.state.city,
                            day: dt.day,
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
                    isLoading: false
                })
            });
    };

    setSearchedCity = (searchedCity) => {
        this.setState({city: searchedCity});
        const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
        this.setState({isLoading: true});
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
                    isLoading: false
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
                            },
                            isLoading: false
                        })
                    })
            })
        }
    }

    render() {
        const {weather, isLoading} = this.state;

        if(isLoading) {
            return <h1>Loading...</h1>
        } else {
            const weatherList = weather && filterData(weather.list);

            return (
                <BackgroundImage className='layer' list={weatherList[0]}>
                    <NavSearch setCity={this.setSearchedCity} cities={cities}/>
                    <MobileDays weather={weatherList} handleSelectedDay={this.handleSelectedDay}/>
                    <div className="weather-data">
                        <Details selected={this.state.selected}/>
                        <Load5Days weatherData={weatherList} />
                    </div>
                </BackgroundImage>
            )
        }

    }

    // getData() {
    //     return {
    //         "cod": "200",
    //         "message": 0,
    //         "cnt": 40,
    //         "list": [{
    //             "dt": 1572285600,
    //             "main": {
    //                 "temp": 291.37,
    //                 "temp_min": 289.54,
    //                 "temp_max": 291.37,
    //                 "pressure": 1012,
    //                 "sea_level": 1012,
    //                 "grnd_level": 847,
    //                 "humidity": 96,
    //                 "temp_kf": 1.83
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    //             "clouds": {"all": 93},
    //             "wind": {"speed": 1.13, "deg": 301},
    //             "rain": {"3h": 0.06},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-28 18:00:00"
    //         }, {
    //             "dt": 1572296400,
    //             "main": {
    //                 "temp": 290.35,
    //                 "temp_min": 288.98,
    //                 "temp_max": 290.35,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 848,
    //                 "humidity": 96,
    //                 "temp_kf": 1.37
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 86},
    //             "wind": {"speed": 1.11, "deg": 291},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-28 21:00:00"
    //         }, {
    //             "dt": 1572307200,
    //             "main": {
    //                 "temp": 288.95,
    //                 "temp_min": 288.03,
    //                 "temp_max": 288.95,
    //                 "pressure": 1011,
    //                 "sea_level": 1011,
    //                 "grnd_level": 846,
    //                 "humidity": 96,
    //                 "temp_kf": 0.92
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    //             "clouds": {"all": 77},
    //             "wind": {"speed": 0.87, "deg": 310},
    //             "rain": {"3h": 0.06},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-29 00:00:00"
    //         }, {
    //             "dt": 1572318000,
    //             "main": {
    //                 "temp": 287.86,
    //                 "temp_min": 287.4,
    //                 "temp_max": 287.86,
    //                 "pressure": 1012,
    //                 "sea_level": 1012,
    //                 "grnd_level": 847,
    //                 "humidity": 95,
    //                 "temp_kf": 0.46
    //             },
    //             "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    //             "clouds": {"all": 26},
    //             "wind": {"speed": 1.29, "deg": 313},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-29 03:00:00"
    //         }, {
    //             "dt": 1572328800,
    //             "main": {
    //                 "temp": 293.26,
    //                 "temp_min": 293.26,
    //                 "temp_max": 293.26,
    //                 "pressure": 1014,
    //                 "sea_level": 1014,
    //                 "grnd_level": 849,
    //                 "humidity": 78,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
    //             "clouds": {"all": 34},
    //             "wind": {"speed": 0.51, "deg": 272},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-29 06:00:00"
    //         }, {
    //             "dt": 1572339600,
    //             "main": {
    //                 "temp": 300.87,
    //                 "temp_min": 300.87,
    //                 "temp_max": 300.87,
    //                 "pressure": 1011,
    //                 "sea_level": 1011,
    //                 "grnd_level": 847,
    //                 "humidity": 48,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01d"}],
    //             "clouds": {"all": 2},
    //             "wind": {"speed": 1.29, "deg": 81},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-29 09:00:00"
    //         }, {
    //             "dt": 1572350400,
    //             "main": {
    //                 "temp": 299.23,
    //                 "temp_min": 299.23,
    //                 "temp_max": 299.23,
    //                 "pressure": 1008,
    //                 "sea_level": 1008,
    //                 "grnd_level": 844,
    //                 "humidity": 54,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
    //             "clouds": {"all": 29},
    //             "wind": {"speed": 1.47, "deg": 46},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-29 12:00:00"
    //         }, {
    //             "dt": 1572361200,
    //             "main": {
    //                 "temp": 291.59,
    //                 "temp_min": 291.59,
    //                 "temp_max": 291.59,
    //                 "pressure": 1009,
    //                 "sea_level": 1009,
    //                 "grnd_level": 845,
    //                 "humidity": 89,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 1.66, "deg": 69},
    //             "rain": {"3h": 5.69},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-29 15:00:00"
    //         }, {
    //             "dt": 1572372000,
    //             "main": {
    //                 "temp": 290.6,
    //                 "temp_min": 290.6,
    //                 "temp_max": 290.6,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 847,
    //                 "humidity": 92,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 1.67, "deg": 320},
    //             "rain": {"3h": 1.25},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-29 18:00:00"
    //         }, {
    //             "dt": 1572382800,
    //             "main": {
    //                 "temp": 289.59,
    //                 "temp_min": 289.59,
    //                 "temp_max": 289.59,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 847,
    //                 "humidity": 93,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 89},
    //             "wind": {"speed": 1.26, "deg": 307},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-29 21:00:00"
    //         }, {
    //             "dt": 1572393600,
    //             "main": {
    //                 "temp": 288.72,
    //                 "temp_min": 288.72,
    //                 "temp_max": 288.72,
    //                 "pressure": 1012,
    //                 "sea_level": 1012,
    //                 "grnd_level": 846,
    //                 "humidity": 93,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 85},
    //             "wind": {"speed": 0.9, "deg": 327},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-30 00:00:00"
    //         }, {
    //             "dt": 1572404400,
    //             "main": {
    //                 "temp": 287.67,
    //                 "temp_min": 287.67,
    //                 "temp_max": 287.67,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 848,
    //                 "humidity": 95,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    //             "clouds": {"all": 69},
    //             "wind": {"speed": 0.06, "deg": 220},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-30 03:00:00"
    //         }, {
    //             "dt": 1572415200,
    //             "main": {
    //                 "temp": 291.02,
    //                 "temp_min": 291.02,
    //                 "temp_max": 291.02,
    //                 "pressure": 1015,
    //                 "sea_level": 1015,
    //                 "grnd_level": 850,
    //                 "humidity": 87,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
    //             "clouds": {"all": 83},
    //             "wind": {"speed": 0.45, "deg": 316},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-30 06:00:00"
    //         }, {
    //             "dt": 1572426000,
    //             "main": {
    //                 "temp": 295.19,
    //                 "temp_min": 295.19,
    //                 "temp_max": 295.19,
    //                 "pressure": 1014,
    //                 "sea_level": 1014,
    //                 "grnd_level": 849,
    //                 "humidity": 77,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 2.52, "deg": 73},
    //             "rain": {"3h": 2.31},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-30 09:00:00"
    //         }, {
    //             "dt": 1572436800,
    //             "main": {
    //                 "temp": 293.1,
    //                 "temp_min": 293.1,
    //                 "temp_max": 293.1,
    //                 "pressure": 1011,
    //                 "sea_level": 1011,
    //                 "grnd_level": 846,
    //                 "humidity": 83,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 1.29, "deg": 13},
    //             "rain": {"3h": 2.56},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-30 12:00:00"
    //         }, {
    //             "dt": 1572447600,
    //             "main": {
    //                 "temp": 294.12,
    //                 "temp_min": 294.12,
    //                 "temp_max": 294.12,
    //                 "pressure": 1010,
    //                 "sea_level": 1010,
    //                 "grnd_level": 846,
    //                 "humidity": 80,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 96},
    //             "wind": {"speed": 0.37, "deg": 198},
    //             "rain": {"3h": 1.69},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-30 15:00:00"
    //         }, {
    //             "dt": 1572458400,
    //             "main": {
    //                 "temp": 289.41,
    //                 "temp_min": 289.41,
    //                 "temp_max": 289.41,
    //                 "pressure": 1014,
    //                 "sea_level": 1014,
    //                 "grnd_level": 849,
    //                 "humidity": 90,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    //             "clouds": {"all": 64},
    //             "wind": {"speed": 0.91, "deg": 303},
    //             "rain": {"3h": 0.37},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-30 18:00:00"
    //         }, {
    //             "dt": 1572469200,
    //             "main": {
    //                 "temp": 288.25,
    //                 "temp_min": 288.25,
    //                 "temp_max": 288.25,
    //                 "pressure": 1014,
    //                 "sea_level": 1014,
    //                 "grnd_level": 848,
    //                 "humidity": 93,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    //             "clouds": {"all": 76},
    //             "wind": {"speed": 1.78, "deg": 306},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-30 21:00:00"
    //         }, {
    //             "dt": 1572480000,
    //             "main": {
    //                 "temp": 287.4,
    //                 "temp_min": 287.4,
    //                 "temp_max": 287.4,
    //                 "pressure": 1012,
    //                 "sea_level": 1012,
    //                 "grnd_level": 847,
    //                 "humidity": 94,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 88},
    //             "wind": {"speed": 1.4, "deg": 320},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-31 00:00:00"
    //         }, {
    //             "dt": 1572490800,
    //             "main": {
    //                 "temp": 287.05,
    //                 "temp_min": 287.05,
    //                 "temp_max": 287.05,
    //                 "pressure": 1014,
    //                 "sea_level": 1014,
    //                 "grnd_level": 848,
    //                 "humidity": 93,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 0.96, "deg": 344},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-31 03:00:00"
    //         }, {
    //             "dt": 1572501600,
    //             "main": {
    //                 "temp": 289.24,
    //                 "temp_min": 289.24,
    //                 "temp_max": 289.24,
    //                 "pressure": 1016,
    //                 "sea_level": 1016,
    //                 "grnd_level": 850,
    //                 "humidity": 87,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 0.77, "deg": 292},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-31 06:00:00"
    //         }, {
    //             "dt": 1572512400,
    //             "main": {
    //                 "temp": 296.07,
    //                 "temp_min": 296.07,
    //                 "temp_max": 296.07,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 849,
    //                 "humidity": 73,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 1.03, "deg": 158},
    //             "rain": {"3h": 1.75},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-31 09:00:00"
    //         }, {
    //             "dt": 1572523200,
    //             "main": {
    //                 "temp": 295.79,
    //                 "temp_min": 295.79,
    //                 "temp_max": 295.79,
    //                 "pressure": 1010,
    //                 "sea_level": 1010,
    //                 "grnd_level": 846,
    //                 "humidity": 73,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d"}],
    //             "clouds": {"all": 88},
    //             "wind": {"speed": 1.77, "deg": 121},
    //             "rain": {"3h": 3.63},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-31 12:00:00"
    //         }, {
    //             "dt": 1572534000,
    //             "main": {
    //                 "temp": 293.52,
    //                 "temp_min": 293.52,
    //                 "temp_max": 293.52,
    //                 "pressure": 1011,
    //                 "sea_level": 1011,
    //                 "grnd_level": 847,
    //                 "humidity": 88,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d"}],
    //             "clouds": {"all": 67},
    //             "wind": {"speed": 0.4, "deg": 182},
    //             "rain": {"3h": 4.13},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-10-31 15:00:00"
    //         }, {
    //             "dt": 1572544800,
    //             "main": {
    //                 "temp": 289.57,
    //                 "temp_min": 289.57,
    //                 "temp_max": 289.57,
    //                 "pressure": 1014,
    //                 "sea_level": 1014,
    //                 "grnd_level": 849,
    //                 "humidity": 92,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    //             "clouds": {"all": 71},
    //             "wind": {"speed": 1.07, "deg": 295},
    //             "rain": {"3h": 1.88},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-31 18:00:00"
    //         }, {
    //             "dt": 1572555600,
    //             "main": {
    //                 "temp": 288.43,
    //                 "temp_min": 288.43,
    //                 "temp_max": 288.43,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 848,
    //                 "humidity": 94,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 93},
    //             "wind": {"speed": 1.84, "deg": 316},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-10-31 21:00:00"
    //         }, {
    //             "dt": 1572566400,
    //             "main": {
    //                 "temp": 287.41,
    //                 "temp_min": 287.41,
    //                 "temp_max": 287.41,
    //                 "pressure": 1012,
    //                 "sea_level": 1012,
    //                 "grnd_level": 846,
    //                 "humidity": 95,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 92},
    //             "wind": {"speed": 1.08, "deg": 318},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-11-01 00:00:00"
    //         }, {
    //             "dt": 1572577200,
    //             "main": {
    //                 "temp": 287,
    //                 "temp_min": 287,
    //                 "temp_max": 287,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 848,
    //                 "humidity": 95,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 0.42, "deg": 282},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-11-01 03:00:00"
    //         }, {
    //             "dt": 1572588000,
    //             "main": {
    //                 "temp": 290.73,
    //                 "temp_min": 290.73,
    //                 "temp_max": 290.73,
    //                 "pressure": 1015,
    //                 "sea_level": 1015,
    //                 "grnd_level": 850,
    //                 "humidity": 86,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 0.33, "deg": 241},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-01 06:00:00"
    //         }, {
    //             "dt": 1572598800,
    //             "main": {
    //                 "temp": 294.74,
    //                 "temp_min": 294.74,
    //                 "temp_max": 294.74,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 849,
    //                 "humidity": 77,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 1.97, "deg": 137},
    //             "rain": {"3h": 1.88},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-01 09:00:00"
    //         }, {
    //             "dt": 1572609600,
    //             "main": {
    //                 "temp": 294.23,
    //                 "temp_min": 294.23,
    //                 "temp_max": 294.23,
    //                 "pressure": 1010,
    //                 "sea_level": 1010,
    //                 "grnd_level": 846,
    //                 "humidity": 84,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 2.06, "deg": 152},
    //             "rain": {"3h": 4.63},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-01 12:00:00"
    //         }, {
    //             "dt": 1572620400,
    //             "main": {
    //                 "temp": 292.81,
    //                 "temp_min": 292.81,
    //                 "temp_max": 292.81,
    //                 "pressure": 1010,
    //                 "sea_level": 1010,
    //                 "grnd_level": 846,
    //                 "humidity": 91,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 0.12, "deg": 160},
    //             "rain": {"3h": 3.19},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-01 15:00:00"
    //         }, {
    //             "dt": 1572631200,
    //             "main": {
    //                 "temp": 289.97,
    //                 "temp_min": 289.97,
    //                 "temp_max": 289.97,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 848,
    //                 "humidity": 91,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    //             "clouds": {"all": 100},
    //             "wind": {"speed": 1.45, "deg": 314},
    //             "rain": {"3h": 1.69},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-11-01 18:00:00"
    //         }, {
    //             "dt": 1572642000,
    //             "main": {
    //                 "temp": 288.15,
    //                 "temp_min": 288.15,
    //                 "temp_max": 288.15,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 847,
    //                 "humidity": 94,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    //             "clouds": {"all": 52},
    //             "wind": {"speed": 1.74, "deg": 312},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-11-01 21:00:00"
    //         }, {
    //             "dt": 1572652800,
    //             "main": {
    //                 "temp": 286.94,
    //                 "temp_min": 286.94,
    //                 "temp_max": 286.94,
    //                 "pressure": 1012,
    //                 "sea_level": 1012,
    //                 "grnd_level": 846,
    //                 "humidity": 95,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    //             "clouds": {"all": 36},
    //             "wind": {"speed": 1.02, "deg": 300},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-11-02 00:00:00"
    //         }, {
    //             "dt": 1572663600,
    //             "main": {
    //                 "temp": 286.34,
    //                 "temp_min": 286.34,
    //                 "temp_max": 286.34,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 847,
    //                 "humidity": 94,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    //             "clouds": {"all": 97},
    //             "wind": {"speed": 0.91, "deg": 12},
    //             "sys": {"pod": "n"},
    //             "dt_txt": "2019-11-02 03:00:00"
    //         }, {
    //             "dt": 1572674400,
    //             "main": {
    //                 "temp": 292.02,
    //                 "temp_min": 292.02,
    //                 "temp_max": 292.02,
    //                 "pressure": 1015,
    //                 "sea_level": 1015,
    //                 "grnd_level": 850,
    //                 "humidity": 79,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    //             "clouds": {"all": 89},
    //             "wind": {"speed": 0.85, "deg": 199},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-02 06:00:00"
    //         }, {
    //             "dt": 1572685200,
    //             "main": {
    //                 "temp": 297.73,
    //                 "temp_min": 297.73,
    //                 "temp_max": 297.73,
    //                 "pressure": 1013,
    //                 "sea_level": 1013,
    //                 "grnd_level": 849,
    //                 "humidity": 53,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 86},
    //             "wind": {"speed": 1.69, "deg": 165},
    //             "rain": {"3h": 0.69},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-02 09:00:00"
    //         }, {
    //             "dt": 1572696000,
    //             "main": {
    //                 "temp": 297.44,
    //                 "temp_min": 297.44,
    //                 "temp_max": 297.44,
    //                 "pressure": 1010,
    //                 "sea_level": 1010,
    //                 "grnd_level": 846,
    //                 "humidity": 56,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 65},
    //             "wind": {"speed": 2.43, "deg": 158},
    //             "rain": {"3h": 1.5},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-02 12:00:00"
    //         }, {
    //             "dt": 1572706800,
    //             "main": {
    //                 "temp": 294.85,
    //                 "temp_min": 294.85,
    //                 "temp_max": 294.85,
    //                 "pressure": 1010,
    //                 "sea_level": 1010,
    //                 "grnd_level": 846,
    //                 "humidity": 77,
    //                 "temp_kf": 0
    //             },
    //             "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    //             "clouds": {"all": 30},
    //             "wind": {"speed": 0.64, "deg": 158},
    //             "rain": {"3h": 1.5},
    //             "sys": {"pod": "d"},
    //             "dt_txt": "2019-11-02 15:00:00"
    //         }],
    //         "city": {
    //             "id": 7595653,
    //             "name": "Nyakabanda",
    //             "coord": {"lat": -1.9643, "lon": 30.1106},
    //             "country": "RW",
    //             "timezone": 7200,
    //             "sunrise": 1572233883,
    //             "sunset": 1572277710
    //         }
    //     }
    // }
}
