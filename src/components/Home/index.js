import {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../Navbar'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <NavBar />
        <div className="home-bottom">
          <div className="home-bottom-card">
            <img
              className="home-img"
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
              alt="start quiz game"
            />
            <h1 className="home-para1">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p>Test yourself with these easy quiz questions and answers</p>
            <Link to="/quiz-game">
              <button type="button">Start Quiz</button>
            </Link>
            <div className="home-alert">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                alt="warning icon"
              />
              <p className="alert-para">
                All the progress will be lost, if you reload during the quiz
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
