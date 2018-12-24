import React, { Component } from 'react'
import anime from 'animejs'
import Music from './Music'
import convertNumber from '../actions/convert-number'
import starSound from './../assets/sounds/star.wav'
import './../styles/Convert.css'

let scrollTop = 0;
window.addEventListener('scroll', (e) => {
  scrollTop = window.pageYOffset
})

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    document.querySelector('button').click()
  }
})

const star = new Music({ uri: starSound })

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

  throwStars = (starInformation) => {
    starInformation.forEach((star) => {
      const starElement = document.createElement('h1');
      starElement.id = 'star'
      starElement.classList.add(star[2])
      starElement.innerText = '🌟'
      starElement.style.left = `${star[0] - 30}px`
      starElement.style.top = `${star[1] + scrollTop}px`
      document.body.appendChild(starElement)
    })

    starInformation.forEach((star) => {
      anime({
        targets: `.${star[2]}`,
        translateX: star[3],
        translateY: star[4],
        opacity: [1, .4, 0],
        duration: 800,
        direction: 'normal',
        easing: 'easeOutQuad',
        complete: () => document.querySelector(`.${star[2]}`) ? document.querySelector(`.${star[2]}`).remove() : console.log('no star')
      });
    })

  }

  handleAnswer = (e) => {
    let inputTarget = e.target.previousSibling
    if (e.target.nodeName !== 'BUTTON') {
      inputTarget = e.target.parentNode.previousSibling
    }
    const inputText = inputTarget.value

    if (this.state.currentNumber.toString() === inputText) {
      const newNumber = this.random()
      console.log(newNumber)
      let inputTarget = e.target.previousSibling
      if (e.target.nodeName !== 'BUTTON') {
        inputTarget = e.target.parentNode.previousSibling
      }
      inputTarget.value = ''
      this.setState({ currentNumber: newNumber, currentNumberIgbo: convertNumber(newNumber) })

      const { x, y, height, width } = inputTarget.getBoundingClientRect()
      this.throwStars([[x, y, 'first', '-10rem', '6rem'], [x, y - height, 'second', '-10rem', '-6rem'], [x + width, y - height, 'third', '10rem', '-6rem'], [x + width, y, 'fourth', '10rem', '6rem']])
      star.togglePlay();

      console.log('correct!!')
    } else {
      console.log('incorrect')
      inputTarget.value = ''
      if (!inputTarget.classList.contains('shaking')) {
        inputTarget.classList.add('shaking')
        anime({
          targets: inputTarget,
          translateX: ['-3rem', '3rem', 0],
          duration: 200,
          direction: 'alternate',
          loop: 3,
          easing: 'easeOutBack',
          complete: () => setTimeout(() => { inputTarget.classList.remove('shaking') }, 100)
        });
      }
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
            <h2>enter</h2>
          </button>
        </div>
      </div>
    )
  }
}