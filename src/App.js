import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './screens/Home'
import Camera from './screens/Camera'
import Speech from './screens/Speech'
import Games from './screens/Games'
import Game from './screens/Game'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import './styles/App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/camera" component={Camera} />
      <Route path="/speech" component={Speech} />
      <Route path="/games" component={Games} />
      <Route path="/game/:level" component={Game} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </Router>
)

export default App
