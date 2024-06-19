import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import NotFound from './components/NotFound'
import Congrats from './components/Congrats'
import Report from './components/Report'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
    <ProtectedRoute exact path="/game-results" component={Congrats} />
    <ProtectedRoute exact path="/game-report" component={Report} />
    <Route component={NotFound} />
  </Switch>
)

export default App
