// modules
import React from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'

const TextField = ({ isError, label, value, onChange }) => (
  <MuiTextField
    style={{ userSelect: 'none' }}
    label={label}
    value={value}
    onChange={onChange}
    helperText="required"
    error={isError}
    required
    fullWidth
    multiline
  />
)

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextField
