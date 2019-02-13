// modules
import React from "react"
import * as R from "ramda"
import Avatar from "@material-ui/core/Avatar"
// local modules
import { mapCharsToColor } from "../../../../../helper/functions/colorMap.helper"
// views
import { usersView } from "../../../../Main/App.reducer"

export const getUsername = userId =>
  R.compose(
    R.prop("name"),
    R.find(R.propEq("id", userId)),
  )(usersView())

export default ({ username }) => (
  <Avatar style={{ backgroundColor: mapCharsToColor(username) }}>
    {R.head(username)}
  </Avatar>
)