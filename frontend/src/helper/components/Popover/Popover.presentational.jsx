// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
// styles
import styles from '../../components/Button/Button.style'

const CustomizedPopover = ({
  classes,
  popoverIsOpen,
  anchorEl,
  anchorReference,
  onClose,
  onYep,
  onNop,
}) => (
  <Popover
    open={popoverIsOpen}
    onClose={onClose}
    anchorEl={anchorEl}
    anchorReference={anchorReference}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <Typography variant="subtitle1" style={{ margin: '5px' }}>
      Are you sure?
    </Typography>
    <Button
      variant="contained"
      onClick={onYep}
      classes={{ contained: classes.WorkList }}
    >
      Yep
    </Button>
    <Button
      variant="contained"
      onClick={onNop}
      classes={{ contained: classes.WorkList }}
    >
      Nope
    </Button>
  </Popover>
)

CustomizedPopover.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  popoverIsOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({}),
  anchorReference: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onYep: PropTypes.func.isRequired,
  onNop: PropTypes.func.isRequired,
}

CustomizedPopover.defaultProps = {
  anchorEl: null,
}

export default withStyles(styles)(CustomizedPopover)
