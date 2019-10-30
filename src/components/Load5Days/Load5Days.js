import React, {useState} from 'react';
import {convertTemperature} from '../../helpers/filterWeather';
import './Load5Days.css';

const Load5Days = ({ weatherData }) => {

    weatherData = weatherData.filter(
        (d, idx) => idx !== 0 && idx !== weatherData.indexOf(weatherData[weatherData.length-1])
    );

    const [selected, setSelected] = useState({});

    const isMobile = () => window.screen.width < 600;

    const data = !isMobile() ?
        weatherData.map((day, index) => (
        <tr className="day" key={index} onClick={() => setSelected(day)}>
          <td>{day.dt.day}</td>
          <td><img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} /></td>
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
        )) : weatherData.map((day, index) => (
            <li className="showDaysMobile-li" key={index}>
                {/*{day.dt.day}*/}
                <div className="sm-line">
                    <span>{day.dt.day}</span>
                    <span> </span>
                    <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                </div>
                <div className="sm-line">Temp: {convertTemperature(day.main.temp)}</div>
                <div className="sm-line">Wind: {day.wind.speed}</div>
                <div className="sm-line">Humi: {day.main.humidity}</div>
            </li>
        ));

    return !isMobile() ? (
        <div>
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
                {data}
                </tbody>
            </table>
        </div>
    ) : (
        <ul className="showDaysMobile">{data}</ul>
    );
};
export default Load5Days;
