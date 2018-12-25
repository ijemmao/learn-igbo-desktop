import React, { Component } from 'react'
import '../styles/Phrase.css'

export default class Phrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      igboWords: this.props.igboWords || [],
      igboSentence: this.props.igboPhrase || '',
      englishWords: this.props.englishPhrase.split(' ') || [],
    }

    console.log(this.props.igboWords)
  }

  enterHover = (e) => {
    const prevNode = e.target.childNodes[1]
    prevNode.classList.remove('invisible')
    const prevWidth = prevNode.getBoundingClientRect().width
    const { x, width } = e.target.getBoundingClientRect()
    prevNode.style.left = `${x + (width - prevWidth) / 2}px`
  }

  leaveHover = (e) => {
    let prevNode = e.target.childNodes[1];
    if (e.target.childNodes.length === 1) {
      prevNode = e.target;
    }
    prevNode.classList.add('invisible')
  }

  renderIndividualEnglishWords = () => {
    return this.state.englishWords.map((word, index) => {
      return (
        <span className="word-translation-container">
          <span
            className={`${this.state.igboWords[index]} english-word`}
            onMouseEnter={this.enterHover}
            onMouseLeave={this.leaveHover}
          >
            {`${word} `}
            <div className="igbo-word invisible">
              <span>{this.state.igboWords[index]}</span>
            </div>
          </span>
        </span>
      )
    })
  }

  renderIgbo = () => {
    return (
      <span>
        <h3 className="language-header">Igbo</h3>
        <h4 className="phrase">
          {this.state.igboSentence}
        </h4>
      </span>
    )
  }

  render() {
    return (
      <div className="phrase-container">
        <h3 className="language-header">English</h3>
        <h4 className="phrase">
          {this.renderIndividualEnglishWords()}
        </h4>
        {this.renderIgbo()}
      </div>
    )
  }
}
