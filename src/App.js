import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Speech from './screens/Speech';
import './styles/App.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/speech" component={Speech} />
    </Switch>
  </Router>
)

export default App;
