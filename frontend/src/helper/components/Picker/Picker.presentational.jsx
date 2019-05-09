import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// styles
import styles from '../../style/appStyle'

const Picker = ({ classes, label, type, isError, value, style, onChange }) => (
  <form className={classes.container} noValidate>
    <TextField
      style={style}
      id={type}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      className={classes.textField}
      required
      error={isError}
      InputLabelProps={{ className: classes.textFieldFormLabel, shrink: true }}
    />
  </form>
)

Picker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

Picker.defaultProps = {
  style: {},
}

export default withStyles(styles)(Picker)
