import {useContext} from 'react'
import {QuizContext} from '../../Context'
import NavBar from '../Navbar'
import './index.css'

const Report = () => {
  const {
    correctAnswers,
    wrongAnswers,
    unattempted,
    unattemptedList,
  } = useContext(QuizContext)
  console.log(unattemptedList)
  return (
    <div className="quiz-page">
      <NavBar />
      <div className="quiz-page-bottom">
        <div className="quiz-bottom-card">
          <div className="report-content">
            <div className="report-top-content">
              <p className="circle-report">
                <span>10</span>/10
              </p>
              <ul className="report-ul-list">
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                    alt="correct answer icon"
                  />{' '}
                  <p>{correctAnswers} Correct answers</p>
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                    alt="incorrect answer icon"
                  />{' '}
                  <p>{wrongAnswers} Wrong answers</p>
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                    alt="unattempted icon"
                  />{' '}
                  <p>{unattempted} Unattempted</p>
                </li>
              </ul>
            </div>
            <div className="report-bottom-content">
              <p className="atempted-all">Attempted all the questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Report
