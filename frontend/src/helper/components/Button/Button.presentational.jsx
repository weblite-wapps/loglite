// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// css
import styles from './Button.style'


const CustomizedButton = (props) => {
  const { componentName, label, variant, classes, ...otherProps } = props
  return (
    <Button
      {...otherProps}
      variant={variant}
      classes={{ root: classes[componentName], raised: classes[`${componentName}Raised`] }}
    >
      {props.children}
      {label}
    </Button>
  )
}


CustomizedButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  classes: PropTypes.shape({}).isRequired,
  componentName: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
}

CustomizedButton.defaultProps = {
  componentName: 'default',
  children: null,
  label: null,
  variant: 'contained',
}

export default withStyles(styles)(CustomizedButton)
