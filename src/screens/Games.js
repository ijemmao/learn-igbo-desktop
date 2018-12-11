import React, { Component } from 'react'
import './../styles/Games.css'

export default class Games extends Component {

  constructor(props) {
    super(props)
    this.state = {
      englishWords: ['people', 'water', 'food', 'sleep', 'good morning', 'good night', 'thank you', 'name', 'time', 'music', 'money'],
      igboOptions: ['ndị mmadụ', 'mmiri', 'nri', 'ụra', 'ụtụtụ ọma', 'ka chifoo', 'daalụ', 'aha', 'oge', 'egwu', 'ego']
    }
  }

  random = () => {
    return Math.floor(Math.random() * Math.floor(this.state.englishWords.length))
  }

  shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

  renderOptions = () => {
    const correctAnswer = 0;
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      let randomNumber = this.random();
      if (randomNumber !== correctAnswer && !options.has(randomNumber)) {
        options.add(randomNumber);
      }
    }

    return this.shuffle(Array.from(options)).map((option) => {
      return (
        <div className="igbo-option">
          <h2>{this.state.igboOptions[option]}</h2>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="games-container">
        <h2>Which of the following means:</h2>
        <h2>people</h2>
        <div className="games-options-container">
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}