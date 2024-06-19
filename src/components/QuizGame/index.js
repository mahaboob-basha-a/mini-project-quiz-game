import {Component} from 'react'
import Loading from '../Loading'
import NavBar from '../Navbar'
import DefaultType from '../DefaultType'
import SingleSelectType from '../SingleSelectType'
import TrueFalseType from '../TrueFalseType'
import ImageType from '../ImageType'
import './index.css'

export default class QuizGame extends Component {
  state = {
    initialStatus: {
      loading: true,
      success: false,
      failure: false,
    },
    questionsList: [],
    questionNumber: 0,
  }

  componentDidMount() {
    this.fetchingData()
  }

  increaseQuistionNumber = () => {
    const {questionsList, questionNumber} = this.state
    // console.log(questionsList)
    if (questionNumber < questionsList.length - 1) {
      this.setState(prev => ({
        ...prev,
        questionNumber: prev.questionNumber + 1,
      }))
    }
  }

  fetchingData = async () => {
    this.setState(prev => ({initialStatus: {...prev, loading: true}}))
    const res = await fetch('https://apis.ccbp.in/assess/questions')
    if (res.status === 200) {
      const data = await res.json()
      this.setState(prev => ({
        initialStatus: {...prev, loading: false, failure: false, success: true},
        questionsList: data.questions,
      }))
    } else {
      this.setState(prev => ({
        initialStatus: {...prev, loading: false, failure: true, success: false},
      }))
    }
  }

  failureView = () => (
    <div className="quiz-page">
      <NavBar />
      <div className="quiz-page-bottom">
        <div className="quiz-bottom-card">
          <div className="failure-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
              alt="failure view"
            />
            <h1>Something went wrong</h1>
            <p>Our servers are busy please try again</p>
            <button type="button" onClick={() => this.fetchingData()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  loadingView = () => (
    <div className="quiz-page">
      <NavBar />
      <div className="quiz-page-bottom">
        <div className="quiz-bottom-card">
          <Loading />
        </div>
      </div>
    </div>
  )

  onSuccessView = () => {
    const {questionsList, questionNumber} = this.state
    const questionDetails = questionsList[questionNumber]
    const optionsType = questionDetails.options_type
    switch (optionsType) {
      case 'DEFAULT':
        return (
          <div className="quiz-page">
            <NavBar />
            <div className="quiz-page-bottom">
              <div className="quiz-bottom-card">
                {questionDetails.options.length > 2 ? (
                  <DefaultType
                    questionNumber={questionNumber + 1}
                    questionData={questionDetails}
                    increaseQuistionNumberOne={this.increaseQuistionNumber}
                  />
                ) : (
                  <TrueFalseType
                    questionNumber={questionNumber + 1}
                    questionData={questionDetails}
                    increaseQuistionNumberFour={this.increaseQuistionNumber}
                  />
                )}
              </div>
            </div>
          </div>
        )
      case 'IMAGE':
        return (
          <div className="quiz-page">
            <NavBar />
            <div className="quiz-page-bottom">
              <div className="quiz-bottom-card">
                <ImageType
                  questionNumber={questionNumber + 1}
                  questionData={questionDetails}
                  increaseQuistionNumberTwo={this.increaseQuistionNumber}
                />
              </div>
            </div>
          </div>
        )
      case 'SINGLE_SELECT':
        return (
          <div className="quiz-page">
            <NavBar />
            <div className="quiz-page-bottom">
              <div className="quiz-bottom-card">
                <SingleSelectType
                  questionNumber={questionNumber + 1}
                  questionData={questionDetails}
                  increaseQuistionNumberThree={this.increaseQuistionNumber}
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {initialStatus} = this.state
    switch (true) {
      case initialStatus.loading:
        return this.loadingView()
      case initialStatus.failure:
        return this.failureView()
      case initialStatus.success:
        return this.onSuccessView()
      default:
        return null
    }
  }
}
