import React from 'react';
import PropTypes from 'prop-types';

Details.propTypes = {
    selected: PropTypes.any.isRequired
};

function Details({selected}) {
    return selected.data.city ? (
        <div>
            <h1>{selected.data.city}</h1>
            <h3>{selected.data.day}</h3>
            <p>{selected.data.date}</p>
            <div>
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
    ) : <span>Loading...</span>;
}

export default Details;