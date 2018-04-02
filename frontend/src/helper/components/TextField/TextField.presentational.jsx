// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiTextField from 'material-ui/TextField'
// styles
import styles from '../../style/appStyle'


const TextField = ({ classes, isError, label, value, onChange }) => (
  <MuiTextField
    label={label}
    value={value}
    onChange={onChange}
    helperText="required"
    error={isError}
    required
    fullWidth
    multiline
    InputProps={{
        classes: {
          inkbar: classes.textFieldInkbar,
        },
      }}
    InputLabelProps={{
      className: classes.textFieldFormLabel,
      }}
  />
)

TextField.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(TextField)
