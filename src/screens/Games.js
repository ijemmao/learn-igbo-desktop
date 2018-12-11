import React, { Component } from 'react'
import anime from 'animejs'
import './../styles/Games.css'

export default class Games extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question: 0,
      englishWords: ['people', 'water', 'food', 'sleep', 'good morning', 'good night', 'thank you', 'name', 'time', 'music', 'money'],
      igboOptions: ['ndị mmadụ', 'mmiri', 'nri', 'ụra', 'ụtụtụ ọma', 'ka chifoo', 'daalụ', 'aha', 'oge', 'egwu', 'ego']
    }
  }

  throwStars = (starInformation) => {
    starInformation.forEach((star) => {
      const starElement = document.createElement('h1');
      starElement.id = 'star'
      starElement.classList.add(star[2])
      starElement.innerText = '🌟'
      starElement.style.left = `${star[0] - 30}px`
      starElement.style.top = `${star[1]}px`
      document.body.appendChild(starElement)
    })

    starInformation.forEach((star) => {
      console.log(star)
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

  nextQuestion = () => {
    if (this.state.question < this.state.englishWords.length - 1) {
      this.setState({ question: this.state.question += 1 })

    } else {
      // end of game
    }
  }

  getEnglishCorresponding = (answer, childTarget) => {
    return this.state.englishWords.indexOf(answer) == this.state.igboOptions.indexOf(childTarget.innerText)
  }

  checkAnswer = (e, answer) => {
    let target = e.target;
    let childTarget;
    if (e.target.nodeName !== 'DIV') {
      target = e.target.parentNode
    }
    childTarget = target.childNodes[0]


    if (this.getEnglishCorresponding(answer, childTarget)) {
      // correct answer
      const { x, y, height, width } = childTarget.getBoundingClientRect()
      this.throwStars([[x, y, 'first', '-10rem', '6rem'], [x, y - height, 'second', '-10rem', '-6rem'], [x + width, y - height, 'third', '10rem', '-6rem'], [x + width, y, 'fourth', '10rem', '6rem']])
      setTimeout(() => {
        this.nextQuestion()
      }, 100)
    } else {
      // incorrect answer
      if (!target.classList.contains('shaking')) {
        target.classList.add('shaking')
        anime({
          targets: target,
          translateX: ['-6rem', '6rem', 0],
          duration: 200,
          direction: 'alternate',
          loop: 3,
          easing: 'easeOutBack',
          complete: () => setTimeout(() => { target.classList.remove('shaking') }, 100)
        });
      }
    }

  }

  random = () => {
    return Math.floor(Math.random() * Math.floor(this.state.englishWords.length))
  }

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  renderQuestion = () => {
    return this.state.englishWords[this.state.question]
  }

  renderOptions = () => {
    const correctAnswer = this.state.question;
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      let randomNumber = this.random();
      if (randomNumber !== correctAnswer && !options.has(randomNumber)) {
        options.add(randomNumber);
      }
    }

    return this.shuffle(Array.from(options)).map((option) => {
      return (
        <div className="igbo-option" onClick={(e) => this.checkAnswer(e, this.state.englishWords[this.state.question])}>
          <h2>{this.state.igboOptions[option]}</h2>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="games-container">
        <h2>Which of the following means:</h2>
        <h2>{this.renderQuestion()}</h2>
        <div className="games-options-container">
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}