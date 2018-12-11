import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './../styles/ImagePreview.css';

import env from './../env.json'

export default class ImagePreview extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      imgBase64: null,
    }
  }

  renderImage = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imagePreview = document.querySelector('.image-preview')
        imagePreview.setAttribute('src', e.target.result)
        this.setState({ imgBase64: e.target.result.split(',')[1] })
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  sendImage = () => {
    app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: 'aa7f35c01e0642fda5cf400f543e7c40' })
      .then(generalModel => {
        return generalModel.predict(this.state.imgBase64);
      })
      .then((res) => {
        const concepts = res.outputs[0].data.concepts;
        const suggestions = Array.from(new Set(concepts.map(concept => concept.name)));
        console.log(suggestions);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    if (this.state.imgBase64) this.sendImage()
    return (
      <div className="image-preview-container">
        <input type="file" accept="image/png, image/jpeg" onChange={this.renderImage}/>
        <img className="image-preview" src="/" />
      </div>
    )
  }
}

const app = new Clarifai.App({
  apiKey: env.CLARIFAI
});