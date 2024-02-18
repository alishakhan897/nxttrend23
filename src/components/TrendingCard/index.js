import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

const TrendingCards = props => {
  const {TrendingCardDetails} = props
  const {
    publishedAt,
    thumbnailUrl,
    title,
    id,
    viewCount,
    channel: {name, profileImageUrl},
  } = TrendingCardDetails

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
    <Link to={`videos/${id}`} className="trendinglist">
      <img src={thumbnailUrl} className="trending-card" />
      <div className="trending-title-div">
        <h3>{title}</h3>
        <p className="trendingname">{name}</p>
        <div className="trendingviewcard">
          <p>{viewCount}</p>
          <p>{`${dateny} ago`}</p>
        </div>
      </div>
    </Link>
  )
}

export default TrendingCards
