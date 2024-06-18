import {useState, useRef, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {QuizContext} from '../../Context'
import './index.css'

const DefaultType = prop => {
  const {increaseQuistionNumberOne, questionData, questionNumber} = prop
  const {options} = questionData
  const questionText = questionData.question_text
  const button1 = useRef()
  const button2 = useRef()
  const button3 = useRef()
  const button4 = useRef()
  const optionList = [button1, button2, button3, button4]
  const img1 = useRef()
  const img2 = useRef()
  const img3 = useRef()
  const img4 = useRef()
  const [lock, setLock] = useState(false)
  const optionImg = [img1, img2, img3, img4]
  const [time, setTime] = useState(15)
  const timerId = useRef(null)
  const {
    setCorrectAnswers,
    setWrongAnswers,
    setUnattempted,
    setUnattemptedList,
  } = useContext(QuizContext)
  // eslint-disable-next-line
  useEffect(() => {
    timerId.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  const timeOut = () => {
    const indexOne = options.findIndex(item => {
      const isCrct = item.is_correct
      return isCrct === 'true'
    })
    if (!lock) {
      optionList[indexOne].current.style.background = '#1C944B'
      optionList[indexOne].current.style.color = '#F8FAFC'
      optionImg[indexOne].current.src =
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
      optionImg[indexOne].current.alt = 'correct checked circle'
      setUnattempted()
      setUnattemptedList(questionData)
      setLock(true)
    }
  }

  useEffect(() => {
    if (time === 0) {
      timeOut()
      clearInterval(timerId.current)
    } else if (lock) {
      clearInterval(timerId.current)
    }
  }, [time])
  const optionSelect = e => {
    const userOpt = e.target.innerText
    const indx = options.findIndex(item => item.text === userOpt)
    const corectIndx = options.findIndex(val => {
      const isCorrect = val.is_correct
      return isCorrect === 'true'
    })
    if (!lock) {
      if (indx === corectIndx) {
        optionList[indx].current.style.background = '#1C944B'
        optionList[indx].current.style.color = '#F8FAFC'
        optionImg[indx].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        optionImg[indx].current.alt = 'correct checked circle'
        setCorrectAnswers()
        setLock(true)
      } else {
        optionList[corectIndx].current.style.background = '#1c944B'
        optionList[corectIndx].current.style.color = '#F8FAFC'
        optionList[indx].current.style.background = '#BF2626'
        optionList[indx].current.style.color = '#F8FAFC'
        optionImg[corectIndx].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
        optionImg[corectIndx].current.alt = 'correct checked circle'
        optionImg[indx].current.src =
          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
        optionImg[indx].current.alt = 'incorrect close circle'
        setWrongAnswers()
        setLock(true)
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
        <ul className="default-list">
          <li key={options[0].id}>
            <button type="button" ref={button1} onClick={optionSelect}>
              {options[0].text}
            </button>
            <img ref={img1} className="right-icon" src="" alt="" />
          </li>
          <li key={options[1].id}>
            <button type="button" ref={button2} onClick={optionSelect}>
              {options[1].text}
            </button>
            <img ref={img2} className="right-icon" src="" alt="" />
          </li>
          <li key={options[2].id}>
            <button type="button" ref={button3} onClick={optionSelect}>
              {options[2].text}
            </button>
            <img ref={img3} className="right-icon" src="" alt="" />
          </li>
          <li key={options[3].id}>
            <button type="button" ref={button4} onClick={optionSelect}>
              {options[3].text}
            </button>
            <img ref={img4} className="right-icon" src="" alt="" />
          </li>
        </ul>
      </div>
      {questionNumber === 10 ? (
        <Link className="anchor-one" to="/result">
          <button
            type="button"
            className={lock ? 'active-next-btn' : 'next-question'}
            disabled={!lock}
          >
            Submit
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className={lock ? 'active-next-btn' : 'next-question'}
          onClick={increaseQuistionNumberOne}
          disabled={!lock}
        >
          Next Question
        </button>
      )}
    </div>
  )
}
export default DefaultType
