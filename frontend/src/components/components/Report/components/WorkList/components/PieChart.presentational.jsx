// modules
import React from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
// helpers
import { formattedSeconds } from '../../../../../../helper/functions/time.helper'
// const
const COLORS = [
  '#b93433',
  '#8a2f77',
  '#f8ce56',
  '#62aaaf',
  '#FF8042',
  '#00C49F',
  '#FFBB28',
  '#0088FE',
]

function CustomizedPieChart(props) {
  return (
    <PieChart width={310} height={100} margin={{ bottom: 10 }}>
      <Pie
        data={props.pieChartData}
        dataKey="value"
        cx="50%"
        cy="100%"
        startAngle={180}
        endAngle={0}
        innerRadius={50}
        outerRadius={80}
        paddingAngle={3}
        animationDuration={1000}
      >
        {props.pieChartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={value => formattedSeconds(value)}
        animationDuration={500}
      />
    </PieChart>
  )
}

CustomizedPieChart.propTypes = {
  pieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CustomizedPieChart
