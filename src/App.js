import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import QuizContext from './Context'
import ProtectedRoute from './ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import NotFound from './components/NotFound'
import Congrats from './components/Congrats'
import Report from './components/Report'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    correctAnswers: 0,
    wrongAnswers: 0,
    unattempted: 0,
    unattemptedList: [],
  }

  setCorrectAnswers = () => {
    this.setState(prev => ({correctAnswers: prev.correctAnswers + 1}))
  }

  setWrongAnswers = () => {
    this.setState(prev => ({wrongAnswers: prev.wrongAnswers + 1}))
  }

  setUnattempted = () => {
    this.setState(prev => ({unattempted: prev.unattempted + 1}))
  }

  setUnattemptedList = newUnattemptedList => {
    this.setState(prev => ({
      unattemptedList: [...prev.unattemptedList, newUnattemptedList],
    }))
  }

  render() {
    const {
      correctAnswers,
      wrongAnswers,
      unattempted,
      unattemptedList,
    } = this.state
    return (
      <QuizContext.Provider
        value={{
          correctAnswers,
          wrongAnswers,
          unattempted,
          unattemptedList,
          setCorrectAnswers: this.setCorrectAnswers,
          setWrongAnswers: this.setWrongAnswers,
          setUnattempted: this.setUnattempted,
          setUnattemptedList: this.setUnattemptedList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
          <ProtectedRoute exact path="/game-results" component={Congrats} />
          <ProtectedRoute exact path="/game-report" component={Report} />
          <Route component={NotFound} />
        </Switch>
      </QuizContext.Provider>
    )
  }
}

export default App
