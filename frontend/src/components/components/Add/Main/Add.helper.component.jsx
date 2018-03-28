// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import CustomizedTextField from '../../../../helper/components/TextField/TextField.presentational'
// styles
import scssClasses from './Add.scss'

export const TextField = ({ isError, title, onTitleChange }) => (
  <div className={scssClasses.textField}>
    <CustomizedTextField
      label="Title"
      value={title}
      onChange={e => onTitleChange(e.target.value)}
      isError={isError}
    />
  </div>
)

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
}

export const nothing = null
