import React from 'react'
import Theme from '../helpers/Theme.store'

const BackgroundImage = (props) => {
    const weatherType = props.list.weather[0].main;

    const themeStyle = {
        backgroundImage: `url(${Theme[weatherType]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        margin: '0',
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: '0'
      };


    return (
        <div style={themeStyle}>
                {props.children}
        </div>
    )
}

export default BackgroundImage
