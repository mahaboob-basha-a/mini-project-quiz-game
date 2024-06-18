import './index.css'

const ReportUnattempt = prop => {
  const {optionType, options} = prop
  const defaultType = () => {
    const booln = 'true'
    return (
      <ul className="ul-listOne">
        {options.map(item => {
          const {id, text} = item
          const isCorrect = item.is_correct
          return (
            <li key={id}>
              <p className={isCorrect === booln ? 'correct-opt' : 'wrong-opt'}>
                {text}
              </p>
              <img
                className="right-icon"
                src={
                  isCorrect === 'true'
                    ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                    : ''
                }
                alt={isCorrect === 'true' ? 'correct checked circle' : ''}
              />
            </li>
          )
        })}
      </ul>
    )
  }

  const imageType = () => {
    const boole = 'true'
    return (
      <ul className="ul-listOne">
        {options.map(item => {
          const {id, text} = item
          const isCorrect = item.is_correct
          const imgUrl = item.image_url
          return (
            <li key={id}>
              <img className="correct-img" src={imgUrl} alt={text} />
              <img
                className="right-icon"
                src={
                  isCorrect === boole
                    ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                    : ''
                }
                alt={isCorrect === 'true' ? 'correct checked circle' : ''}
              />
            </li>
          )
        })}
      </ul>
    )
  }

  const singleType = () => {
    const bool = 'true'
    return (
      <ul className="ul-listOne">
        {options.map(item => {
          const {id, text} = item
          const isCorrect = item.is_correct
          return (
            <li key={id}>
              <div>
                <input
                  checked={isCorrect === bool}
                  disabled
                  type="radio"
                  name="single"
                  id={id}
                />
                <label htmlFor={id}>{text}</label>
              </div>
              <img
                className="right-icon"
                src={
                  isCorrect === 'true'
                    ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                    : ''
                }
                alt={isCorrect === 'true' ? 'correct checked circle' : ''}
              />
            </li>
          )
        })}
      </ul>
    )
  }
  switch (optionType) {
    case 'DEFAULT':
      return defaultType()
    case 'SINGLE_SELECT':
      return singleType()
    case 'IMAGE':
      return imageType()
    default:
      return null
  }
}
export default ReportUnattempt
