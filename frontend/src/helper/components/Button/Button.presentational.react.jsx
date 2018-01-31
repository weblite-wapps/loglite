// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
// css
import styles from './Button.style'

function CustomizedButton(props) {
  const { componentName, label, fab, disabled, raised, onClick, classes } = props
  return (
    <Button
      fab={fab}
      disabled={disabled}
      raised={raised}
      onClick={onClick}
      classes={{ root: classes[componentName], raised: classes[`${componentName}Raised`] }}
    >
      {props.children}
      {label}
    </Button>
  )
}

CustomizedButton.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.shape({}).isRequired,
  componentName: PropTypes.string,
  label: PropTypes.string,
  fab: PropTypes.bool,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

CustomizedButton.defaultProps = {
  componentName: 'default',
  children: null,
  label: null,
  raised: false,
  disabled: false,
  fab: false,
  onClick: null,
}

export default withStyles(styles)(CustomizedButton)
