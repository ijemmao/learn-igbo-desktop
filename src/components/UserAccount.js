import React, { Component } from 'react'
import user from './../actions/user'
import './../styles/UserAccount.css'

export default class UserAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      photo: '',
      uid: '',
      expanded: false
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

  toggleMenu = () => {
    const dropdownMenu = document.querySelector('.dropdown-menu')
    if (!this.state.expanded) {
      dropdownMenu.classList.remove('hidden')
    } else {
      dropdownMenu.classList.add('hidden')
    }

    this.setState({ expanded: !this.state.expanded })
  }

  renderUserAccount = () => {
    if (this.state.uid !== '') {
      return (
        <span className="user-profile-container" onClick={this.toggleMenu}>
          <img className="user-profile-image" src={this.state.photo} />
          <h5>{this.state.name}</h5>
          <div className="dropdown-menu hidden">
            <h5>{this.state.email}</h5>
            <button className="login-button logout">
              Sign Out
            </button>
          </div>
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