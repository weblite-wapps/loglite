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
// helpers
import { getUsername } from './Leaderboard.helper'
// sccsClasses
import scssClasses from './Leaderboard.scss'


const Leaderbord = ({ leaderboard }) => (
  <div className={scssClasses.container}>
    <List>
      {
        leaderboard.map(person => {
          const username = getUsername(person.userId)

          return (
            <ListItem key={person.userId} className={scssClasses.listItem}>
              <Avatar style={{ backgroundColor: mapCharsToColor(username) }}>
                {R.head(username)}
              </Avatar>

              <ListItemText primary={username} />

              <ListItemSecondaryAction>
                <Typography> {person.score} </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        )
      }
    </List>
  </div>
)

export default Leaderbord
