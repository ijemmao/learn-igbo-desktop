import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import google from './../assets/images/google.png'
import './../styles/Login.css'

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
          <div className="login-buttons-container">
            <button className="user-login-button">
              <h3>
                sign in
              </h3>
            </button>
            <button className="user-login-button">
              <img className="google-icon" src={google} />
              <h3>
                sign in with google
              </h3>
            </button>
          </div>
        </form>
        <h5>Don't have an account? <a href="/signup" className="user-login-option-link">Sign up</a></h5>
      </div>
    )
  }
}