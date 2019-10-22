import React, {Component} from 'react'
import Details from "./components/details/Details";

export default class App extends Component {
    state = {
        selected: {data: {}},
        list: []
    };

    // searchHandler(e) {
    //     this.setState({
    //         selected: e.target.value
    //     })
    // };

    componentDidMount(): void {
        const API_KEY = "b6907d289e10d714a6e88b30761fae22";
        const city = "London";
        // const country = "US";
        const cors = "https://cors-anywhere.herokuapp.com/";
        fetch(`${cors}https://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then(resp => resp.json())
            .then(results => {
                console.log(results);
                const {main, wind, dt, name, weather} = results;
                const {humidity, pressure, temp_min, temp_max, temp} = main;
                const {main: main1, icon} = weather[0];
                this.setState({
                    selected: {
                        data: {
                            city: name,
                            day: "Today",
                            date: dt,
                            icon: icon,
                            type: main1,
                            averageTemp: `${temp}°C`,
                            minTemp: `${temp_min}°C`,
                            maxTemp: `${temp_max}°C`,
                            humidity: `${humidity}%`,
                            Wind: `${wind.speed} km/h`,
                            Pressure: `${pressure} hpa`
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
