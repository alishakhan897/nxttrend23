import './index.css'
import {Link} from 'react-router-dom'

const GamingCards = props => {
  const {GamingDetails} = props
  const {thumbnailUrl, title, viewCount, id} = GamingDetails

  return (
    <>
      <Link to={`videos/${id}`} className="link-card">
        <li className="one-card-game">
          <img
            src={thumbnailUrl}
            className="thumbnail2"
            alt="video thumbnail"
          />

          <div className="title-div-3">
            <p className="title">{title}</p>

            <p className="title2">{viewCount} Watching Worldwide</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default GamingCards
