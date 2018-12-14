import React, { Component } from 'react'
import './../styles/UserAccount.css'

export default class UserAccount extends Component {
  render() {
    return (
      <div className="user-account-container">
        <button className="login-button">Sign In</button>
        <button className="login-button sign-up">Sign Up</button>
      </div>
    )
  }
}