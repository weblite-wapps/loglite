/* eslint-disable no-underscore-dangle */
// modules
import * as R from 'ramda'
// constants
import colors from '../constants/colorDB'

// functions
export const mapFirstCharToColor = R.compose(
  R.nth(R.__, colors),
  R.modulo(R.__, colors.length),
  R.reduce((acc, val) => R.bind(''.charCodeAt)(val)() + acc, 0),
  R.head,
)

export const mapCharsToColor = R.compose(
  R.nth(R.__, colors),
  R.modulo(R.__, colors.length),
  R.reduce((acc, val) => R.bind(''.charCodeAt)(val)() + acc, 0),
  R.split(''),
)
