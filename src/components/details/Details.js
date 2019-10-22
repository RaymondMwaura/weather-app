import React from 'react';
import PropTypes from 'prop-types';

Details.propTypes = {
    selected: PropTypes.any.isRequired
};

function Details({selected}) {
    return selected.data.city ? (
        <div>
            Selected weather details:
            <ul>
                <li>City: {selected.data.city}</li>
                <li>Day: {selected.data.day}</li>
                <li>Date: {selected.data.date}</li>
                <li>Icon: {selected.data.icon}</li>
                <li>Type: {selected.data.type}</li>
                <li>Temperature: {selected.data.averageTemp}</li>
                <li>Minimum Temp: {selected.data.minTemp}</li>
                <li>Maximum Temp: {selected.data.maxTemp}</li>
                <li>Humidity: {selected.data.humidity}</li>
                <li>Wind: {selected.data.Wind}</li>
                <li>Pressure: {selected.data.Pressure}</li>
            </ul>
        </div>
    ) : <span>Loading...</span>;
}

export default Details;