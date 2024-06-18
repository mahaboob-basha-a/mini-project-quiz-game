import {useContext} from 'react'
import {QuizContext} from '../../Context'
import ReportUnattempt from '../ReportUnattempt'
import NavBar from '../Navbar'
import './index.css'

const Report = () => {
  const {
    correctAnswers,
    wrongAnswers,
    unattempted,
    unattemptedList,
  } = useContext(QuizContext)

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
                  <p>{wrongAnswers} Incorrect answers</p>
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                    alt="unattempted icon"
                  />{' '}
                  <p>{unattempted} Unattempted answers</p>
                </li>
              </ul>
            </div>
            <div className="report-bottom-content">
              {unattempted > 0 ? (
                <div className="un-attempt-content">
                  <h1 className="atempted-all">Unattempted Questions</h1>
                  <ul className="un-attempt-ul-list">
                    {unattemptedList.map(el => {
                      const optionType = el.options_type
                      const questionText = el.question_text
                      const {id, options} = el
                      return (
                        <li key={id}>
                          <p>{questionText}</p>
                          <ReportUnattempt
                            optionType={optionType}
                            options={options}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <h1 className="atempted-all">Attempted all the questions</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Report
