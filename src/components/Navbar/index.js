import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

function NavBar(props) {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="nav-bar">
      <img
        className="nav-logo"
        src="https://res.cloudinary.com/dmoa3xmnx/image/upload/v1716293738/Frame_8004_ndpwcq.png"
        alt="website logo"
      />
      <button type="button" onClick={onLogOut} className="logout-btn-large">
        Logout
      </button>
      <button type="button" onClick={onLogOut} className="logout-btn-small">
        <img
          src="https://res.cloudinary.com/dmoa3xmnx/image/upload/v1716795471/ouoj6qucdpanri1hzg7v.png"
          alt="logout logo"
        />
      </button>
    </div>
  )
}
export default withRouter(NavBar)
