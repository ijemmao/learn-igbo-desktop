import React, { Component } from 'react';
import './../styles/Home.css';


export default class Home extends Component {
  
  majorOption = (title) => {
    return (
      
      <div className="major-option-container">
        <h2>{title}</h2>
      </div>
    )
  }

  render() {
    return (
      <div className="home-container">
        <h1>Learn Igbo</h1>
        <h5>An interactive web app to teach the Naija language</h5>
        <div className="major-options-container">
          {this.majorOption('Camera')}
          {this.majorOption('Speech')}
        </div>
      </div>
    )
  }
}