// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Add from 'material-ui-icons/Add'
import Remove from 'material-ui-icons/Remove'
// scssClasses
import scssClasses from './TagShape.scss'


export default function TagShape(props) {
  const { tag, onTagClick } = props

  return (
    <div className={scssClasses.container} onClick={onTagClick} role="button" tabIndex="0">
      <div className={tag.isSelected ? scssClasses.selected : scssClasses.default}>
        <Typography type="body1">
          {tag.label}
        </Typography>
      </div>
      <div className={scssClasses.icon}>
        {
          tag.isSelected ? <Remove /> : <Add />
        }
      </div>
    </div>
  )
}

TagShape.propTypes = {
  tag: PropTypes.shape({}).isRequired,
  onTagClick: PropTypes.func.isRequired,
}
