import React, { Component } from 'react'
import './../styles/UserAccount.css'

export default class UserAccount extends Component {

  login = () => {
    window.location = `/login`
  }

  signup = () => {
    window.location = `/signup`
  }
  
  render() {
    return (
      <div className="user-account-container">
        <button className="login-button" onClick={this.login}>Sign In</button>
        <button className="login-button sign-up" onClick={this.signup}>Sign Up</button>
      </div>
    )
  }
}