// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import CustomizedTextField from '../../../../helper/components/TextField/TextField.presentational.react'
import Autocomplete from '../../../../helper/components/Autocomplete/Autocomplete.presentational.react'
import CustomizedButton from '../../../../helper/components/Button/Button.presentational.react'
import TagList from '../../../../helper/components/TagList/TagList.presentational.react'
// styles
import scssClasses from './Add.scss'

export const TextField = ({ isError, title, onTitleChange }) => (
  <div className={scssClasses.textField}>
    <CustomizedTextField
      label="Title"
      value={title}
      onChange={e => onTitleChange(e.target.value)}
      isError={isError}
    />
  </div>
)

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
}


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
