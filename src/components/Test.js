import React from 'react'

function Test(props) {
    console.log(props.day)
    return (
        <div>
            <h1>{props.day}</h1>
        </div>
    )
}

export default Test
