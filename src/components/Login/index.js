import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

export default class Login extends Component {
  state = {username: '', password: '', checkboxStatus: false, errorMsg: ''}

  sendData = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const payload = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const res = await fetch(url, payload)
    const token = await res.json()
    if (res.status === 200) {
      Cookies.set('jwt_token', token.jwt_token, {expires: 30})
      this.setState({username: '', password: '', errorMsg: ''})
      const {history} = this.props

      return history.replace('/')
    }
    return this.setState({
      username: '',
      password: '',
      errorMsg: token.error_msg,
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    if (username !== '' && password !== '') {
      this.sendData()
    }
  }

  render() {
    const {username, password, checkboxStatus, errorMsg} = this.state
    const savedToken = Cookies.get('jwt_token')
    if (savedToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/dmoa3xmnx/image/upload/v1716293738/Frame_8004_ndpwcq.png"
            alt="login website logo"
          />
          <form>
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              onChange={e => this.setState({username: e.target.value})}
              id="username"
              type="text"
              placeholder="Username"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              onChange={e => this.setState({password: e.target.value})}
              id="password"
              type={checkboxStatus ? 'text' : 'password'}
              placeholder="Password"
            />
            <div>
              <input
                onChange={() =>
                  this.setState(prev => ({
                    checkboxStatus: !prev.checkboxStatus,
                  }))
                }
                id="checkbox"
                type="checkbox"
                checked={checkboxStatus}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                Show Password
              </label>
            </div>
            <button type="submit" onClick={this.onSubmit}>
              Login
            </button>
          </form>
          <p className="error-login">{errorMsg}</p>
        </div>
      </div>
    )
  }
}
