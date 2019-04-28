import React from 'react'
import PropTypes from 'prop-types'

export const editLog = ({
  title,
  selectedTags,
  date,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onDateChange,
}) => ({})

editLog.propTypes = {
  title: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  Times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
}
