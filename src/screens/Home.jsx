import React, { Component } from 'react'
import Anime from 'react-anime'
import Navbar from '../components/Navbar'
import './../styles/Home.css'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      renderPage: false,
    }

    setTimeout(() => {
      this.setState({ renderPage: true })
    }, 600)
  }

  majorOption = (title, description, index) => {
    return (
      <Anime easing="easeOutElastic"
        duration={2700}
        delay={() => index * 240}
        translateY={['100vh', '4vh']}>
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
    if (this.state.renderPage) {
      return (
        <div className="home-container">
          <Navbar />
          <a href="/">
            <h1 id="logo">🌟Learn Igbo🇳🇬</h1>
          </a>
          <h5>An interactive web app to teach the Naija language</h5>
          <div className="major-options-container">
            {this.majorOption('Camera', 'Interact with your camera and photos!', 0)}
            {this.majorOption('Speech', 'Say some words to get started!', .2)}
            {this.majorOption('Games', 'Play some games to get interactive!', .3)}
          </div>
        </div>
      )
    } else return null
  }
}