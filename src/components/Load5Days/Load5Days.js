import React from 'react';
import { convertTemperature } from '../../helpers/filterWeather';

const OneDay = ({ weatherData }) => {
  const data = weatherData.weatherData.map((day) => (
    <tr key={day.dt}>
      <td>{day.dt}</td>
      <td><img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} /></td>
      <td>
        {convertTemperature(day.main.temp)}
        {' '}
        <sup>o</sup>
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
  ));
  return data;
};

const Load5Days = (props) => (
  <div>
    <div>6 day weather forecast</div>
    <table className="showDays">
      <thead>
        <tr>
          <th>Day</th>
          <th> </th>
          <th>Temp</th>
          <th>Condition</th>
          <th>Cloudiness</th>
          <th>Wind speed (m/s)</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        <OneDay weatherData={props} />
      </tbody>
    </table>
  </div>
);

export default Load5Days;
