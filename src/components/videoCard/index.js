import './index.css'

import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

const VideoCard = props => {
  const {VideoDetails} = props
  const {
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    channel: {name, profileImageUrl},
  } = VideoDetails

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
    <li className="video-li">
      <Link to={`videos/${id}`} className="one-card">
        <img src={thumbnailUrl} className="thumbnail" alt="video thumbnail" />
        <div className="profile-img-div">
          <div>
            <img
              src={profileImageUrl}
              className="profileImg"
              alt="channel logo"
            />
          </div>
          <div className="title-div">
            <p className="title">{title}</p>
            <p className="title2">{name}</p>
            <div className="view-count-div">
              <p className="title2">{viewCount}</p>

              <p className="title2">{`${dateny} ago`}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoCard
