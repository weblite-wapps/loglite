// modules
import React from 'react'
import PropTypes from 'prop-types'
import { CSVDownload } from 'react-csv'
// components
import Button from '../../../../../helper/components/Button/Button.presentational.react'
import Picker from '../../../../../helper/components/Picker/Picker.presentational'
// styles
import scssClasses from './Custom.scss'

export const Buttons = ({ onCalculation, onExport }) => (
  <div className={scssClasses.buttons}>
    <Button label="Calculate" onClick={onCalculation} componentName="Add" />
    <span style={{ margin: '5px' }} />
    <Button label="Export" onClick={onExport} componentName="Add" />
  </div>
)

Buttons.propTypes = {
  onCalculation: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
}


export const CSVDownloader = ({ CSV }) => (
  CSV && <CSVDownload data={CSV} separator=";" filename="LogliteReport.csv" target="_blank" />
)

CSVDownloader.propTypes = {
  CSV: PropTypes.string.isRequired,
}


export const Pickers = ({
  startDateIsError, endDateIsError, startDate, endDate, onStartDateChange, onEndDateChange,
}) => (
  <React.Fragment>
    <Picker
      label="Start date"
      type="date"
      isError={startDateIsError}
      value={startDate}
      onChange={onStartDateChange}
    />
    <Picker
      label="End date"
      type="date"
      isError={endDateIsError}
      value={endDate}
      onChange={onEndDateChange}
    />
  </React.Fragment>
)

Pickers.propTypes = {
  startDateIsError: PropTypes.bool.isRequired,
  endDateIsError: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
}
