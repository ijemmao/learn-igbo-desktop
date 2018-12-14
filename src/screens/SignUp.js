import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import google from './../assets/images/google.png'
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
          <div className="signup-buttons-container">
            <button className="user-signup-button">
              <h3>
                sign up
              </h3>
            </button>
            <button className="user-signup-button">
              <img className="google-icon" src={google} />
              <h3>
                sign up with google
              </h3>
            </button>
          </div>
        </form>
        <h5>Already have an account? <a href="/login" className="user-signup-option-link">Sign in</a></h5>
      </div>
    )
  }
}