import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import './../styles/SignUp.css'

export default class SignUp extends Component {

  render() {
    return (
      <div className="user-signup-container">
        <Navbar />
        <h1 id="logo">
          <a href="/">
            🌟Learn Igbo🇳🇬
          </a>
        </h1>
        <h2 className="user-signup-header">Sign Up</h2>
        <form className="user-signup-form">
          <input className="user-signup-input" placeholder="email" type="text" />
          <input className="user-signup-input" placeholder="username" type="text" />
          <input className="user-signup-input" placeholder="password" type="password" />
          <input className="user-signup-input" placeholder="password" type="password" />
          <button className="user-signup-button">
            <h3>
              sign up
            </h3>
          </button>
        </form>
        <h5>Already have an account? <a href="/login" className="user-signup-option-link">Sign in</a></h5>
      </div>
    )
  }
}