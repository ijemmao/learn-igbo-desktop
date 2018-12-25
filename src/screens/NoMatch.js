import React, { Component } from 'react'
import Anime from 'react-anime'
import { NavLink } from 'react-router-dom'
import '../styles/NoMatch.css'

export default class NoMatch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="no-match-container">
        <Anime
          easing="easeOutElastic"
          duration={2700}
          delay={() => 1 * 240}
          translateY={['100vh', '4vh']}
        >
          <h1><span className="uh-oh" role="img" aria-label="uh-oh">😨</span></h1>
          <h1>Uh Oh! It seems there's some trouble</h1>
          <h1>
            Let's head back
            <NavLink to="/" className="link-home">
              {' home'}
            </NavLink>
          </h1>
        </Anime>
      </div>
    )
  }
}
