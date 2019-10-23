import React, { Component } from 'react'
import './App.css'
import {filterData} from './helpers/filterWeather'
import BackgroundImage from './components/BackgroundImage';



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isLoading: true,
      city: '',
      position: {
        latitude: null,
        longtitude: null,
      }
    };
    
  }
  
  setSearchedCity = (searchedCity) => {
    this.setState({city: searchedCity})
  }

  async componentDidMount() {
    const geo = navigator.geolocation;
    if (geo && this.state.city.length === 0) {
      const position = new Promise((resolve, reject)=>{

        geo.getCurrentPosition(pos => {
          console.log("to be resolved", this.state)

          resolve(this.setState({
            position: {
              latitude: (pos.coords.latitude).toFixed(1),
              longtitude: (pos.coords.longitude).toFixed(1),
            }
          }))
        })
      })
      position.then(state => {
        const API = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.position.latitude}&lon=${this.state.position.latitude}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ weather: data, city: data.city.name, isLoading: false }))
      })
    } else {
      const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ weather: data, isLoading: false }))
    }  
  }


  render() {
    const { weather, isLoading } = this.state
    console.log(weather);
    
    if(isLoading) {
      return <h1>Loading...</h1>
    } else {
       const weatherList = weather && filterData(weather.list);
       console.log(weatherList);
       
    return (
      <BackgroundImage className='layer' list={weatherList[0]}>

      </BackgroundImage>
    )
    }
    
  }
}
