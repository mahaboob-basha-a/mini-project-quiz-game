import {useState, useEffect, useRef, useContext} from 'react'
import QuizContext from '../../Context'
import './index.css'

export default function TrueFalseType(prop) {
  const {
    increaseQuistionNumberFour,
    questionData,
    questionNumber,
    lengthTwo,
  } = prop
  const {options} = questionData
  const questionText = questionData.question_text
  const optionOne = useRef()
  const optionTwo = useRef()
  const optionsList = [optionOne, optionTwo]
  const [lockFour, setLockFour] = useState(false)
  const optionOneBtn = useRef()
  const optionTwoBtn = useRef()
  const imgList = [optionOneBtn, optionTwoBtn]
  const [time, setTime] = useState(15)
  const timerIdFour = useRef(null)
  const {
    setCorrectAnswers,
    setWrongAnswers,
    setUnattempted,
    setUnattemptedList,
  } = useContext(QuizContext)
  // eslint-disable-next-line
  useEffect(() => {
    timerIdFour.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerIdFour.current)
  }, [])
  function timeDone() {
    const getIndx = options.findIndex(item => {
      const val = item.is_correct
      return val === 'true'
    })
    if (!lockFour) {
      optionsList[getIndx].current.src =
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
      optionsList[getIndx].current.alt = 'correct checked circle'
      imgList[getIndx].current.style.background = '#1C944B'
      imgList[getIndx].current.style.color = '#F8FAFC'
      setUnattempted()
      setUnattemptedList(questionData)
      setLockFour(true)
    }
  }
  useEffect(() => {
    if (time === 0) {
      timeDone()
      clearInterval(timerIdFour.current)
    } else if (lockFour) {
      clearInterval(timerIdFour.current)
    }
  }, [time])

  const onTrueFalse = e => {
    const value = e.target.innerText
    const userVal = options.findIndex(item => item.text === value)
    const crctVal = options.findIndex(item => {
      const corct = item.is_correct
      return corct === 'true'
    })
    if (!lockFour) {
      if (userVal === crctVal) {
        optionsList[userVal].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        optionsList[userVal].current.alt = 'correct checked circle'
        imgList[userVal].current.style.background = '#1C944B'
        imgList[userVal].current.style.color = '#F8FAFC'
        setCorrectAnswers()
        setLockFour(true)
      } else {
        optionsList[crctVal].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        optionsList[crctVal].current.alt = 'correct checked circle'
        optionsList[userVal].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
        optionsList[userVal].current.alt = 'incorrect close circle'
        imgList[crctVal].current.style.background = '#1C944B'
        imgList[crctVal].current.style.color = '#F8FAFC'
        imgList[userVal].current.style.background = '#BF2626'
        imgList[userVal].current.style.color = '#F8FAFC'
        setWrongAnswers()
        setLockFour(true)
      }
    }
  }
  return (
    <div className="default-type">
      <div className="top-section">
        <div className="question-outoff">
          <p>Question</p>
          <p>{`${questionNumber}/${lengthTwo}`}</p>
        </div>
        <p className="time-remain">{time}</p>
      </div>
      <div className="question-section">
        <p className="questioning">{questionText}</p>
        <ul className="default-list">
          {options.map((item, indx) => {
            const {id, text} = item
            return (
              <li key={id}>
                <button type="button" ref={imgList[indx]} onClick={onTrueFalse}>
                  {text}
                </button>
                <img
                  ref={optionsList[indx]}
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
        className={lockFour ? 'active-next-btn' : 'next-question'}
        onClick={increaseQuistionNumberFour}
        disabled={!lockFour}
      >
        Next Question
      </button>
    </div>
  )
}
