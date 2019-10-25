import React from 'react'
import './components/mobiledays.css'

export default function MobileDays(props) {
    const weather = props.weather

    const onDayClick = (e, item) => {
        e.preventDefault()
        props.handleClick(item)
    }

    const date = new Date();
    const today = date.toDateString().split(" ")[0]

    const current = today;

    return (
        <div>
            <div className="mobile-days">
                <ul className="ul-days">
                    {   // looping through five days weather data
                        weather.map((item) =>
                            <li key={item.dt.day} className="li-day">
                                <a className={item.dt.day === current ? 'active' : ''} href="javascript(void)" onClick={ (e) => onDayClick(e, item) }>{ item.dt.day }</a>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
