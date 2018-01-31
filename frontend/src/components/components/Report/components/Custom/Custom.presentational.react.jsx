// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { CSVDownload } from 'react-csv'
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import StartDatePicker from '../common/StartDatePicker/StartDatePicker.container.react'
import EndDatePicker from '../common/EndDatePicker/EndDatePicker.container.react'
import Button from '../../../../../helper/components/Button/Button.presentational.react'
import TagList from '../../../../../helper/components/TagList/TagList.presentational.react'
import Autocomplete from '../../../../../helper/components/Autocomplete/Autocomplete.presentational.react'
// css
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
    const { startDate, endDate, calculateTotalDuration } = this.props
    if (startDate && endDate) calculateTotalDuration()
    else if (!startDate) {
      this.setState({ startDateIsError: true })
      snackbarMessage({ message: 'Choose start date!' })
    } else {
      this.setState({ endDateIsError: true })
      snackbarMessage({ message: 'Choose end date!' })
    }
  }

  _handleExport() {
    const { startDate, endDate, convertJSONToCSV } = this.props
    if (startDate && endDate) convertJSONToCSV()
    else if (!startDate) {
      this.setState({ startDateIsError: true })
      snackbarMessage({ message: 'Choose start date!' })
    } else {
      this.setState({ endDateIsError: true })
      snackbarMessage({ message: 'Choose end date!' })
    }
  }

  _handleAddTag() {
    const { queryTag, tags, addTag } = this.props
    if (queryTag) {
      if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
        addTag()
      } else {
        snackbarMessage({ message: 'repetitive tag!' })
      }
    } else {
      snackbarMessage({ message: 'select or write tag first!' })
    }
  }

  render() {
    const { startDateIsError, endDateIsError } = this.state
    const { tags, suggestions, onTagClick, queryTag, onQueryTagChange, CSV } = this.props
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
        </div>
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
}
