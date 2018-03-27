import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// css
import styles from '../../style/appStyle'

const Picker = ({ classes, label, type, isError, value, onChange }) => (
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
      InputProps={{
          classes: {
            inkbar: classes.textFieldInkbar,
          },
        }}
      InputLabelProps={{
        className: classes.textFieldFormLabel,
        shrink: true,
        }}
    />
  </form>
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
