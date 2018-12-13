import React, { Component } from 'react'
import convertNumber from './../actions/convert-number'
import './../styles/Convert.css'

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    document.querySelector('button').click()
  }
})

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
      e.target.previousSibling.value = ''
    }
  }

  render() {
    return (
      <div className="convert-container">
        <h2 className="convert-header">What's the number for:</h2>
        <h2 className="convert-header">{this.state.currentNumberIgbo}</h2>
        <div className="convert-input-container">
          <input type="text" />
          <button onClick={this.handleAnswer}>
            <h3>enter</h3>
          </button>
        </div>
      </div>
    )
  }
}