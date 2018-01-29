// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  container: {
    margin: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})

function EndDatePicker(props) {
  const { isError, endDate, onEndDateChange, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="End Date"
        type="date"
        value={endDate}
        onChange={onEndDateChange}
        className={classes.textField}
        required
        error={isError}
        InputProps={{
            classes: {
              inkbar: classes.textFieldInkbar,
            },
          }}
        InputLabelProps={{
          className: classes.textFieldFormLabel,
          shrink: true,
          }}
      />
    </form>
  )
}

EndDatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  endDate: PropTypes.string.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(EndDatePicker)
