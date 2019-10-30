import React from 'react'
import Spinner from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Preloader = (props) => {
    const center = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100'
    }

    const bg = {
        backgroundColor: "rgba(222, 221, 217, .7)",
        positon: "relative",
        height: "100%"
        
    }
    return (
        <div style={bg}>
        <Spinner
            style={center}
            type="Oval"
            color="#00bfff"
            height={100}
            width={100}
        />
        {props.children}
        </div>
    )
}

export default Preloader