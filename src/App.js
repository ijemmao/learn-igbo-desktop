import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './screens/Home'
import Camera from './screens/Camera'
import Speech from './screens/Speech'
import Games from './screens/Games'
import Game from './screens/Game'
import NoMatch from './screens/NoMatch'
import './styles/App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/camera" component={Camera} />
      <Route exact path="/speech" component={Speech} />
      <Route exact path="/games" component={Games} />
      <Route exact path="/game/:level" component={Game} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)

export default App
