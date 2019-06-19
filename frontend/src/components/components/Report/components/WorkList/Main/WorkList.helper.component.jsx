// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
// components
import TagShape from '../../../../../../helper/components/TagShapeForReport/TagShapeForReport.presentational'
// helpers
import { PinButton } from '../../../../Home/components/TodayWork/TodayWork.helper.component'
import { formattedSeconds } from '../../../../Home/components/TodayWork/TodayWork.helper'
// styles
import './WorkList.scss'

export const TitleAndDuration = (props) => {

  const { log: { title, times }, workDuration, len, secondsElapsed } = props

  return (
    <div dir="auto" className="workList-title-container">
      <div className="workList-pin-and-title">
        <PinButton {...props} />

        <div>
          <Typography variant="subtitle1">{title}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1" align="right">
          {len && times[len - 1].end === 'running'
            ? formattedSeconds(secondsElapsed)
            : workDuration}
        </Typography>
      </div>
    </div>
  )
}

TitleAndDuration.propTypes = {
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired,
  len: PropTypes.number.isRequired,
  secondsElapsed: PropTypes.number.isRequired,
}

export const Tags = ({ log: { tags } }) => (
  <div dir="auto" className="workList-tags">
    {tags.map((tag, index) => (
      <TagShape key={index} tag={tag} />
    ))}
  </div>
)

Tags.propTypes = {
  log: PropTypes.shape({}).isRequired,
}
