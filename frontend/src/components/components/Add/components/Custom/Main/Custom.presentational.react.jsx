// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import List, { ListItem } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
// components
import Button from '../../../../../../helper/components/Button/Button.presentational.react'
import DatePicker from '../components/DatePicker/DatePicker.container.react'
import StartTimePicker from '../components/StartTimePicker/StartTimePicker.container.react'
import EndTimePicker from '../components/EndTimePicker/EndTimePicker.container.react'
// css
import scssClasses from './Custom.scss'

const Custom = ({
  expanded, onExpand, dateIsError, startTimeIsError, endTimeIsError, onAdd, onCustomAdd,
}) => (
  <div>
    <List disablePadding className={scssClasses.list}>
      <ListItem disableGutters>
        <div className={scssClasses.buttons}>
          <Button label="Custome" onClick={onExpand} componentName="CustomAdd" />
          <Button label="Add" onClick={onAdd} componentName="Add" />
        </div>
      </ListItem>
      <Collapse component="li" in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <DatePicker isError={dateIsError} />
        <StartTimePicker isError={startTimeIsError} />
        <EndTimePicker isError={endTimeIsError} />
        <div className={scssClasses.buttons}>
          <Button label="Add" onClick={onCustomAdd} componentName="Add" />
        </div>
        <Divider />
      </Collapse>
    </List>
  </div>
)

Custom.propTypes = {
  expanded: PropTypes.bool.isRequired,
  dateIsError: PropTypes.bool.isRequired,
  startTimeIsError: PropTypes.bool.isRequired,
  endTimeIsError: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onCustomAdd: PropTypes.func,
  onExpand: PropTypes.func.isRequired,
}

Custom.defaultProps = {
  onCustomAdd: null,
}

export default Custom
