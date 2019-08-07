// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { getUsername, getProfileImage } from './Leaderboard.helper'

const getLeaderboard = state => state.Report.leaderboard

const getLeaderboardData = createSelector(
  [getLeaderboard],
  R.map(({ userId, ...other }) => ({
    userId,
    username: getUsername(userId), 
    profileImage: getProfileImage(userId),
    ...other,
  })),
)

export { getLeaderboardData }