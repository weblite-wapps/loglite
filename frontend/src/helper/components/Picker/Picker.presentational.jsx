import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// styles
import styles from '../../style/appStyle'

const Picker = ({
  classes,
  label,
  type,
  isError,
  value,
  onChange,
  defaultValue,
}) => (
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
      InputLabelProps={{ className: classes.textFieldFormLabel, shrink: true }}
      defaultValue={defaultValue}
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
  defaultValue: PropTypes.string.isRequired,
}

export default withStyles(styles)(Picker)
