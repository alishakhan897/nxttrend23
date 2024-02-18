import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showpassword: true,
    showErrrMsg: false,
    ErrMsg: '',
  }

  userinputfield = event => {
    this.setState({username: event.target.value})
  }

  passwordinputfield = event => {
    this.setState({password: event.target.value})
  }

  checkboxinputfield = () => {
    this.setState(prev => ({showpassword: !prev.showpassword}))
  }

  onSubmitSucess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = ErrMsg => {
    this.setState({showErrrMsg: true, ErrMsg: 'Username and password is error'})
  }

  submitform = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSucess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.ErrMsg)
    }
  }

  render() {
    const {username, password, showpassword, showErrrMsg, ErrMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="small-container">
          <div className="login-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="login-light"
              alt="login"
            />
          </div>
          <form className="form-div" onSubmit={this.submitform}>
            <label htmlFor="username" className="usernametext">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="userfield"
              placeholder="username"
              onChange={this.userinputfield}
              value={username}
            />
            <label htmlFor="password" className="usernametext2">
              Password
            </label>
            <input
              id="password"
              type={showpassword ? 'password' : 'text'}
              className="userfield"
              placeholder="Password"
              onChange={this.passwordinputfield}
              value={password}
            />
            <div className="checkbox-div">
              <input
                type="checkbox"
                className="checkbox-input"
                onChange={this.checkboxinputfield}
              />

              <p className="usernametextcheckbox">Show Password</p>
            </div>
            <button type="submit" className="button-login">
              Login
            </button>
            {showErrrMsg && <p className="err">{ErrMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
