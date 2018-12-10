import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';
import Phrase from './../components/Phrase';
import './../styles/Speech.css';

export default class Speech extends Component {

  constructor(props) {
    super(props)
    this.state = {
      interimText: '',
      finalizedText: [],
      listening: true,
    }
  }

  componentDidMount() {
    const onAnythingSaid = text => {
      this.setState({ interimText: text })

    };

    const onEndEvent = () => {
      if (this.state.listening) {
        this.startListening()
      }
    };

    const onFinalized = (text) => {
      this.setState({
        finalizedText: [text, ...this.state.finalizedText],
        interimText: ''
      })
    }

    try {
      this.listener = new SpeechToText(onFinalized, onEndEvent, onAnythingSaid);
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  startListening = () => {
    try {
      this.listener.startListening()
      this.setState({ listening: true })
    } catch (err) {
      console.log('Start listening: ', err)
    }
  }

  renderPhrases = () => {
    return this.state.finalizedText.map((phrase, index) => {
      return <Phrase englishPhrase={phrase} key={`${index}-${phrase}`} />
    })
  }

  render() {
    return (
      <div>
        <h1>Record Your Voice</h1>
        <h5>Start recording your voice and see the translation</h5>
        <button className="recording-button" onClick={this.startListening}>
          Start listening
        </button>
        <div>
          {this.renderPhrases()}
        </div>
      </div>
    )
  }
}