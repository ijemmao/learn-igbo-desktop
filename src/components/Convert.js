import React, { Component } from 'react'
import convertNumber from './../actions/convert-number'

export default class Convert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentNumber: 0,
      currentNumberIgbo: convertNumber(0)
    }
  }

  componentWillMount = () => {
    const newNumber = this.random()
    console.log(newNumber)
    this.setState({ currentNumber: newNumber, currentNumberIgbo: convertNumber(newNumber) })
  }

  random = () => {
    return  Math.floor(Math.random() * Math.floor(10))
  }

  handleAnswer = (e) => {
    const inputText = e.target.previousSibling.value

    if (this.state.currentNumber.toString() === inputText) {
      const newNumber = this.random()
      console.log(newNumber)
      e.target.previousSibling.value = ''
      this.setState({ currentNumber: newNumber, currentNumberIgbo: convertNumber(newNumber) })
      console.log('correct!!')
    } else {
      console.log('incorrect')
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.currentNumberIgbo}</h2>
        <input type="text" />
        <button onClick={this.handleAnswer}>enter</button>
      </div>
    )
  }
}