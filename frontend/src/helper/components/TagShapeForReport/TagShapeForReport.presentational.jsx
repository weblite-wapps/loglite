// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
// scssClasses
import scssClasses from './TagShapeForReport.scss'


const TagShape = ({ tag }) => (
  <div className={scssClasses.container}>
    <div className={scssClasses.content}>
      <Typography variant="body1">
        {tag}
      </Typography>
    </div>
  </div>
)

TagShape.propTypes = {
  tag: PropTypes.string.isRequired,
}

export default TagShape
