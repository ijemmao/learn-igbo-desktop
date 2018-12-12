import React, { Component } from 'react'
import './../styles/ProgressBar.css'

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="progress-bar-container">
        <div className="progress-bar-back">
          <div className="completion-bar" />
        </div>
        <h5 className="progress-status">0 / 10 Completed</h5>
      </div>
    )
  }
}