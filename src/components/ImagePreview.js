import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Clarifai from 'clarifai'
import Suggestion from './../components/Suggestion'
import translate from './../actions/translate';
import './../styles/ImagePreview.css'

import env from './../env.json'

export default class ImagePreview extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      analyzingPhoto: false,
      imgBase64: null,
      english: ['this', 'is', 'a', 'word', 'another', 'something'],
      igbo: ['sith', 'si', 'a', 'drow', 'rehtona', 'gnihtemos'],
    }
  }

  renderSuggestions = () => {
    if (this.state.analyzingPhoto) {
      return <ReactLoading className="loading" type={'spin'} color={'#ccc'} height={'10vh'} width={'10vh'} />
    } else if (!this.state.analyzingPhoto && this.state.english.length > 0 && this.state.igbo.length > 0) {
      return this.state.english.map((word, index) => {
        return <Suggestion key={`${word}${index}`} english={word} igbo={this.state.igbo[index]} />
      })
    }
  }
    
  renderImage = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imagePreview = document.querySelector('.image-preview img')
        imagePreview.setAttribute('src', e.target.result)
        this.setState({ imgBase64: e.target.result.split(',')[1] })
        this.sendImage(e.target.result.split(',')[1])
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  sendImage = (image) => {
    this.setState({ analyzingPhoto: true })
    app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: 'aa7f35c01e0642fda5cf400f543e7c40' })
      .then(generalModel => {
        return generalModel.predict(image)
      })
      .then((res) => {
        const concepts = res.outputs[0].data.concepts;
        const suggestions = Array.from(new Set(concepts.map(concept => concept.name)))
        this.setState({ analyzingPhoto: false, english: suggestions })
        translate.translateEnglish(suggestions).then((results) => {
          this.setState({ igbo: results.words })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  clickInput = () => {
    const imageInput = document.querySelector('input.image-input');
    imageInput.click();
  }

  render() {
    return (
      <div className="image-preview-container">
        <input className="image-input" type="file" accept="image/png, image/jpeg" onChange={this.renderImage}/>
        <button className="choose-image" onClick={this.clickInput}>Upload Photo</button>
        <div className="image-results-container">
          <div className="image-results-headers-container">
            <h3 className="image-result-header">Uploaded Photo</h3>
            <h3 className="image-result-header">Detected Terms</h3>
          </div>
          <div className="image-results-content-container">
            <div className="image-preview">
              <img src="/" />
            </div>
            <div className="suggestions-container">
              <div className="suggestions-labels-container">
                {this.renderSuggestions()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const app = new Clarifai.App({
  apiKey: env.CLARIFAI
});