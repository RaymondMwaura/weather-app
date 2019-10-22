import React, {useEffect, useState} from 'react';
import ListMobile from "../list-mobile/ListMobile";
import ListDesktop from "../list-desktop/ListDesktop";

List.propTypes = {};

function List(props) {
    useEffect(() => setIsMobile(true), []);

    useEffect(() => {
        window.addEventListener("resize", resize.bind(this));
        resize();
    });

    const [isMobile, setIsMobile] = useState(false);

    const resize = () => {
        let detectMobile = (window.innerWidth <= 760);
        if (detectMobile !== this.state.isMobile) {
            this.setState({
                isMobile: detectMobile
            });
        }
    };

    return isMobile ? <ListMobile/> : <ListDesktop/>;
}

export default List;