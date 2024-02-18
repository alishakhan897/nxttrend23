import {Component} from 'react'
import './index.css'
import SavedVideo from '../../Context/changeVideo'
import Cookies from 'js-cookie'
import {IoIosClose} from 'react-icons/io'
import {FaSearch} from 'react-icons/fa'
import {Redirect} from 'react-router-dom'
import NavBar from '../Navbar'
import Category from '../Category'
import VideoCard from '../videoCard'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    VideoList: [],
    searchInput: '',
    banner: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  hide = () => {
    this.setState({banner: false})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getVideos = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
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
        VideoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleSearch = () => {
    this.getVideos()
  }

  retry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
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
    const {searchInput, VideoList} = this.state
    const length = VideoList.length > 0

    return (
      <SavedVideo.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgmaincolorvideo = isDarkTheme
            ? 'normalbgcolorvideo'
            : 'darkbgcolorvideo'

          return (
            <div className={`videos-div ${bgmaincolorvideo}`}>
              <div className="input-div">
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                />
                <button
                  className="fasearch-div"
                  data-testid="searchButton" // Set data-testid attribute here
                  onClick={this.handleSearch} // Add onClick handler if needed
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
              <ul className="videocardlist">
                {length ? (
                  VideoList.map(each => (
                    <VideoCard VideoDetails={each} key={each.id} />
                  ))
                ) : (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                      className="random"
                      alt="no videos"
                    />
                    <h1>No Search results found</h1>
                    <p>Try different key words or remove search filter</p>
                    <button type="button" onClick={this.retry}>
                      Retry
                    </button>
                  </div>
                )}
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
    const {banner} = this.state
    const checkBanner = banner ? 'show-banner' : 'hide-banner'

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <SavedVideo.Consumer>
          {value => {
            const {isDarkTheme} = value
            const bgmaincolor = isDarkTheme ? 'normalbgcolor' : 'darkbgcolor'
            return (
              <div className="super-container">
                <ul className="nav-ul">
                  <NavBar />
                </ul>
                <div className={`home-div ${bgmaincolor}`}>
                  <div className="categorydiv">
                    <Category />
                  </div>
                  <div className="main-banner">
                    <div className={`banner ${checkBanner}`}>
                      <div className="banner-div" data-testid="banner">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          className="nxtwatchlogo"
                          alt="nxt watch logo"
                        />
                        <button
                          type="button"
                          onClick={this.hide}
                          data-testid="close"
                        >
                          <IoIosClose size={40} />
                        </button>
                      </div>
                      <div className="paid">
                        <p>Buy Nxt Watch Premium prepaid plans with UPI </p>
                        <button type="button">GET IT NOW</button>
                      </div>
                    </div>
                    {this.renderVideoDetails()}
                  </div>
                </div>
              </div>
            )
          }}
        </SavedVideo.Consumer>
      </>
    )
  }
}

export default Home
