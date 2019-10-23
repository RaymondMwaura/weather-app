import React from 'react'

export default function MobileDays(props) {

    // retrieving weather data passed from props
    const weather = props.weather
    
    // console.log(weather)

    // handling the event when user click a certain day
    const onDayClick = (e, item) => {

        // prevent default link click behaviour
        e.preventDefault()

        // Calling parent component click handler, passed from props
        props.handleClick(item)
    }


    return (
        <div>
            <div className='days"'>
                <ul>
                    {   // looping through five days weather data
                        weather.map((item) =>
                            <li key={item.dt}>
                                <a href="javascript(void)" onClick={ (e) => onDayClick(e, item) }>{ item.dt }</a>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
