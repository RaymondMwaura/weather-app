/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { filterData } from './helpers/filterWeather';
import Load5Days from './components/Load5Days/Load5Days';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isLoading: true,
      city: 'Kigali',
    };
  }

  componentDidMount() {
    const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
    // this.setState({ isLoading: true });
    fetch(API)
      .then((response) => response.json())
      .then((data) => this.setState({ weather: data, isLoading: false }));
  }

  render() {
    const { weather, isLoading } = this.state;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    const weatherList = filterData(weather.list);
    return (
      <div>
        <h1>weather app</h1>
        <Load5Days weatherData={weatherList} />
      </div>
    );
  }
}
