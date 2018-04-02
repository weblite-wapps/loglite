// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'
import MuiCollapse from 'material-ui/transitions/Collapse'
// components
import Button from '../../../../../helper/components/Button/Button.presentational'
import Picker from '../../../../../helper/components/Picker/Picker.presentational'
// styles
import scssClasses from './Custom.scss'

export const Buttons = ({ onExpand, onAdd }) => (
  <ListItem disableGutters>
    <div className={scssClasses.buttons}>
      <Button label="Custome" onClick={onExpand} componentName="CustomAdd" />
      <Button label="Add" onClick={onAdd} componentName="Add" />
    </div>
  </ListItem>
)

Buttons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
}


export const Collapse = ({ startTime, endTime, date, onStartTimeChange, onEndTimeChange,
  onDateChange, expanded, dateIsError, startTimeIsError, endTimeIsError, onCustomAdd,
}) => (
  <MuiCollapse component="li" in={expanded} timeout="auto" unmountOnExit>
    <Divider />
    <Picker
      label="Date"
      type="date"
      isError={dateIsError}
      value={date}
      onChange={onDateChange}
    />
    <Picker
      label="Start time"
      type="time"
      isError={startTimeIsError}
      value={startTime}
      onChange={onStartTimeChange}
    />
    <Picker
      label="End time"
      type="time"
      isError={endTimeIsError}
      value={endTime}
      onChange={onEndTimeChange}
    />
    <div className={scssClasses.buttons}>
      <Button label="Add" onClick={onCustomAdd} componentName="Add" />
    </div>
    <Divider />
  </MuiCollapse>
)

Collapse.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  dateIsError: PropTypes.bool.isRequired,
  startTimeIsError: PropTypes.bool.isRequired,
  endTimeIsError: PropTypes.bool.isRequired,
  onCustomAdd: PropTypes.func,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
}

Collapse.defaultProps = {
  onCustomAdd: null,
}
