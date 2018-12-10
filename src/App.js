import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './screens/Home';
import './styles/App.css';

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
  </Router>
)

export default App;
