import React from 'react'

export default function MobileDays() {
    return (
        <div>
            <button onClick={this.props.handleClick} value="true" >Click</button>
            <div className="days">
                <ul>
                    <li>
                        <a href="" >Monday</a>
                    </li>
                    <li>
                        <a href="" >Tuesday</a>
                    </li>
                    <li>
                        <a href="" >Wednesday</a>
                    </li>
                    <li>
                        <a href="" >Thursday</a>
                    </li>
                    <li>
                        <a href="" >Friday</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
