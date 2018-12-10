import React, { Component } from 'react';
import translate from './../actions/translate';
import './../styles/Phrase.css';

export default class Phrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      igboWords: ['words', 'are', ],
      igboSentence: '',
      englishWords: this.props.englishPhrase.split(' '),
      englishSentence: this.props.englishSentence,
      expanded: false,
    }
  }

  componentWillMount = () => {
    // translate.translateEnglish(this.props.englishPhrase).then((res) => {
    //   this.setState({ igboSentence: res.sentence, igboWords: res.words });
    // })
  }

  enterHover = (e) => {
    const prevNode = e.target.previousSibling
    prevNode.classList.remove('invisible')
    const prevWidth = prevNode.getBoundingClientRect().width;
    const { x, y, width } = e.target.getBoundingClientRect()
    prevNode.style.top = `${y - 80}px`
    prevNode.style.left = `${x + (width  - prevWidth) / 2}px`
  }

  leaveHover = (e) => {
    const prevNode = e.target.previousSibling
    prevNode.classList.add('invisible')
  }

  renderIndividualEnglishWords = () => {
    return this.state.englishWords.map((word, index) => {
      return (
        <span className="word-translation-container">
          <div className="igbo-word invisible">
            <span>{this.state.igboWords[index]}</span>
          </div>
          <span
            className={this.state.igboWords[index]}
            onMouseEnter={this.enterHover}
            onMouseLeave={this.leaveHover}
          > { word } </span>
        </span>
      ) 
    })
  }
  
  renderIgbo = () => {
    if (this.state.igboWords.length > 0) {
      return (
        <h3 className="phrase igbo">
          {this.state.igboWords.join(' ')}
        </h3>
      )
    } else return null;
  }

  render() {
    return (
      <div className="phrase-container">
        <h3 className="phrase english">
          {this.renderIndividualEnglishWords()}
        </h3>
        {this.renderIgbo()}
      </div>
    )
  }
}