import './index.css'

import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'

import {FaSave} from 'react-icons/fa'
import SavedVideo from '../../Context/changeVideo'

const Videositemdetails = props => {
  const {
    videoDetailing,
    isLiked,
    isDisliked,
    clickliked,
    clickDisliked,
    checkSaved,
    isSaved,
  } = props
  const {
    videoUrl,
    description,
    publishedAt,
    title,
    viewCount,
    name,
    profileImg,
    subscriberCount,
  } = videoDetailing

  const clickLike = () => {
    clickliked()
  }

  const clickDislike = () => {
    clickDisliked()
  }

  function customFormatDistanceToNow(date) {
    const distance = formatDistanceToNow(date, {addSuffix: false})
    if (/^\d+ years$/.test(distance)) {
      const years = parseInt(distance)
      if (years > 100) {
        return 'Over 100 years ago'
      }
    }
    return distance.replace(/(about|almost|over)\s/g, '')
  }

  const myDate = new Date(publishedAt) // Ensure `publishedAt` is defined and valid
  const dateny = customFormatDistanceToNow(myDate)

  return (
    <SavedVideo.Consumer>
      {value => {
        const {addList} = value

        const buttonSave = () => {
          addList(videoDetailing)
          checkSaved()
        }
        return (
          <>
            <ReactPlayer
              url={videoUrl}
              className="react-player"
              width="100%"
              height="500px"
              controls
            />
            <p>{title}</p>
            <div className="detailvideo">
              <div className="detailvideo2">
                <p>{`${viewCount} views`}</p>
                <p>{`${dateny} ago`}</p>
              </div>
              <div className="detailvideo2">
                <AiFillLike
                  onClick={clickLike}
                  color={isLiked ? '#2563eb' : '#64748b'}
                />
                <button
                  className="likeicon"
                  style={{color: isLiked ? '#2563eb' : '#64748b'}}
                >
                  Like
                </button>
                <div>
                  <AiFillDislike
                    onClick={clickDislike}
                    color={isDisliked ? '#2563eb' : '#64748b'}
                  />
                  <button
                    className="likeicon"
                    style={{color: isLiked ? '#2563eb' : '#64748b'}}
                  >
                    DisLike
                  </button>
                </div>

                <button className="likeicon" onClick={buttonSave}>
                  <FaSave color={isSaved ? '#2563eb' : '#64748b'} />
                  {isSaved ? 'Saved' : 'save'}
                </button>
              </div>
            </div>
            <hr />
            <div className="detail-profile">
              <div>
                <img
                  src={profileImg}
                  className="profile-game"
                  alt="channel logo"
                />
              </div>
              <div>
                <p>{name}</p>
                <p>{`${subscriberCount} subscribers`}</p>
                <div>
                  <p>{description}</p>
                </div>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" // Replace with the actual logo URL
                alt="website logo"
              />
            </div>
          </>
        )
      }}
    </SavedVideo.Consumer>
  )
}

export default Videositemdetails
