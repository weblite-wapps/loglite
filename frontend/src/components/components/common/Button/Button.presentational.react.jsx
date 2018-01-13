// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Button from 'material-ui/Button'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: '#919191',
        color: 'white',
        borderRadius: '0px',
        padding: '2px 15px',
        margin: '0px 10px 0px 5px',
        textTransform: 'capitalize',
      },
      dense: {
        backgroundColor: '#505050',
        color: 'white',
        borderRadius: '0px',
        padding: '2px 15px',
        margin: '0px',
        minWidth: '5px',
        minHeight: '37px',
      },
    },
  },
})


function CustomButton(props) {
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

export default CustomButton
