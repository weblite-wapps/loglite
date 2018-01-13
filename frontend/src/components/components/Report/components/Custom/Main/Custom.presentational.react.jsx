// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { CSVDownload } from 'react-csv'
// components
import StartDatePicker from '../components/StartDatePicker/StartDatePicker.container.react'
import EndDatePicker from '../components/EndDatePicker/EndDatePicker.container.react'
import Button from '../../../../common/Button/Button.presentational.react'
import TagList from '../../../../common/TagList/TagList.presentational.react'
import Autocomplete from '../../../../common/Autocomplete/Autocomplete.presentational.react'
// scssClasses
import scssClasses from './Custom.scss'


export default class Custom extends React.Component {
  constructor(props) {
    super(props)
    this.handleCalculation = this._handleCalculation.bind(this)
    this.handleExport = this._handleExport.bind(this)
    this.handleAddTag = this._handleAddTag.bind(this)
    this.state = {
      startDateIsError: false,
      endDateIsError: false,
    }
  }

  _handleCalculation() {
    const { startDate, endDate, calculateTotalDuration, changeSnackbarStage } = this.props
    if (startDate && endDate) calculateTotalDuration()
    else if (!startDate) {
      this.setState({ startDateIsError: true })
      changeSnackbarStage(true, 'Choose start date!')
    } else {
      this.setState({ endDateIsError: true })
      changeSnackbarStage(true, 'Choose end date!')
    }
  }

  _handleExport() {
    const { startDate, endDate, convertJSONToCSV, changeSnackbarStage } = this.props
    if (startDate && endDate) convertJSONToCSV()
    else if (!startDate) {
      this.setState({ startDateIsError: true })
      changeSnackbarStage(true, 'Choose start date!')
    } else {
      this.setState({ endDateIsError: true })
      changeSnackbarStage(true, 'Choose end date!')
    }
  }

  _handleAddTag() {
    const { queryTag, tags, addTag, changeSnackbarStage } = this.props
    if (queryTag) {
      if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
        addTag()
      } else {
        changeSnackbarStage(true, 'repetitive tag!')
      }
    } else {
      changeSnackbarStage(true, 'select or input tag first!')
    }
  }

  render() {
    const { startDateIsError, endDateIsError } = this.state
    const { CSV, tags, suggestions, onTagClick, queryTag, onQueryTagChange } = this.props
    return (
      <div>
        <StartDatePicker isError={startDateIsError} />
        <EndDatePicker isError={endDateIsError} />
        <div className={scssClasses.textField}>
          <Autocomplete
            label="Tags"
            suggestions={suggestions}
            inputValue={queryTag}
            onInputValueChange={e => onQueryTagChange(e.target.value)}
            onSelect={value => onQueryTagChange(value)}
            onAdd={this.handleAddTag}
          />
          <Button label="Add" onClick={this.handleAddTag} />
        </div>
        <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
        <div className={scssClasses.buttons}>
          <Button label="Calculate" onClick={this.handleCalculation} />
          <span style={{ margin: '5px' }} />
          <Button label="Export" onClick={this.handleExport} />
          {
            CSV ?
              <CSVDownload
                data={CSV}
                separator=";"
                filename="LogliteReport.csv"
                target="_blank"
              /> : null
          }
        </div>
      </div>
    )
  }
}

Custom.propTypes = {
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  CSV: PropTypes.string.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  calculateTotalDuration: PropTypes.func.isRequired,
  convertJSONToCSV: PropTypes.func.isRequired,
  changeSnackbarStage: PropTypes.func.isRequired,
}
