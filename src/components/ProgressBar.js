import React, { Component } from 'react'
import './../styles/ProgressBar.css'

export default class ProgressBar extends Component {

  componentDidMount = () => {
    const progressElement = document.querySelector('.completion-bar')
    progressElement.style.width = `${this.props.num / this.props.den * 100}%`
  }

  componentDidUpdate = () => {
    const progressElement = document.querySelector('.completion-bar')
    progressElement.style.width = `${this.props.num / this.props.den * 100}%`
  }

  render() {
    if (this.props.den !== 0)  {
      return (
        <div className="progress-bar-container">
          <div className="progress-bar-back">
            <div className="completion-bar" />
          </div>
          <h5 className="progress-status">{this.props.num} / {this.props.den} Question</h5>
        </div>
      )
    } else return null
  }
}