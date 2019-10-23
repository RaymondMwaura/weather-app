import React, { Component } from 'react';
import NavSearch from  './components/navbar';
import cities from './components/capitalcities';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavSearch cities={cities}/>
      </div>
    )
  }
}