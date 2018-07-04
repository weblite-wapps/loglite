// modules
import * as R from 'ramda'
// views
import { usersView } from '../../Main/App.reducer'


export const getUsername = userId => R.compose(
  R.prop('name'),
  R.find(R.propEq('id', userId)),
)(usersView())
