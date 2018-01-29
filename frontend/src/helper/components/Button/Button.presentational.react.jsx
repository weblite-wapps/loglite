// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui/styles'
import Button from 'material-ui/Button'
// css
import theme from './Button.helper'

export default function CustomButton(props) {
  const { isCustome, label, onClick } = props

  return (
    <MuiThemeProvider theme={theme}>
      { isCustome ?
        <Button onClick={onClick}>
          {label}
        </Button> :
        <Button dense onClick={onClick}>
          {label}
        </Button> }
    </MuiThemeProvider>
  )
}

CustomButton.propTypes = {
  isCustome: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

CustomButton.defaultProps = {
  isCustome: false,
  onClick: null,
}
