// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Add from 'material-ui-icons/Add'
import Remove from 'material-ui-icons/Remove'
// scssClasses
import scssClasses from './TagShape.scss'


const TagShape = ({ tag: { label, isSelected }, onTagClick }) => (
  <div className={scssClasses.container} onClick={onTagClick} role="button" tabIndex="0">
    <div className={isSelected ? scssClasses.selected : scssClasses.default}>
      <Typography type="body1">
        {label}
      </Typography>
    </div>
    <div className={scssClasses.icon}>
      {
        isSelected ? <Remove /> : <Add />
      }
    </div>
  </div>
)

TagShape.propTypes = {
  tag: PropTypes.shape({ isSelected: PropTypes.bool, label: PropTypes.string }).isRequired,
  onTagClick: PropTypes.func.isRequired,
}

export default TagShape
