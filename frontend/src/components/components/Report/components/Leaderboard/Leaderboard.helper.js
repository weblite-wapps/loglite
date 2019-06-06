// modules
import React from 'react'
import * as R from 'ramda'
import Avatar from '@material-ui/core/Avatar'
// local modules
import { mapCharsToColor } from '../../../../../helper/functions/colorMap.helper'
// views
import { usersView } from '../../../../Main/App.reducer'

export const getUsername = userId =>
  R.compose(
    R.prop('username'),
    R.find(R.propEq('id', userId)),
  )(usersView())

export const getProfileImage = userId =>
  R.compose(
    R.prop('profileImage'),
    R.find(R.propEq('id', userId)),
  )(usersView())

export default ({ username, profileImage }) => (
  <Avatar
    src={profileImage && `https://www.weblite.me:3000/image/${profileImage}`}
    style={{ backgroundColor: mapCharsToColor(username) }}
  >
    {(!profileImage) && R.head(username)}
  </Avatar>
)