import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import NavBar from '../Navbar'
import TrendingCards from '../TrendingCard'
import Category from '../Category'
import Loader from 'react-loader-spinner'
import SavedVideo from '../../Context/changeVideo'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingVideos extends Component {
  state = {trendingList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedVideos = data.videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))

      this.setState({
        trendingList: updatedVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.setState(this.getTrendingVideos)
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
      <p>We are having some trouble</p>
      <button type="button" className="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderVideoDetailsView = () => {
    const {trendingList} = this.state
    return (
      <ul className="unorder">
        {trendingList.map(each => (
          <TrendingCards TrendingCardDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <SavedVideo.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgmaincolorvideo = isDarkTheme
            ? 'normalbgcolorvideo'
            : 'darkbgcolorvideo'
          const bgmaincolor = isDarkTheme ? 'normalbgcolor' : 'darkbgcolor'
          const trendingCard = isDarkTheme ? 'default' : 'trendcarddark'

          return (
            <div className="super-container">
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
                      <FaFire size={30} className="facolor" />
                    </div>
                    <h1>Trending</h1>
                  </div>

                  <div className={`videos-div2 ${bgmaincolorvideo}`}>
                    {this.renderVideoDetailsView()}
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

export default TrendingVideos
