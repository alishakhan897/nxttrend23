import './index.css'
import {formatDistanceToNow} from 'date-fns'

const SavedVideoList = props => {
  const {SavelistItem} = props
  const {publishedAt, title, thumbnailurl, name, viewCount} = SavelistItem

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
    <li className="savevideo">
      <div className="saved-img-div">
        <img src={thumbnailurl} className="saved-img" alt="Thumbnail" />
      </div>
      <div className="saved-des">
        <h1 className="saved-title">{title}</h1>
        <p>{name}</p>
        <div className="saved-view">
          <p>{viewCount}</p>
          <p>{`${dateny} ago`}</p>
        </div>
      </div>
    </li>
  )
}

export default SavedVideoList
