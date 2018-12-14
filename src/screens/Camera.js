import React, { Component } from 'react'
import Navbar from './../components/Navbar'
import ImagePreview from './../components/ImagePreview'
import './../styles/Camera.css'

export default class Camera extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      imagePreviews: [],
    }
  }

  createNewImagePreview = () => {
    if (this.state.imagePreviews.length < 6) {
      const imagePreviews = [<ImagePreview />, ...this.state.imagePreviews]
      this.setState({ imagePreviews })
    }
  }

  renderImagePreviews = () => {
    return this.state.imagePreviews
  }

  handleNewImages = () => {
    return (
      <span>
        <button className="add-image-preview" onClick={this.createNewImagePreview}>
          <h2>
            add a new photo card
          </h2>
        </button>
        {this.renderImagePreviews()}
      </span>
    )
  }

  render() {
    return (
      <div className="camera-container">
        <Navbar />
        <h1>Upload A Photo</h1>
        <h5>Upload a photo to see what's in it!</h5>
        <div>
          {this.handleNewImages()}
        </div>
      </div>
    )
  }
}