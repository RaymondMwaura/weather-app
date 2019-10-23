import React, { Component } from 'react'
import {filterData} from './helpers/filterWeather'
import MobileDays from './components/MobileDays';



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isLoading: true,
      city: 'Kigali',
    };
    
  }

  handleClick(data){
    console.log('HERE COMES THE RESULT: ', data)
  }
  
  componentDidMount() {
    const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=047ef33a4d9c38d3dddaa4b631c96d45`;
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ weather: data, isLoading: false }))
      // .catch(error => console.log(error)
      // )
      
  }


  render() {
    const { weather, isLoading } = this.state
    
    
    if(isLoading) {
      return <h1>Loading...</h1>
    } else {
      // const weatherList = filterData(weather.list)
       const weatherList = weather && filterData(weather.list);
      
       // console.log(weatherList);
       
    return (
      <div>
        <h1>weather app</h1>

        {/* small screen day component, passing weather data and day click handler  */}
        <MobileDays weather={weatherList} handleClick={this.handleClick}></MobileDays>

      </div>
    )
    }
    
  }
}
