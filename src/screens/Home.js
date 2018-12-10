import React, { Component } from 'react';
import Anime from 'react-anime';
import './../styles/Home.css';

export default class Home extends Component {

  majorOption = (title, description) => {
    return (
      <Anime easing="easeOutElastic"
        duration={2700}
        delay={(el, index) => index * 240}
        translateY='-85vh'>
      <a href={`/${title.toLowerCase()}`}>
        <div id={title.toLowerCase()} className="major-option-container">
            <div>
              <h2>{title}</h2>
              <h5>{description}</h5>
            </div>
        </div>
      </a>
      </Anime>
    )
  }

  render() {
    return (
      <div className="home-container">
        <h1>Learn Igbo</h1>
        <h5>An interactive web app to teach the Naija language</h5>
        <div className="major-options-container">
          {this.majorOption('Camera', 'Interact with your camera and photos!')}
          {this.majorOption('Speech', 'Say some words to get started!')}
        </div>
      </div>
    )
  }
}