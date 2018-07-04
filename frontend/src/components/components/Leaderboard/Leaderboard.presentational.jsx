// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// local modules
import { mapCharsToColor } from 'weblite-web-list'
// component
import BarChart from '../../../helper/components/BarChart/BarChart.presentational'
// helpers
import { getLeaderboardData } from './Leaderboard.helper'
// sccsClasses
import scssClasses from './Leaderboard.scss'


const Leaderbord = ({ leaderboard }) => {
  const leaderboardData = getLeaderboardData(leaderboard)

  return (
    <div className={scssClasses.container}>
      <div className={scssClasses.chart}>
        <BarChart barChartData={leaderboardData} XDataKey="username" YDataKey="score" />
      </div>

      <List>
        {
          leaderboardData.map(({ userId, username, score }) => (
            <ListItem key={userId} className={scssClasses.listItem}>
              <Avatar style={{ backgroundColor: mapCharsToColor(username) }}>
                {R.head(username)}
              </Avatar>

              <ListItemText primary={username} />

              <ListItemSecondaryAction>
                <Typography> {score} </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default Leaderbord
