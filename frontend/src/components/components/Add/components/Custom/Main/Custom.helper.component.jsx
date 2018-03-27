// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'
import MuiCollapse from 'material-ui/transitions/Collapse'
// components
import Button from '../../../../../../helper/components/Button/Button.presentational.react'
import DatePicker from '../components/DatePicker/DatePicker.container.react'
import StartTimePicker from '../components/StartTimePicker/StartTimePicker.container.react'
import EndTimePicker from '../components/EndTimePicker/EndTimePicker.container.react'
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


export const Collapse = (
  { expanded, dateIsError, startTimeIsError, endTimeIsError, onCustomAdd }) => (
    <MuiCollapse component="li" in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <DatePicker isError={dateIsError} />
      <StartTimePicker isError={startTimeIsError} />
      <EndTimePicker isError={endTimeIsError} />
      <div className={scssClasses.buttons}>
        <Button label="Add" onClick={onCustomAdd} componentName="Add" />
      </div>
      <Divider />
    </MuiCollapse>
)

Collapse.propTypes = {
  expanded: PropTypes.bool.isRequired,
  dateIsError: PropTypes.bool.isRequired,
  startTimeIsError: PropTypes.bool.isRequired,
  endTimeIsError: PropTypes.bool.isRequired,
  onCustomAdd: PropTypes.func,
}

Collapse.defaultProps = {
  onCustomAdd: null,
}
