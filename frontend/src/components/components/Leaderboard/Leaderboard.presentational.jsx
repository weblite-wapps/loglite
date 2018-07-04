// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// local modules
import { mapCharsToColor } from 'weblite-web-list'
// component
import BarChart from '../../../helper/components/BarChart/BarChart.presentational'
// helpers
import { formattedMinutes } from '../../../helper/functions/time.helper'
import { getLeaderboardData } from './Leaderboard.helper'
// sccsClasses
import scssClasses from './Leaderboard.scss'


const Leaderbord = ({ leaderboard }) => {
  const leaderboardData = getLeaderboardData(leaderboard)

  return (
    <div className={scssClasses.container}>
      <Divider />
      <div className={scssClasses.text}>
        <Typography variant="subheading">Leaderbord</Typography>
      </div>
      <Divider />

      <div className={scssClasses.chart}>
        <BarChart barChartData={leaderboardData} XDataKey="username" YDataKey="score" />
      </div>
      <Divider />

      <List>
        {
          leaderboardData.map(({ userId, username, score }) => (
            <React.Fragment key={userId}>
              <ListItem className={scssClasses.listItem}>
                <Avatar style={{ backgroundColor: mapCharsToColor(username) }}>
                  {R.head(username)}
                </Avatar>

                <ListItemText primary={username} />

                <ListItemSecondaryAction>
                  <Typography> {formattedMinutes(score)} </Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider light />
            </React.Fragment>
          ))
        }
      </List>
    </div>
  )
}

export default Leaderbord
