import { Component } from 'react'

export default class Music extends Component {
  constructor(props) {
    super(props)

    this.play = false
    this.uri = props.uri
    this.audio = new Audio(this.uri)
    document.body.appendChild(this.audio)
  }

  togglePlay = () => {
    if (!this.play) {
      this.audio.play()
    } else {
      this.audio.stop()
    }
  }
}
