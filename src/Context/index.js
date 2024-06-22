import {createContext} from 'react'

const QuizContext = createContext({
  correctAnswers: 0,
  wrongAnswers: 0,
  unattempted: 0,
  unattemptedList: [],
  setCorrectAnswers: () => {},
  setWrongAnswers: () => {},
  setUnattempted: () => {},
  setUnattemptedList: () => {},
})

export default QuizContext
