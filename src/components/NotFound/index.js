import './index.css'

import NavBar from '../Navbar'

import Category from '../Category'

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <div className="home-div">
        <div className="categorydiv">
          <Category />
        </div>

        <div className="videos-div5">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
          />
          <h1>Page not found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
