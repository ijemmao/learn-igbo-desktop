import React, { Component } from 'react'
import user from './../actions/user'
import './../styles/UserAccount.css'
import { RSA_NO_PADDING } from 'constants';

export default class UserAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      photo: '',
      uid: ''
    }
  }

  componentWillMount = () => {
    user.getGoogleUser().then((res) => {
      this.setState({
        name: res.displayName,
        email: res.email,
        photo: res.photoURL,
        uid: res.uid
      })
    })
  }

  googleAccount = () => {
    user.createGoogleUser()
  }

  renderUserAccount = () => {
    if (this.state.uid !== '') {
      return (
        <span className="user-profile-container">
          <img className="user-profile-image" src={this.state.photo} />
          <h5>{this.state.name}</h5>
        </span>
      )
    } else {
      return (
        <span>
          <button className="login-button" onClick={this.googleAccount}>Sign In</button>
          <button className="login-button sign-up" onClick={this.googleAccount}>Sign Up</button>
        </span>
      )
    }
  }
  
  render() {
    return (
      <div className="user-account-container">
        {this.renderUserAccount()}
      </div>
    )
  }
}