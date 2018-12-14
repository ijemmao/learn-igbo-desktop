import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import './../styles/UserLogin.css'

export default class UserLogin extends Component {

  render() {
    return (
      <div className="user-login-container">
      <Navbar />
        <h1 id="logo">
          <a href="/">
            🌟Learn Igbo🇳🇬
          </a>
        </h1>
        <h2 className="user-login-header">Sign In</h2>
        <form className="user-login-form">
          <input className="user-login-input" placeholder="username" type="text" />
          <input className="user-login-input" placeholder="password" type="password" />
          <button className="user-login-button">
            <h3>
              sign in
            </h3>
          </button>
        </form>
        <h5>Don't have an account? <a href="/signup" className="user-login-option-link">Sign up</a></h5>
      </div>
    )
  }
}