  import React, { Component } from 'react'
  import './../styles/Suggestion.css';

export default class Accordion extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      textState: true,
    }
  }

  handleTextState = (e) => {
    let target = e.target;
    if (e.target.nodeName !== 'DIV') {
      target = e.target.parentNode;
    }

    if (this.state.textState) {
      target.classList.remove('igbo');
      target.classList.add('english')
    } else {
      target.classList.remove('english')
      target.classList.add('igbo')
    }
    this.setState({ textState: !this.state.textState })
  }

  renderText = () => {
    if (this.state.textState) {
      return this.props.igbo;
    } else {
      return this.props.english;
    }
  }

  render() {
    return (
      <div className="suggestion-container igbo" onClick={this.handleTextState}>
        <h4 className="suggestion-text">
          {this.renderText()}
        </h4>
      </div>
    )
  }
}