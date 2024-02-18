import './index.css'
import SavedVideo from '../../Context/changeVideo'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'

const NavBar = props => {
  return (
    <SavedVideo.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const color = isDarkTheme ? 'normal-color' : 'darkcolor'
        const bgcolor = isDarkTheme ? 'normalbgcolor' : 'darkbgcolor'

        const ChangeTheme = () => {
          toggleTheme()
        }

        const logoutbutton = () => {
          Cookies.remove('jwt_token')
          const {history} = props
          history.replace('/login')
        }

        return (
          <div className={`navbar ${bgcolor}`}>
            <div className="navitems">
              <Link to="/">
                <img
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  className="nav-img"
                  alt="website logo"
                />
              </Link>
              <li className="second-div-nav">
                <button
                  type="button"
                  data-testid="theme"
                  onClick={ChangeTheme}
                  className="themebutton"
                >
                  {isDarkTheme ? (
                    <FaMoon color={'black'} />
                  ) : (
                    <BsBrightnessHigh color={'white'} size={20} />
                  )}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  className="profile"
                  alt="profile"
                />
                <Popup
                  modal
                  trigger={
                    <button type="button" className={`button-logout ${color}`}>
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className="pop-up">
                      <div>
                        <p>Are you sure, you want to logout?</p>
                      </div>
                      <div className="button-popup">
                        <button
                          type="button"
                          className="trigger-button"
                          data-testid="closeButton"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={logoutbutton}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </div>
          </div>
        )
      }}
    </SavedVideo.Consumer>
  )
}

export default withRouter(NavBar)
