// modeuls
import * as R from 'ramda'


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

export const nothing = null
