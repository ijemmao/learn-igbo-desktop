import React, { Component } from 'react';
import translate from './../actions/translate';
import './../styles/Phrase.css';

export default class Phrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      igboWords: ['ya bụ n\'ezie na-adọrọ mmasị'],
      englishWords: ['is is really interesting'] || this.props.englishPhrase.split(' '),
      expanded: false,
    }
  }

  componentWillMount = () => {
    translate.translateEnglish(this.props.englishPhrase.split(' ')).then((res) => {
      this.setState({ igboWords: res.words })
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
          {this.props.englishPhrase}
        </h3>
        {this.renderIgbo()}
      </div>
    )
  }
}