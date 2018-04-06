// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import Autocomplete from '../components/Autocomplete/Autocomplete.presentational'
import CustomizedButton from '../components/Button/Button.presentational'
import TagList from '../components/TagList/TagList.presentational'
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


export const Pickers = ({ isError, startDate, endDate, onStartDateChange, onEndDateChange }) => (
  <React.Fragment>
    <Picker
      label="Start date"
      type="date"
      isError={isError.startDate}
      value={startDate}
      onChange={onStartDateChange}
    />
    <Picker
      label="End date"
      type="date"
      isError={isError.endDate}
      value={endDate}
      onChange={onEndDateChange}
    />
  </React.Fragment>
)

Pickers.propTypes = {
  isError: PropTypes.shape({}).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
}
