// modules
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// components
import Root from './root'


const renderLoglite = () => {
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    window.document.getElementById('root'),
  )
}

renderLoglite()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    renderLoglite()
  })
}
