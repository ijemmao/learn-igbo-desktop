import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import Clarifai from 'clarifai'
import Suggestion from './Suggestion'
import translate from '../actions/translate'
import photo from '../actions/photo'
import env from '../env.json'
import '../styles/ImagePreview.css'

const app = new Clarifai.App({
  apiKey: env.CLARIFAI,
});

export default class ImagePreview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uid: this.props.uid || null,
      analyzingPhoto: false,
      imgBase64: this.props.image || null,
      english: this.props.english || [],
      igbo: this.props.igbo || [],
    }
  }

  componentDidMount = () => {
    if (this.props.image) {
      document.querySelector('.choose-image-button').classList.add('hidden')
      document.querySelector('.image-preview').classList.remove('hidden')
      const imagePreview = document.querySelector('.image-preview img')
      imagePreview.setAttribute('src', `data:image/jpeg;base64,${this.state.imgBase64}`)
    }
  }

  renderSuggestions = () => {
    if (this.state.analyzingPhoto) {
      return (
        <span className="react-loading-container">
          <ReactLoading className="loading" type={'spin'} color={'#ccc'} height={'10vh'} width={'10vh'} />
          <h3>Detecting Terms from photo</h3>
        </span>
      )
    } else if (!this.state.analyzingPhoto && this.state.english.length > 0 && this.state.igbo.length > 0) {
      return this.state.english.map((word, index) => {
        return <Suggestion key={`${word}${index}`} english={word} igbo={this.state.igbo[index]} />
      })
    } else if (!this.state.analyzingPhoto &&  this.state.english.length === 0) {
      return (
        <span className="no-suggestions-headers-container">
          <h3>There are currently no terms!</h3>
          <h3>Upload a photo!</h3>
        </span>
      )
    }
  }
    
  renderImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      e.target.nextSibling.classList.add('hidden')
      document.querySelector('.image-preview').classList.remove('hidden')

      reader.onload = (e) => {
        const imagePreview = document.querySelector('.image-preview img')
        imagePreview.setAttribute('src', e.target.result)
        console.log(e.target.result.split(',')[0])
        this.setState({ imgBase64: e.target.result.split(',')[1] })
        this.sendImage(e.target.result.split(',')[1])
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  sendImage = (image) => {
    this.setState({ analyzingPhoto: true })
    app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: 'aa7f35c01e0642fda5cf400f543e7c40' })
      .then((generalModel) => {
        return generalModel.predict(image)
      })
      .then((res) => {
        const concepts = res.outputs[0].data.concepts;
        const suggestions = Array.from(new Set(concepts.map(concept => concept.name)))
        this.setState({ english: suggestions })
        translate.translateEnglish(suggestions).then((results) => {
          this.setState({ analyzingPhoto: false, igbo: results.words })
          this.props.uid ? photo.postPhotoResult(this.props.uid, { image, english: suggestions, igbo: results.words }) : console.log('did not push: user not logged in')
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

  renderButtonOrImage = () => {
    return (
      <span>
        <span className="choose-image-button">
          <input className="image-input" type="file" accept="image/png, image/jpeg" onChange={this.renderImage} />
          <button className="choose-image" onClick={this.clickInput}>Upload Photo</button>
        </span>
        <div className="image-preview hidden">
          <img src="/" />
        </div>
      </span>
    )
  }

  render() {
    return (
      <div className="image-preview-container">
        <div className="image-results-container">
          <div className="image-results-headers-container">
            <h3 className="image-result-header">Uploaded Photo</h3>
            <h3 className="image-result-header">Detected Terms</h3>
          </div>
          <div className="image-results-content-container">
            {this.renderButtonOrImage()}
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
