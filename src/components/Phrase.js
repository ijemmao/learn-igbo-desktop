import React, { Component } from 'react';
import './../styles/Phrase.css';

export default class Phrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      igboWords: [],
    }
  }
  render() {
    return (
      <div className="phrase-container">
        <h3 className="phrase-english">
          {this.props.englishPhrase}
        </h3>
      </div>
    )
  }
}