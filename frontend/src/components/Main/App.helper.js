// modeuls
import * as R from 'ramda'
// views
import { logsView } from './App.reducer'
// helpers
import { checkToShowInHome } from '../components/Home/Main/Home.helper'
import { formattedDate } from '../../helper/functions/date.helper'
import { getNow } from '../../helper/functions/time.helper'

const getObject = (message, permission) => ({ message, permission })

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

const checkIsUnique = logId =>
  R.findIndex(R.propEq('_id', logId))(filteredLogs()) === -1

export const getUnique = R.compose(
  R.filter(pin => checkIsUnique(pin.logId)),
  R.filter(pin => pin.lastDate !== formattedDate(getNow())),
)
