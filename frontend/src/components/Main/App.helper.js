// modeuls
import * as R from 'ramda'
// views
import {
  logsView
} from './App.reducer'
// helpers
import {
  checkToShowInHome
} from '../components/Home/Main/Home.helper'
import {
  formattedDate
} from '../../helper/functions/date.helper'
import {
  getNow
} from '../../helper/functions/time.helper'

const getObject = (message, permission) => ({
  message,
  permission
})

export const checkBeforeAddTag = (queryTag, tags) => {
  if (R.trim(queryTag)) {
    if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
      return getObject(null, true)
    }
    return getObject('repetitive tag!', false)
  }
  return getObject('select or write tag first!', false)
}

const filteredLogs = () => R.filter(checkToShowInHome)(logsView())

const checkIsUnique = title =>
  R.findIndex(R.propEq('title', title))(filteredLogs()) === -1

export const getUnique = R.compose(
  R.filter(pin => checkIsUnique(pin.title)),
  R.filter(pin => pin.lastDate !== formattedDate(getNow())),
)

export const mapToUsername = users => R.map(user => user.name, users)

export const isUniqueLog = _id => R.compose(
  R.not,
  R.length,
  R.filter(log => log._id === _id),
  R.filter(log => log.date === formattedDate(getNow())),
)(logsView())

export const getLog = _id => R.find(R.propEq('_id', _id))(logsView())