import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import ImagePreview from '../components/ImagePreview'
import user from '../actions/user'
import photo from '../actions/photo'
import './../styles/Camera.css'

export default class Camera extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      imagePreviews: [],
      imagePreviewsData: [],
      uid: null,
    }
  }

  componentWillMount = () => {
    user.getGoogleUser().then((res) => {
      if (res !== null) {
        this.setState({ uid: res.uid })
      }
      photo.getPhotoResults(res.uid).then((res2) => {
        const pulledImagePreviews = []

        for (let key in res2) {
          const previewData = res2[key]
          pulledImagePreviews.push(<ImagePreview key={key} uid={this.state.uid} english={previewData.english} igbo={previewData.igbo} image={previewData.image} />)
        }
        this.setState({ imagePreviewsData: res2, imagePreviews: pulledImagePreviews })
      })
    })
  }

  createNewImagePreview = () => {
    if (this.state.imagePreviews.length < 6) {
      const imagePreviews = [<ImagePreview uid={this.state.uid} />, ...this.state.imagePreviews]
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