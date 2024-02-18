import {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import SavedVideo from '../../Context/changeVideo'
import {FaFire} from 'react-icons/fa'
import NavBar from '../Navbar'
import SavedVideoList from '../SavedListVideo'
import Category from '../Category'

class SaveVideo extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      // Redirect to the login route if the user is not authenticated
      return <Redirect to="/login" />
    }

    return (
      <SavedVideo.Consumer>
        {value => {
          const {savedList} = value
          const lengthSaved = savedList.length > 0

          return (
            <div>
              <NavBar />
              <div className="home-div">
                <div className="categorydiv">
                  <Category />
                </div>
                <div className="trendinglogo">
                  <div className="fire-main-div">
                    <div className="fafire-div">
                      <FaFire size={30} className="facolor" />
                    </div>
                    <h1>Saved Videos</h1>
                  </div>
                  <div className="videos-div5">
                    <ul className="unorder-gaming2">
                      {lengthSaved ? (
                        savedList.map(each => (
                          <SavedVideoList key={each.id} SavelistItem={each} />
                        ))
                      ) : (
                        <div>
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                            alt="no saved videos"
                          />
                          <h1>No saved videos found</h1>
                          <p>Save your videos by clicking a button</p>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </SavedVideo.Consumer>
    )
  }
}

export default withRouter(SaveVideo)
