import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import UserAccount from './UserAccount'
import '../styles/Navbar.css'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="navbar-container">
        <span className="navbar-left-section">
          <h3 id="logo">
            <NavLink to="/">
              Learn Igbo
            </NavLink>
          </h3>
        </span>
        <span className="navbar-right-section">
          <ul className="navbar-options">
            <li>
              <NavLink to="/camera">
                Camera
              </NavLink>
            </li>
            <li>
              <NavLink to="/speech">
                Speech
              </NavLink>
            </li>
            <li>
              <NavLink to="/games">
                Games
              </NavLink>
            </li>
          </ul>
          <div style={{
            height: 30,
            width: 2,
            backgroundColor: 'white',
            marginRight: 30,
            borderRadius: 2,
          }}
          />
          <UserAccount />
        </span>
      </div>
    )
  }
}
