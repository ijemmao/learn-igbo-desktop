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
      listening: false,
      listeningText: 'Start Listening',
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
    if (!this.state.listening) {
      try {
        this.listener.startListening()
        this.setState({ listening: true, listeningText: 'Stop Listening' })
      } catch (err) {
        console.log('Start listening: ', err)
      }
    } else {
      this.listener.stopListening();
      this.setState({ listening: false, listeningText: 'Start Listening' });
    }
  }

  renderInterimPhrase = () => {
    if (this.state.listening === true) {
      return (
        <h3 className="interim-text">{this.state.interimText}</h3>
      )
    } else {
      return (
        <h4 className="empty-section-header">No current phrases</h4>
      )
    }
  }

  renderPhrases = () => {
    if (this.state.finalizedText.length > 0) {
      return this.state.finalizedText.map((phrase, index) => {
        return <Phrase englishPhrase={phrase} key={`${index}-${phrase}`} />
      })
    } else {
      return (
        <h4 className="empty-section-header">No phrases recorded</h4>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Record Your Voice</h1>
        <h5>Start recording your voice and see the translation</h5>
        <button className="recording-button" onClick={this.startListening}>
          {this.state.listeningText}
        </button>
        <div>
          <h2>Current Phrase</h2>
          {this.renderInterimPhrase()}
        </div>
        <div>
          <h2>Recorded Phrases</h2>
          {this.renderPhrases()}
        </div>
      </div>
    )
  }
}