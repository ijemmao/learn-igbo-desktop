import React, { Component } from 'react'
import SpeechToText from 'speech-to-text'
import Navbar from './../components/Navbar'
import Phrase from './../components/Phrase'
import user from './../actions/user'
import speech from './../actions/speech'
import translate  from './../actions/translate'
import './../styles/Speech.css'

export default class Speech extends Component {

  constructor(props) {
    super(props)
    this.state = {
      interimText: '',
      finalizedText: [],
      englishPhrases: [],
      igboPhrases: [],
      igboWords: [],
      listening: false,
      listeningText: 'Start Listening',
      uid: null,
    }
  }

  componentWillMount = () => {
    user.getGoogleUser().then((res) => {
      if (res !== null) {
        this.setState({ uid: res.uid })
      }
      speech.getSpeechResults(res.uid).then((res2) => {
        if (res2 !== null) {

          const pulledEnglish = []
          const pulledIgbo = []
          const pulledIgboWords = []

          for (let key in res2) {
            const speechData = res2[key]
            pulledEnglish.push(speechData.english)
            pulledIgbo.push(speechData.igbo)
            pulledIgboWords.push(speechData.igboWords)
          }
          this.setState({
            englishPhrases: pulledEnglish,
            igboPhrases: pulledIgbo,
            igboWords: pulledIgboWords
          })
        }
      })
    })
  }

  componentDidMount() {
    const onAnythingSaid = text => {
      this.setState({ interimText: text })

    }

    const onEndEvent = () => {
      if (this.state.listening) {
        this.startListening()
      }
    }

    const onFinalized = (text) => {
      translate.translateEnglish(text).then((res) => {
        this.setState({
          finalizedText: [text, ...this.state.finalizedText],
          englishPhrases: [text, ...this.state.englishPhrases],
          igboPhrases: [res.sentence, ...this.state.igboPhrases],
          igboWords: [res.words, this.state.igboWords],
          interimText: ''
        })
        speech.postSpeechResult(this.state.uid, { english: text, igbo: res.sentence, igboWords: res.words })
      })
    }

    try {
      this.listener = new SpeechToText(onFinalized, onEndEvent, onAnythingSaid)
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  startListening = () => {
    if (!this.state.listening) {
      try {
        this.listener.startListening()
        this.setState({ listening: true, listeningText: 'Stop Listening' })
      } catch (err) {
        console.log('Start listening: ', err)
      }
    } else {
      this.listener.stopListening()
      this.setState({ listening: false, listeningText: 'Start Listening' })
    }
  }

  renderInterimPhrase = () => {
    if (this.state.listening === true) {
      return (
        <div className="current-phrase-container">
          <h2>Current Phrase</h2>
          <h3 className="interim-text">{this.state.interimText}</h3>
        </div>
      )
    } else return null
  }

  renderPhrases = () => {
    if (this.state.englishPhrases.length > 0) {
        return this.state.englishPhrases.map((phrase, index) => {
        return <Phrase englishPhrase={phrase} igboPhrase={this.state.igboPhrases[index]} igboWords={this.state.igboWords[index]} key={`${index}-${phrase}`} />
      })
    } else {
      return (
        <h4 className="empty-section-header">No phrases recorded</h4>
      )
    }
  }

  render() {
    return (
      <div className="speech-container">
        <Navbar />
        <h1>Record Your Voice</h1>
        <h5>Start recording your voice and see the translation</h5>
        <button className="recording-button" onClick={this.startListening}>
          {this.state.listeningText}
        </button>
          {this.renderInterimPhrase()}
        <h2>Recorded Phrases</h2>
        <div className="phrases-container">
          {this.renderPhrases()}
        </div>
      </div>
    )
  }
}