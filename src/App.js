import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/login'
import Home from './components/home'
import ProtectedRoute from './components/ProtectedRoute'
import TrendingVideos from './components/Trending'
import GamingVideosRoute from './components/Gaming'
import Showvideolist from './components/showvideo'
import SavedVideo from './Context/changeVideo'
import SaveVideo from './components/SavedVideo'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {savedList: [], isDarkTheme: false, ActiveTab: 'home'}

  addList = video => {
    this.setState(prev => ({savedList: [...prev.savedList, video]}))
  }

  toggleTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  changetab = tab => {
    this.setState({ActiveTab: tab})
  }

  render() {
    const {savedList, isDarkTheme, ActiveTab} = this.state

    return (
      <SavedVideo.Provider
        value={{
          savedList,
          isDarkTheme,
          ActiveTab,
          addList: this.addList,
          toggleTheme: this.toggleTheme,
          changetab: this.changetab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideosRoute} />
          <ProtectedRoute exact path="/videos/:id" component={Showvideolist} />
          <ProtectedRoute exact path="/saved" component={SaveVideo} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SavedVideo.Provider>
    )
  }
}

export default App
