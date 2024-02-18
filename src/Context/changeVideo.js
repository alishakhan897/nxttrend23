// changeVideo.js
import React from 'react'

const SavedVideo = React.createContext({
  isDarkTheme: true,
  ActiveTab: 'home',
  toggleTheme: () => {},
  savedList: [],
  addList: () => {},
  changetab: () => {},
})

export default SavedVideo
