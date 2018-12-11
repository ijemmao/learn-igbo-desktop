import React, { Component } from 'react'
import ImagePreview from './../components/ImagePreview'
import './../styles/Camera.css'

export default class Camera extends Component {

  render() {
    return (
      <div className="camera-container">
        <h1>Upload A Photo</h1>
        <h5>Upload a photo to see what's in it!</h5>
        <div>
          <ImagePreview />
        </div>
      </div>
    )
  }
}