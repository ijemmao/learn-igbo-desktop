import React, { Component } from 'react'
import anime from 'animejs'
import Anime from 'react-anime'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import Convert from '../components/Convert'
import Music from '../components/Music'
import '../styles/Game.css'
import levelData from '../assets/data/quiz-levels.json'
import starSound from '../assets/sounds/star.wav'
import congratsSound from '../assets/sounds/achievement.mp3'

let scrollTop = 0;
window.addEventListener('scroll', () => {
  scrollTop = window.pageYOffset
})

const starChime = new Music({ uri: starSound })
const congrats = new Music({ uri: congratsSound })


export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: 0,
      englishWords: levelData[this.props.match.params.level] ? levelData[`${this.props.match.params.level}`].english : [],
      igboOptions: levelData[this.props.match.params.level] ? levelData[`${this.props.match.params.level}`].igbo : [],
    }
  }

  resetGame = () => {
    this.setState({ question: 0 })
  }

  backToGames = () => {
    window.location = '/games'
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
      const starCallback = (callbackStar) => {
        const element = document.querySelector(`.${callbackStar[2]}`)
        if (element) {
          document.querySelector(`.${callbackStar[2]}`).remove()
        }
      }

      anime({
        targets: `.${star[2]}`,
        translateX: star[3],
        translateY: star[4],
        opacity: [1, 0.4, 0],
        duration: 800,
        direction: 'normal',
        easing: 'easeOutQuad',
        complete: () => starCallback(star),
      })
    })
  }

  nextQuestion = () => {
    setTimeout(() => {
      this.setState({ question: this.state.question += 1 })
    }, 1000)
  }

  getEnglishCorresponding = (answer, childTarget) => {
    const englishIndex = this.state.englishWords.indexOf(answer)
    const igboIndex = this.state.igboOptions.indexOf(childTarget.innerText)
    return englishIndex === igboIndex
  }

  checkAnswer = (e, answer) => {
    let { target } = e;
    if (e.target.nodeName !== 'DIV') {
      target = e.target.parentNode
    }
    const [childTarget] = target.childNodes


    if (this.getEnglishCorresponding(answer, childTarget)) {
      // correct answer
      const {
        x,
        y,
        height,
        width,
      } = childTarget.getBoundingClientRect()
      this.throwStars([[x, y, 'first', '-10rem', '6rem'], [x, y - height, 'second', '-10rem', '-6rem'], [x + width, y - height, 'third', '10rem', '-6rem'], [x + width, y, 'fourth', '10rem', '6rem']])
      starChime.togglePlay();

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
          complete: () => setTimeout(() => { target.classList.remove('shaking') }, 100),
        });
      }
    }
  }

  random = () => {
    return Math.floor(Math.random() * Math.floor(this.state.englishWords.length))
  }

  shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
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
      const randomNumber = this.random();
      if (randomNumber !== correctAnswer && !options.has(randomNumber)) {
        options.add(randomNumber);
      }
    }

    return this.shuffle(Array.from(options)).map((option) => {
      return (
        <div className="igbo-option" onClick={(e) => { this.checkAnswer(e, this.state.englishWords[this.state.question]) }}>
          <h2>{this.state.igboOptions[option]}</h2>
        </div>
      )
    })
  }

  renderCongrats = () => {
    return (
      <Anime
        easing="easeOutElastic"
        duration={1700}
        delay={(el, index) => index * 240}
        translateY="-30vh"
      >
        <h1 className="congratulations-icons"><span role="img" aria-label="trophy">✨🏆✨</span></h1>
        <h2 className="post-game-text">You successfully completed this level</h2>
      </Anime>
    )
  }

  renderNextGameOptions = (optionText, delay, callback) => {
    return (
      <Anime
        easing="easeOutElastic"
        duration={2000}
        delay={() => delay}
        translateY="-30vh"
        opacity="1"
      >
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
          <h2 className="game-question">Which of the following means:</h2>
          <h1 className="game-question">{this.renderQuestion()}</h1>
          <div className="game-options-container">
            {this.renderOptions()}
          </div>
        </span>
      )
    }

    congrats.togglePlay()
    return (
      <span className="congratulations-container">
        <h1>Congratulations!</h1>
        {this.renderCongrats()}
        <div className="next-game-options-container">
          {this.renderNextGameOptions('Play again', 1000, this.resetGame)}
          {this.renderNextGameOptions('Choose a game', 1100, this.backToGames)}
        </div>
      </span>
    )
  }

  renderGameType = () => {
    if (this.props.match.params.level === 'convert') {
      return <Convert />
    }

    return (
      <span>
        {this.renderState()}
      </span>
    )
  }

  render() {
    return (
      <div className="game-container">
        <Navbar />
        {this.renderGameType()}
      </div>
    )
  }
}
