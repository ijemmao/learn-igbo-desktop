import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'
import levelsData from '../assets/data/quiz-levels'
import '../styles/Games.css'

export default class Games extends Component {
  constructor(props) {
    super(props)

    this.state = {
      levels: levelsData.levels,
    }
  }

  renderLevelOptions = () => {
    return this.state.levels.map((level) => {
      return (
        <NavLink to={`/game/${level}`}>
          <div className="game-level-option-container">
            <h3 classNam="game-level-option-header">
              {level}
            </h3>
          </div>
        </NavLink>
      )
    })
  }

  render() {
    return (
      <div className="games-container">
        <Navbar />
        <h1 className="games-header">Game Levels</h1>
        <h5>Start practicing your Igbo below!</h5>
        <div className="game-level-options-container">
          {this.renderLevelOptions()}
        </div>
      </div>
    )
  }
}
