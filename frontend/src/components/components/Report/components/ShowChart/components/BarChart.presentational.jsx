// modules
import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts'
// helpers
import { formattedMinutes } from '../../../../../../helper/functions/time.helper'
// const
const COLORS = ['#b93433', '#8a2f77', '#f8ce56', '#62aaaf', '#FF8042', '#00C49F', '#FFBB28', '#0088FE']


const CustomizedBarChart = ({ barChartData }) => (
  <BarChart
    width={300}
    height={350}
    data={barChartData}
  >
    <CartesianGrid vertical={false} />
    <XAxis dataKey="name" />
    <YAxis dataKey="duration" label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
    <Tooltip
      formatter={duration => formattedMinutes(duration)}
      animationDuration={500}
    />
    <Bar dataKey="duration">
      {
        barChartData.map((entry, index) =>
          <Cell key={index} fill={COLORS[index % COLORS.length]} />)
      }
    </Bar>
  </BarChart>
)

CustomizedBarChart.propTypes = {
  barChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CustomizedBarChart
