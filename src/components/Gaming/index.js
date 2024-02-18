import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import NavBar from '../Navbar'
import GamingCards from '../GamingCards'
import Category from '../Category'
import SavedVideo from '../../Context/changeVideo'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingVideosRoute extends Component {
  state = {GamingList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedGame = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        GamingList: updatedGame,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.setState(this.getGamingVideos)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="error-view-image"
        alt="failure view"
      />
      <h1 className="product-not-found-heading">Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request Please try again
        later.
      </p>
      <button type="button" className="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderVideoDetailsView = () => {
    const {GamingList} = this.state

    return (
      <SavedVideo.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgmaincolorvideo = isDarkTheme
            ? 'normalbgcolorvideo'
            : 'darkbgcolorvideo'

          return (
            <div className={`videos-div2 ${bgmaincolorvideo}`}>
              <ul className="unorder-gaming">
                {GamingList.map(each => (
                  <GamingCards GamingDetails={each} key={each.id} />
                ))}
              </ul>
            </div>
          )
        }}
      </SavedVideo.Consumer>
    )
  }

  renderVideoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <SavedVideo.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgmaincolor = isDarkTheme ? 'normalbgcolor' : 'darkbgcolor'
          const trendingCard = isDarkTheme ? 'default' : 'trendcarddark'

          return (
            <div>
              <ul className="nav-ul">
                <NavBar />
              </ul>
              <div className={`home-div ${bgmaincolor}`}>
                <div className="categorydiv">
                  <Category />
                </div>
                <div className={`trendinglogo ${trendingCard}`}>
                  <div className="fire-main-div">
                    <div className="fafire-div">
                      <SiYoutubegaming size={30} className="facolor" />
                    </div>
                    <h1>Gaming</h1>
                  </div>
                  {this.renderVideoDetails()}
                </div>
              </div>
            </div>
          )
        }}
      </SavedVideo.Consumer>
    )
  }
}

export default GamingVideosRoute
