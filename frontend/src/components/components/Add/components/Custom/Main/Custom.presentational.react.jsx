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


export default class Custom extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this._handleClick.bind(this)
    this.state = {
      expanded: false,
    }
  }

  _handleClick() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    const { dateIsError, startTimeIsError, endTimeIsError, onAdd, onCustomAdd } = this.props

    return (
      <div>
        <List disablePadding className={scssClasses.list}>
          <ListItem disableGutters>
            <div className={scssClasses.buttons}>
              <Button label="Custome" onClick={this.handleClick} componentName="CustomAdd" />
              <Button label="Add" onClick={onAdd} componentName="Add" />
            </div>
          </ListItem>
          <Collapse component="li" in={this.state.expanded} timeout="auto" unmountOnExit>
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
  }
}

Custom.propTypes = {
  dateIsError: PropTypes.bool.isRequired,
  startTimeIsError: PropTypes.bool.isRequired,
  endTimeIsError: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onCustomAdd: PropTypes.func,
}

Custom.defaultProps = {
  onCustomAdd: null,
}
