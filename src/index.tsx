import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Root from './views/Root'
import isChromeRuntime from './utils/isChrome'

if (isChromeRuntime()) {
  const body = document.getElementsByTagName('body')[0]
  body.setAttribute('style', 'width: 380px;height:600px')
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
