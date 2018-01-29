// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import TagShape from '../TagShape/TagShape.presentational.react'
// scssClasses
import scssClasses from './TagList.scss'


export default function TagList(props) {
  const { tags, onTagClick } = props

  return (
    <div className={scssClasses.tags}>
      {tags.map(tag => (
        <TagShape
          onTagClick={() => onTagClick(tag)}
          key={tag._id}
          tag={tag}
        />
       ))}
    </div>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTagClick: PropTypes.func.isRequired,
}
