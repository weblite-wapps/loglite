// modules
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// components
import Root from '../src/setup/root'

// for dev mode
if (process.env.NODE_ENV !== 'production') {
  const { registerObserver } = require('react-perf-devtool')
  window.observer = registerObserver()
}


const renderLoglite = () => render(
  <AppContainer>
    <Root />
  </AppContainer>,
  window.document.getElementById('root'),
)

renderLoglite()

// Hot Module Replacement API
if (module.hot) module.hot.accept('../src/setup/root', renderLoglite)
