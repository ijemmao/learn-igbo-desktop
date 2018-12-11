import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import translate from './../actions/translate'
import './../styles/Phrase.css'

export default class Phrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      igboWords: ['words', 'are', 'last', 'time'],
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
    const prevNode = e.target.childNodes[2]
    console.log(e.target.childNodes);
    prevNode.classList.remove('invisible')
    const prevWidth = prevNode.getBoundingClientRect().width
    const { x, y, width } = e.target.getBoundingClientRect()
    console.log(x, y, width)
    prevNode.style.left = `${x + (width  - prevWidth) / 2}px`
  }

  leaveHover = (e) => {
    let prevNode = e.target.childNodes[2];
    if (e.target.childNodes.length === 1) {
      prevNode = e.target;
    }
    console.log(e.target.childNodes)
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
          > { word } 
          
          
            <div className="igbo-word invisible">
              <span>{this.state.igboWords[index]}</span>
            </div>
          </span>
        </span>
      ) 
    })
  }
  
  renderIgbo = () => {
    if (this.state.igboWords.length > 0) {
      return (
        <span>
          <h3 className="language-header">Igbo</h3>
          <h4 className="phrase">
            {this.state.igboWords.join(' ')}
          </h4>
        </span>
      )
    } else return <ReactLoading className="loading" type={'spin'} color={'#ccc'} height={'10vh'} width={'10vh'} />
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