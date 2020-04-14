import React, {useState} from 'react';
import {convertTemperature} from '../../helpers/filterWeather';
import './Load5Days.css';

const Load5Days = ({ weatherData }) => {

    weatherData = weatherData.filter(
        (d, idx) => idx !== 0 && idx !== weatherData.indexOf(weatherData[weatherData.length-1])
    );

    const [selected, setSelected] = useState({});

    const isMobile = () => window.screen.width < 600;

    const dataDesktop = weatherData.map((day, index) => (
        <tr className="day" key={index} onClick={() => setSelected(day)}>
          <td>{day.dt.day}</td>
          <td><img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} /></td>
          <td>
            {convertTemperature(day.main.temp)}
            {' '}
            <sup className="temperatureSymbol">o</sup>
            C
          </td>
          <td>{day.weather[0].description}</td>
          <td>
            {day.clouds.all}
            %
          </td>
          <td>{day.wind.speed}</td>
          <td>
            {day.main.humidity}
            %
          </td>
        </tr>
        ))
        const dataMobile = weatherData.map((day, index) => (
            <li className="showDaysMobile-li" key={index}>
                <div className="sm-line">
                    <span>{day.dt.day}</span>
                    <span> </span>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                </div>
                <div className="sm-line">Temp: {convertTemperature(day.main.temp)}</div>
                <div className="sm-line">Wind: {day.wind.speed}</div>
                <div className="sm-line">Humi: {day.main.humidity}</div>
            </li>
        ));

    return (
        <div className="container">
            <div className="desktop">
                <table className="showDays">
                    <thead>
                    <tr>
                        <th>Day</th>
                        <th></th>
                        <th>Temp</th>
                        <th>Condition</th>
                        <th>Cloudiness</th>
                        <th>Wind speed (m/s)</th>
                        <th>Humidity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataDesktop}
                    </tbody>
                </table>
            </div>
            <div className="mobile">
                <ul className="showDaysMobile">{dataMobile}</ul>
            </div> 
        </div>  
    )
};
export default Load5Days;
