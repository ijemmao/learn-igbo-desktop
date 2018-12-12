import React, { Component } from 'react'

export default class Music extends Component {
  constructor(props) {
    super(props)

    this.play = false
    this.uri = props.uri
    this.audio = new Audio(this.uri)
    document.body.appendChild(this.audio)
    console.log(this.audio)
  }

  togglePlay = () => {
    !this.play ? this.audio.play() : this.audio.stop()
  }
}