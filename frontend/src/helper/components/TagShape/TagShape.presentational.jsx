// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
// styles
import './TagShape.scss'

const TagShape = ({ tag: { label, isSelected }, onTagClick }) => (
  <div
    className="tagShape-container"
    onClick={onTagClick}
    role="button"
    tabIndex="0"
  >
    <div className={isSelected ? 'tagShape-selected' : 'tagShape-default'}>
      <Typography variant="body2">{label}</Typography>
    </div>
    <div className="tagShape-icon">{isSelected ? <Remove /> : <Add />}</div>
  </div>
)

TagShape.propTypes = {
  tag: PropTypes.shape({ isSelected: PropTypes.bool, label: PropTypes.string })
    .isRequired,
  onTagClick: PropTypes.func.isRequired,
}

export default TagShape
