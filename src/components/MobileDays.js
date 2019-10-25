import React, { Component } from 'react'
import './mobiledays.css'

export default class MobileDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: ''
        };
        this.weather = this.props.weather;
        this.date = new Date();
        this.today = this.date.toDateString().split(" ")[0]
         this.current = this.today;

         console.log("weeeather", this.weather);
      }

    // onDayClick = (e, item) => {
    //     e.preventDefault()
    //     this.props.handleClick(item)

    // }

    
    

    render (){
        return (<div>
            <div className="mobile-days">
                <ul className="ul-days">
                    {   // looping through five days weather data
                        this.weather.map((item) =>
                            <li key={item.dt.day} className="li-day"  onClick={ (e) => { 
                                    e.preventDefault()
                                    this.props.handleClick(item)
                                }}>
                                <a id={item} className={item.dt.day === this.current ? 'active' : ''} href="javascript(void)" >{ item.dt.day }</a>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
}
