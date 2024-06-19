import {useState, useRef, useEffect, useContext} from 'react'
import {QuizContext} from '../../Context'
import './index.css'

export default function SingleSelectType(prop) {
  const {increaseQuistionNumberThree, questionData, questionNumber} = prop
  const {options} = questionData
  const questionText = questionData.question_text
  const singleImg1 = useRef()
  const singleImg2 = useRef()
  const singleImg3 = useRef()
  const singleImg4 = useRef()
  const singleImg5 = useRef()
  const singleImgOptions = [
    singleImg1,
    singleImg2,
    singleImg3,
    singleImg4,
    singleImg5,
  ]
  const [lockThree, setLockThree] = useState(false)
  const [time, setTime] = useState(15)
  const timerIdThree = useRef(null)
  const {
    setCorrectAnswers,
    setWrongAnswers,
    setUnattempted,
    setUnattemptedList,
  } = useContext(QuizContext)
  // eslint-disable-next-line
  useEffect(() => {
    timerIdThree.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerIdThree.current)
  }, [])
  const timeComplete = () => {
    const val = options.findIndex(item => {
      const crct = item.is_correct
      return crct === 'true'
    })
    if (!lockThree) {
      singleImgOptions[val].current.src =
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
      singleImgOptions[val].current.alt = 'correct checked circle'
      setUnattempted()
      setUnattemptedList(questionData)
      setLockThree(true)
    }
  }

  useEffect(() => {
    if (time === 0) {
      timeComplete()
      clearInterval(timerIdThree.current)
    } else if (lockThree) {
      clearInterval(timerIdThree.current)
    }
  }, [time])

  const onSingleSelect = e => {
    const {value} = e.target
    const userIndxThree = options.findIndex(item => item.text === value)
    const correctIndxThree = options.findIndex(item => {
      const crct = item.is_correct
      return crct === 'true'
    })
    if (!lockThree) {
      if (userIndxThree === correctIndxThree) {
        singleImgOptions[userIndxThree].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        singleImgOptions[userIndxThree].current.alt = 'correct checked circle'
        setCorrectAnswers()
        setLockThree(true)
      } else {
        singleImgOptions[correctIndxThree].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        singleImgOptions[correctIndxThree].current.alt =
          'correct checked circle'
        singleImgOptions[userIndxThree].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
        singleImgOptions[userIndxThree].current.alt = 'incorrect close circle'
        setWrongAnswers()
        setLockThree(true)
      }
    }
  }
  return (
    <div className="default-type">
      <div className="top-section">
        <div className="question-outoff">
          <p>Question</p>
          <p>{questionNumber}/10</p>
        </div>
        <p className="time-remain">{time}</p>
      </div>
      <div className="question-section">
        <p className="questioning">{questionText}</p>
        <ul className="single-select-list">
          {options.map((item, indx) => {
            const {id, text} = item
            return (
              <li key={id}>
                <input
                  disabled={lockThree}
                  onClick={onSingleSelect}
                  value={text}
                  id={id}
                  type="radio"
                  name="mbs"
                />
                <label htmlFor={id}>{text}</label>
                <img
                  ref={singleImgOptions[indx]}
                  className="right-icon"
                  src=""
                  alt=""
                />
              </li>
            )
          })}
        </ul>
      </div>
      <button
        type="button"
        className={lockThree ? 'active-next-btn' : 'next-question'}
        onClick={increaseQuistionNumberThree}
        disabled={!lockThree}
      >
        Next Question
      </button>
    </div>
  )
}
