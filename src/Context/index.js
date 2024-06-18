import React, {createContext} from 'react'

const QuizContext = createContext()

class QuizProvider extends React.Component {
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
    const {children} = this.props
    return (
      <QuizContext.Provider
        value={{
          ...this.state,
          setCorrectAnswers: this.setCorrectAnswers,
          setWrongAnswers: this.setWrongAnswers,
          setUnattempted: this.setUnattempted,
          setUnattemptedList: this.setUnattemptedList,
        }}
      >
        {children}
      </QuizContext.Provider>
    )
  }
}

export {QuizContext, QuizProvider}
