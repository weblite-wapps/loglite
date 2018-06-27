import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'
// styles
import styles from '../../style/appStyle'


const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const Picker = ({ classes, label, type, isError, value, onChange }) => (
  <MuiThemeProvider theme={theme}>
    <form className={classes.container} noValidate>
      <TextField
        id={type}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        className={classes.textField}
        required
        error={isError}
        InputProps={{ classes: { focused: classes.textFieldInkbar } }}
        InputLabelProps={{ className: classes.textFieldFormLabel, shrink: true }}
      />
    </form>
  </MuiThemeProvider>
)

Picker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(Picker)
