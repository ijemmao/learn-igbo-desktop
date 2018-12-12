import React, { Component } from 'react'
import Navbar from './../components/Navbar'
import './../styles/Games.css'

export default class Games extends Component {
  constructor(props) {
    super(props)

    this.state = {
      levels: ['alphabet', 'body parts', 'greetings', 'animals', 'family', 'professions', 'places', 'directions', 'food', 'time', 'colors', 'phrases'],
    }
  }

  renderLevelOptions = () => {
    return this.state.levels.map((level) => {
      return (
        <a href={`/game/${level}`}>
          <div className="game-level-option-container">
            <h3 classNam="game-level-option-header">
              {level}
            </h3>
          </div>
        </a>
      )
    })
  }
  render() {
    return (
      <div className="games-container">
        <Navbar />
        <h1 className="games-header">Game Levels</h1>
        <div className="game-level-options-container">
          {this.renderLevelOptions()}
        </div>
      </div>
    )
  }
}