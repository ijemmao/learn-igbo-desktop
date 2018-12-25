import React, { Component } from 'react'
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
        <h1><span className="uh-oh" role="img" aria-label="uh-oh">😨</span></h1>
        <h1>Uh Oh! It seems there's some trouble</h1>
        <h1>
          Let's head back
          <NavLink to="/" className="link-home">
            {' home'}
          </NavLink>
        </h1>
      </div>
    )
  }
}
