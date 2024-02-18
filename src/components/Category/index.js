import {Component} from 'react'
import './index.css'
import {IoHomeOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import SavedVideo from '../../Context/changeVideo'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {FaSave} from 'react-icons/fa'

class Category extends Component {
  render() {
    return (
      <SavedVideo.Consumer>
        {value => {
          const {isDarkTheme, ActiveTab, changetab} = value
          const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
          const textColor = isDarkTheme ? '#f1f5f9' : '#231f20'
          const activetabbg = isDarkTheme ? '#475569' : 'cdb5e1'

          const clickhome = () => {
            changetab('Home')
          }

          const clicktrending = () => {
            changetab('Trending')
          }

          const clickgame = () => {
            changetab('Gaming')
          }

          const clickSave = () => {
            changetab('Saved')
          }

          return (
            <>
              <ul>
                <div className="icon-div">
                  <li className={`${bgColor} icon-div2`}>
                    <Link to="/" className="link-design">
                      <div
                        className="homeicon"
                        key="home"
                        onClick={clickhome}
                        bgcolor={ActiveTab === 'Home' ? activetabbg : 'none'}
                      >
                        <IoHomeOutline
                          color={ActiveTab === 'Home' ? '#ff0b37' : '#909090'}
                        />
                        <p color={textColor}>Home</p>
                      </div>
                    </Link>
                  </li>
                  <li className={`${bgColor} icon-div2`}>
                    <Link to="/trending" className="link-design">
                      <div
                        className="homeicon"
                        key="trending"
                        onClick={clicktrending}
                        bgcolor={
                          ActiveTab === 'Trending' ? activetabbg : 'none'
                        }
                      >
                        <FaFire
                          color={
                            ActiveTab === 'Trending' ? '#ff0b37' : '#909090'
                          }
                        />
                        <p color={textColor}>Trending</p>
                      </div>
                    </Link>
                  </li>
                  <li className={`${bgColor} icon-div2`}>
                    <Link to="/gaming" className="link-design">
                      <div
                        className="homeicon"
                        key="gaming"
                        onClick={clickgame}
                        bgcolor={ActiveTab === 'Gaming' ? activetabbg : 'none'}
                      >
                        <SiYoutubegaming
                          color={ActiveTab === 'Gaming' ? '#ff0b37' : '#909090'}
                        />
                        <p color={textColor}>Gaming</p>
                      </div>
                    </Link>
                  </li>
                  <li className={`${bgColor} icon-div2`}>
                    <Link to="/saved" className="link-design">
                      <div
                        className="homeicon"
                        key="save"
                        onClick={clickSave}
                        bgcolor={ActiveTab === 'Saved' ? activetabbg : 'none'}
                      >
                        <FaSave
                          color={ActiveTab === 'Saved' ? '#ff0b37' : '#909090'}
                        />
                        <p color={textColor}>Saved videos</p>
                      </div>
                    </Link>
                  </li>
                </div>
                <div className="contact-div2">
                  <p>Contact Us</p>
                  <div className="contact-div">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      className="facebook"
                      alt="facebook logo"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      className="facebook"
                      alt="twitter logo"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      className="facebook"
                      alt="linked in logo"
                    />
                  </div>
                  <p>Enjoy! Now to see your channels and recommendations! </p>
                </div>
              </ul>
            </>
          )
        }}
      </SavedVideo.Consumer>
    )
  }
}

export default Category
