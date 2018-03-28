// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import Autocomplete from '../components/Autocomplete/Autocomplete.presentational.react'
import CustomizedButton from '../components/Button/Button.presentational.react'
import TagList from '../components/TagList/TagList.presentational.react'
import Picker from '../components/Picker/Picker.presentational'
// styles
import scssClasses from './common.scss'


export const TagPanel = (
  { suggestions, queryTag, onQueryTagChange, tags, onTagClick, handleAddTag }) => (
    <React.Fragment>
      <div className={scssClasses.textField}>
        <Autocomplete
          label="Tags"
          suggestions={suggestions}
          inputValue={queryTag}
          onInputValueChange={e => onQueryTagChange(e.target.value)}
          onSelect={value => onQueryTagChange(value)}
          onAdd={handleAddTag}
        />
        <CustomizedButton label="ADD" onClick={handleAddTag} componentName="Add" />
      </div>
      <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
    </React.Fragment>
)

TagPanel.propTypes = {
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
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
