import React from 'react';
import './navbar.css';

export default class NavSearch extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            matching: [],
            text: '',
        };
    }
    onTextChanged = (m) => {

        const { cities } = this.props;
        const value = m.target.value;
        let matching = [];
        if(value.length > 0){
             const regex = new RegExp(`^${value}`, 'i');
             matching = cities.sort().filter(v  => regex.test(v));
        }
        this.setState(() => ({ matching, text: value }));
    };
    match (value){
        this.setState(() => ({
            text : value,
            matching : [],
        }))
    }
    renderMatching (){
        const { matching } = this.state;
        if (matching.length === 0){
            return null;
        }
        return(
            <ul>
                {matching.map((item, i) => <li key={i} onClick ={() => {
                    this.props.setCity(item);
                    return this.match(item)}
                    }>{item}</li>)}
            </ul>
        );

    }


    render (){
        const { text } = this.state;

         return (
             <nav className="NavSearch">
                 <input value={text} onChange= {this.onTextChanged} type="text"/>
                 {this.renderMatching()}
             </nav>
         )
    }

}