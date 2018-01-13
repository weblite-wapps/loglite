// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiTextField from 'material-ui/TextField'


const styles = () => ({
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})


function TextField(props) {
  const { isError, label, value, onChange, classes } = props
  return (
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
}

TextField.propTypes = {
  classes: PropTypes.shape({
    textFieldFormLabel: PropTypes.string.isRequired,
    textFieldInkbar: PropTypes.string.isRequired,
  }).isRequired,
  isError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}


export default withStyles(styles)(TextField)
