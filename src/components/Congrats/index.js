import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {QuizContext} from '../../Context'
import NavBar from '../Navbar'
import './index.css'

const Congrats = () => {
  const {correctAnswers} = useContext(QuizContext)
  return (
    <div className="quiz-page">
      <NavBar />
      <div className="quiz-page-bottom">
        <div className="quiz-bottom-card">
          {correctAnswers > 5 ? (
            <div className="conrats-page">
              <div className="congrats-content">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                  alt="won"
                />
                <h1>Congrats</h1>
                <h1 className="answered">
                  {correctAnswers}0% Correctly Answered
                </h1>
                <p>Quiz completed successfully.</p>
                <p>
                  You attempted {correctAnswers} out of {10} questions as
                  correct.
                </p>
                <Link to="/game-report">
                  <button type="button" className="active-next-btn">
                    Report
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="congrats-content">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                alt="lose"
              />
              <h1>You lose</h1>
              <h1 className="answered">
                {correctAnswers}0% Correctly Answered
              </h1>
              <p>
                You attempted {correctAnswers} out of 10 questions as correct.
              </p>
              <Link to="/game-report">
                <button type="button" className="active-next-btn">
                  Report
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Congrats
