import React, { Component } from 'react'
import Accordion from './../components/Accordion'
import ReactLoading from 'react-loading'
import ImagePreview from './../components/ImagePreview'
import './../styles/Camera.css'

export default class Camera extends Component {

  constructor(props) {
    super(props)
    this.state = {
      english: [],
      igbo: [],
    }
  }

  updateEnglish = (english) => {
    this.setState({ english })
  }

  renderSuggestions = () => {
    if (this.state.english.length > 0) {
      return this.state.english.map((word, index) => {
       return  <Accordion key={`${word}${index}`} english={word} igbo={this.state.igbo[index]} />
      })
    } else return <ReactLoading className="loading" type={'spin'} color={'#ccc'} height={'10vh'} width={'10vh'} />
  }

  render() {
    return (
      <div className="camera-container">
        <h1>Upload A Photo</h1>
        <h5>Upload a photo to see what's in it!</h5>
        <div>
          <ImagePreview updateEnglish={this.updateEnglish} />
          {this.renderSuggestions()}
        </div>
      </div>
    )
  }
}