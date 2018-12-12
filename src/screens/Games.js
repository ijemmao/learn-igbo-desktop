import React, { Component } from 'react'
import anime from 'animejs'
import Anime from 'react-anime'
import Navbar from './../components/Navbar'
import ProgressBar from './../components/ProgressBar'
import Music from './../components/Music'
import './../styles/Games.css'
import starSound from './../assets/sounds/star.wav'
import congratsSound from './../assets/sounds/achievement.mp3'

var scrollTop;
window.addEventListener('scroll', (e) => {
  scrollTop = window.pageYOffset
})

const star = new Music({ uri: starSound })
const congrats = new Music({ uri: congratsSound })

export default class Games extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question: 10,
      // englishWords: ['people'], //|| ['people', 'water', 'food', 'sleep', 'good morning', 'good night', 'thank you', 'name', 'time', 'music', 'money', 'store'],
      igboOptions: ['ndị mmadụ'],// || ['ndị mmadụ', 'mmiri', 'nri', 'ụra', 'ụtụtụ ọma', 'ka chifoo', 'daalụ', 'aha', 'oge', 'egwu', 'ego', 'ụlọ ahịa']
      englishWords: ['people', 'water', 'food', 'sleep', 'good morning', 'good night', 'thank you', 'name', 'time', 'music', 'money', 'store'],
      igboOptions: ['ndị mmadụ', 'mmiri', 'nri', 'ụra', 'ụtụtụ ọma', 'ka chifoo', 'daalụ', 'aha', 'oge', 'egwu', 'ego', 'ụlọ ahịa']
    }
  }

  resetGame = () => {
    this.setState({ question: 0 })
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

  nextQuestion = () => {
    setTimeout(() => {
      this.setState({ question: this.state.question += 1 })
    }, 1000)
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
      star.togglePlay();

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
    // while (options.size < 1) {
    //   let randomNumber = this.random();
    //   if (randomNumber !== correctAnswer && !options.has(randomNumber)) {
    //     options.add(randomNumber);
    //   }
    // }

    return this.shuffle(Array.from(options)).map((option) => {
      return (
        <div className="igbo-option" onClick={(e) => this.checkAnswer(e, this.state.englishWords[this.state.question])}>
          <h2>{this.state.igboOptions[option]}</h2>
        </div>
      )
    })
  }

  renderCongrats = () => {
    return (
      <Anime easing="easeOutElastic"
        duration={1700}
        delay={(el, index) => index * 240}
        translateY='-30vh'>
        <h1 className="congratulations-icons">✨🏆✨</h1>
        <h2 className="post-game-text">You successfully completed this level</h2>
      </Anime>
    )
  }

  renderNextGameOptions = (optionText, delay, callback) => {
    return (
      <Anime easing="easeOutElastic"
        duration={2000}
        delay={(el, index) => delay}
        translateY='-30vh'
        opacity='1'>
        <div className="next-game-option-container" onClick={callback}>
          <h3>
            {optionText}
          </h3>
        </div>
      </Anime>
    )
  }

  renderState = () => {
    if (this.state.question < this.state.englishWords.length) {
      return (
        <span>
          <ProgressBar num={this.state.question + 1} den={this.state.englishWords.length} />
          <h2 className="games-question">Which of the following means:</h2>
          <h1 className="games-question">{this.renderQuestion()}</h1>
          <div className="games-options-container">
            {this.renderOptions()}
          </div>
        </span>
      )
    } else {
      congrats.togglePlay()
      return (
        <span className="congratulations-container">
          <h1>Congratulations!</h1>
          {this.renderCongrats()}
          <div className="next-game-options-container">
            {this.renderNextGameOptions('Play again', 1000, this.resetGame)}
            {this.renderNextGameOptions('Choose a game', 1100)}
          </div>
        </span>
      )
    }
  }

  render() {
    return (
      <div className="games-container">
        <Navbar />
        {this.renderState()}
      </div>
    )
  }
}