import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import Videositemdetails from '../videoItemDetails'
import Category from '../Category'

import NavBar from '../Navbar'
import SavedVideo from '../../Context/changeVideo'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Showvideolist extends Component {
  state = {
    videoitemdetail: [],
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideosDetails()
  }

  getVideosDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props // Assuming you're using React Router for routing
    const {id} = match.params

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const {
        channel,
        description,
        id,
        published_at,
        thumbnail_url,
        title,
        video_url,
        view_count,
      } = data.video_details

      const updatedVideodetails = {
        videoUrl: video_url,
        description: description,
        publishedAt: published_at,
        thumbnailUrl: thumbnail_url,
        title: title,
        viewCount: view_count,
        channel: {
          name: channel.name,
          profileImg: channel.profile_image_url,
          subscriberCount: channel.subscriber_count,
        },
      }
      this.setState({
        videoitemdetail: [updatedVideodetails],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickliked = () => {
    this.setState(prev => ({isLiked: !prev.isLiked, isDisliked: false}))
  }

  clickDisliked = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  checkSaved = () => {
    this.setState({isSaved: true})
  }

  retry = () => {
    this.setState(this.getVideosDetails)
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
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" className="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderVideoDetailsView = () => {
    const {videoitemdetail, isLiked, isDisliked, isSaved} = this.state

    return (
      <SavedVideo.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgmaincolorvideo = isDarkTheme
            ? 'darkbgcolorvideo'
            : 'normalbgcolorvideo'

          return (
            <ul className={`videos-div3 ${bgmaincolorvideo}`}>
              {videoitemdetail.map(each => (
                <Videositemdetails
                  key={each.id}
                  videoDetailing={{
                    videoUrl: each.videoUrl,
                    description: each.description,
                    publishedAt: each.publishedAt,
                    title: each.title,
                    viewCount: each.viewCount,
                    thumbnailurl: each.thumbnailUrl,
                    name: each.channel.name,
                    profileImg: each.channel.profileImg,
                    subscriberCount: each.channel.subscriberCount,
                  }}
                  clickliked={this.clickliked}
                  clickDisliked={this.clickDisliked}
                  checkSaved={this.checkSaved}
                  isLiked={isLiked}
                  isDisliked={isDisliked}
                  isSaved={isSaved}
                />
              ))}
            </ul>
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
            <div className="super-container">
              <ul className="nav-ul">
                <NavBar />
              </ul>
              <div className={`home-div ${bgmaincolor}`}>
                <div className="categorydiv">
                  <Category />
                </div>
                {this.renderVideoDetails()}
              </div>
            </div>
          )
        }}
      </SavedVideo.Consumer>
    )
  }
}

export default Showvideolist
