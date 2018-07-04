// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { getUsername } from './Leaderboard.helper'


const getLeaderboard = state => state.Report.leaderboard

const getLeaderboardData = createSelector(
  [getLeaderboard],
  R.map(({ userId, score }) => ({ userId, username: getUsername(userId), score }))
)

export { getLeaderboardData }
