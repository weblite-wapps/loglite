// modules
import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts'
// local modules
import { mapCharsToColor } from '../../functions/colorMap.helper'
// helpers
import { formattedMinutes } from '../../functions/time.helper'
// const
const COLORS = ['#b93433', '#8a2f77', '#f8ce56', '#62aaaf', '#FF8042', '#00C49F', '#FFBB28', '#0088FE']


const CustomizedBarChart = ({ barChartData, XDataKey, YDataKey }) => (
  <BarChart width={310} height={310} data={barChartData}>
    <CartesianGrid vertical={false} />

    <XAxis dataKey={XDataKey} />

    <YAxis dataKey={YDataKey} />

    <Tooltip formatter={duration => formattedMinutes(duration)} animationDuration={500} />

    <Bar dataKey={YDataKey}>
      {
        barChartData.map((entry, index) =>
          <Cell
            key={index}
            fill={entry.username ? mapCharsToColor(entry.username) : COLORS[index % COLORS.length]}
          />)
      }
    </Bar>
  </BarChart>
)

CustomizedBarChart.propTypes = {
  barChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CustomizedBarChart
