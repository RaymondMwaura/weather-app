import React, {Component} from 'react'
import './mobiledays.css'

export default class MobileDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ""
        };
    }

    componentDidMount() {
        const date = new Date();
        const today = date.toDateString().split(" ")[0];
        this.setState({selected: today})
    }

    onSelectedDay(i) {
        this.setState({selected: i.dt.day});
        this.props.handleSelectedDay(i);
    }

    render (){
        const {weather} = this.props;

        return (<div>
            <div className="mobile-days">
                <ul className="ul-days">
                    {   // looping through five days weather data
                        weather.map((item, i) =>
                            <li key={i} className="li-day" onClick={e => {
                                e.preventDefault();
                                this.onSelectedDay(item)
                            }}>
                                <span id={item}
                                      className={item.dt.day === this.state.selected ? 'active' : ''}>{item.dt.day}</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
}
