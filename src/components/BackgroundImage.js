import React from 'react'
import Theme from '../helpers/Theme.store'

const BackgroundImage = (props) => {
    const weatherType = props.list.weather[0].main;

    const themeStyle = {
        background: `url(${Theme[weatherType]})`,
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        margin: '0',
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: '0',
        backgroundSize: 'cover',
        backgroundBlendMode: 'lighten',
      };

    const layer = {
        backgroundColor: 'rgba(248, 247, 216, 0.4)',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      };

    return (
        <div style={themeStyle}>
            <div style={layer}>
                {props.children}
            </div>
        </div>
    )
}

export default BackgroundImage
