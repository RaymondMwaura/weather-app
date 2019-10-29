import React from 'react';
import PropTypes from 'prop-types';
import {convertTime, toTimeStamp} from '../../helpers/filterWeather'

Details.propTypes = {
    selected: PropTypes.any.isRequired
};

function Details({selected}) {
    let {date, month, year} = convertTime(toTimeStamp(selected.data.date));
    return (
        <div className="detailed-day">
            <h1 className="city-name">{selected.data.city}</h1>
            <h3 className="selected-day-name">Today</h3>
            <p className="selected-day-date">{month} {date}, {year}</p>
            <div className="weather-type">
                <img src={selected.data.iconUrl} alt=""/>
                <span>{selected.data.type}</span>
            </div>
            <h3>{selected.data.averageTemp}</h3>
            <div>
                <div>
                    <span>{selected.data.minTemp}</span>
                    <span> | </span>
                    <span>{selected.data.maxTemp}</span>
                </div>
                <div>
                    <span>Max</span>
                    <span> | </span>
                    <span>Min</span>
                </div>
            </div>
            <div>
                <ul>
                    <li>
                        <span>{selected.data.humidity}</span>
                        <span>Humidity</span>
                    </li>
                    <li>
                        <span>{selected.data.Wind}</span>
                        <span>Wind</span>
                    </li>
                    <li>
                        <span>{selected.data.Pressure}</span>
                        <span>Pressure</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Details;