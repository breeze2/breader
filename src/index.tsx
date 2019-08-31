import { Color, Titlebar } from 'custom-electron-titlebar'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import icon from './images/icon.png'
import './sentry'
import * as serviceWorker from './serviceWorker'

const isWindows = process.platform === 'win32'

if (isWindows) {
  const titlebar = new Titlebar({
    backgroundColor: Color.fromHex('#444'),
    icon,
  })
  titlebar.updateTitle()
}

ReactDOM.render(
  <App className={`${isWindows ? 'is-windows' : ''}`} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
