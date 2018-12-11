import React, { Component } from 'react'
import './../styles/Navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <span className="navbar-left-section">
          <h3 id="logo">
            <a href="/">
              Learn Igbo
            </a>
          </h3>
        </span>
        <span className="navbar-right-section">
          <ul className="navbar-options">
            <li>
              <a href="/camera">
                Camera  
              </a>
            </li>
            <li>
              <a href="/speech">
                Speech
              </a>
            </li>
            <li>
              <a href="/games">
                Games
              </a>
            </li>
            <li>
              <a href="/about">
                About
              </a>
            </li>
          </ul>
        </span>
      </div>
    )
  }
}