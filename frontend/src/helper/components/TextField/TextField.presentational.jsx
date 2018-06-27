// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'
// styles
import styles from '../../style/appStyle'

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
})

const TextField = ({ isError, label, value, onChange }) => (
  <MuiThemeProvider theme={theme}>
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      helperText="required"
      error={isError}
      required
      fullWidth
      multiline
    />
  </MuiThemeProvider>
)

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextField
