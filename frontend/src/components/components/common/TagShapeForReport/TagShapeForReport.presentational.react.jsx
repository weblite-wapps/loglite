// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
// scssClasses
import scssClasses from './TagShapeForReport.scss'


export default function TagShape(props) {
  return (
    <div className={scssClasses.container}>
      <div className={scssClasses.content}>
        <Typography type="body1">
          {props.tag}
        </Typography>
      </div>
    </div>
  )
}


TagShape.propTypes = {
  tag: PropTypes.string.isRequired,
}
