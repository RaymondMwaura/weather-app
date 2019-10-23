import React from 'react'

export default function MobileDays(props) {
    const weather = props.weather

    const onDayClick = (e, item) => {
        e.preventDefault()
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
