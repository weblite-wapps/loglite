// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
// components
import TagShape from '../../../../../../helper/components/TagShapeForReport/TagShapeForReport.presentational'
// helpers
import { formattedSeconds } from '../../../../Home/components/TodayWork/TodayWork.helper'
// styles
import scssClasses from './WorkList.scss'

export const TitleAndDuration = ({ log: { title, times }, workDuration, len, secondsElapsed }) => (
  <div className={scssClasses.text}>
    <div>
      <Typography type="subheading">
        { title }
      </Typography>
    </div>
    <div>
      <Typography type="body2" align="right">
        {len && times[len - 1].end === 'running' ? formattedSeconds(secondsElapsed) : workDuration}
      </Typography>
    </div>
  </div>
)

TitleAndDuration.propTypes = {
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired,
  len: PropTypes.number.isRequired,
  secondsElapsed: PropTypes.number.isRequired,
}


export const Tags = ({ log: { tags } }) => (
  <div className={scssClasses.tags}>
    {tags.map((tag, index) => (
      <TagShape
        key={index}
        tag={tag}
      />))}
  </div>
)

Tags.propTypes = {
  log: PropTypes.shape({}).isRequired,
}
