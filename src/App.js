import React, {Component} from 'react'
import Details from "./components/details/Details";

export default class App extends Component {
    state = {
        selected: {
            data: {}
        },
    };

    componentDidMount() {

        const API_KEY = "e8d8f05325053081806d1b5d75196abf";
        const city = "London";
        const cors = "https://cors-anywhere.herokuapp.com/";
        fetch(`${cors}http://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            .then(resp => resp.json())
            .then(({list}) => {
                const {main, weather, wind, dt_txt} = list[0];
                this.setState({
                    selected: {
                        data: {
                            city: "London",
                            day: "Today",
                            date: dt_txt,
                            iconUrl: "http://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png",
                            type: weather[0].main,
                            averageTemp: `${main.temp}°C`,
                            minTemp: `${main.temp_min}°C`,
                            maxTemp: `${main.temp_max}°C`,
                            humidity: `${main.humidity}%`,
                            Wind: `${wind.speed} km/h`,
                            Pressure: `${main.pressure} hpa`
                        }
                    }
                });
            })
            .catch(err => console.error(err));

    }

    render() {

        return (
            <div>
                <h1>weather app</h1>
                {/*<NavBar searchHandler = {this.searchHandler} />*/}
                <Details selected={this.state.selected}/>
                {/*<List list={this.state.list}/>*/}
            </div>
        )
    }
}
