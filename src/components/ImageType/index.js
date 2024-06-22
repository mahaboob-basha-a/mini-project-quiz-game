import {useState, useRef, useEffect, useContext} from 'react'
import QuizContext from '../../Context'
import './index.css'

export default function ImageType(prop) {
  const {
    increaseQuistionNumberTwo,
    questionData,
    questionNumber,
    lengthFour,
  } = prop
  const {options} = questionData
  const questionText = questionData.question_text
  const imgOpt1 = useRef()
  const imgOpt2 = useRef()
  const imgOpt3 = useRef()
  const imgOpt4 = useRef()
  const imageOptions = [imgOpt1, imgOpt2, imgOpt3, imgOpt4]
  const [lockTwo, setLockTwo] = useState(false)
  const [time, setTime] = useState(15)
  const timerIdTwo = useRef(null)
  const {
    setCorrectAnswers,
    setWrongAnswers,
    setUnattempted,
    setUnattemptedList,
  } = useContext(QuizContext)
  // eslint-disable-next-line
  useEffect(() => {
    timerIdTwo.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerIdTwo.current)
  }, [])
  const timeUp = () => {
    const crctIndx = options.findIndex(item => {
      const crct = item.is_correct
      return crct === 'true'
    })
    if (!lockTwo) {
      imageOptions[crctIndx].current.src =
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
      imageOptions[crctIndx].current.alt = 'correct checked circle'
      setUnattempted()
      setUnattemptedList(questionData)
      setLockTwo(true)
    }
  }

  useEffect(() => {
    if (time === 0) {
      timeUp()
      clearInterval(timerIdTwo.current)
    } else if (lockTwo) {
      clearInterval(timerIdTwo.current)
    }
  }, [time])
  const onSelectOption = e => {
    const value = e.target.alt
    const userIndex = options.findIndex(item => item.text === value)
    const correctIndx = options.findIndex(item => {
      const isCrct = item.is_correct
      return isCrct === 'true'
    })
    if (!lockTwo) {
      if (userIndex === correctIndx) {
        imageOptions[userIndex].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        imageOptions[userIndex].current.alt = 'correct checked circle'
        setCorrectAnswers()
        setLockTwo(true)
      } else {
        imageOptions[correctIndx].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        imageOptions[correctIndx].current.alt = 'correct checked circle'
        imageOptions[userIndex].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
        imageOptions[userIndex].current.alt = 'incorrect close circle'
        setWrongAnswers()
        setLockTwo(true)
      }
    }
  }
  return (
    <div className="default-type">
      <div className="top-section">
        <div className="question-outoff">
          <p>Question</p>
          <p>{`${questionNumber}/${lengthFour}`}</p>
        </div>
        <p className="time-remain">{time}</p>
      </div>
      <div className="question-section">
        <p className="questioning">{questionText}</p>
        <ul className="image-select-list">
          {options.map((item, indx) => {
            const imageUrl = item.image_url
            const {id, text} = item
            return (
              <li key={id}>
                <button type="button" onClick={onSelectOption}>
                  <img className="image-type" src={imageUrl} alt={text} />
                </button>
                <img
                  ref={imageOptions[indx]}
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
        className={lockTwo ? 'active-next-btn' : 'next-question'}
        onClick={increaseQuistionNumberTwo}
        disabled={!lockTwo}
      >
        Next Question
      </button>
    </div>
  )
}
