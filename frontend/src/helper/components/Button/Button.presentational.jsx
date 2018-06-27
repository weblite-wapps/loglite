// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// css
import styles from './Button.style'


const CustomizedButton = (props) => {
  const { componentName, label, disabled, variant, onClick, classes } = props
  return (
    <Button
      disabled={disabled}
      variant={variant}
      onClick={onClick}
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

CustomizedButton.defaultProps = {
  componentName: 'default',
  children: null,
  label: null,
  variant: 'contained',
  disabled: false,
  onClick: () => {},
}

export default withStyles(styles)(CustomizedButton)
