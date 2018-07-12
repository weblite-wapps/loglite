// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// local modules
import { mapCharsToColor } from 'weblite-web-list'
// components
import { Pickers, Buttons, BarChart } from '../../../../../helper/functions/common.helper.component'
// helpers
import { formattedMinutes } from '../../../../../helper/functions/time.helper'
// sccsClasses
import scssClasses from './Leaderboard.scss'


const Leaderbord = props => (
  <div className={scssClasses.container}>
    <Pickers {...props} />
    <Buttons {...props} />
    <Divider />

    <BarChart {...props} XDataKey="username" YDataKey="score" />
    <Divider />

    <List>
      {
         props.data
          .sort((personA, personB) => personA.score < personB.score)
          .map(({ userId, username, score }) => (
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

Leaderbord.propTypes = { data: PropTypes.arrayOf(PropTypes.shape({})).isRequired }

export default Leaderbord
