// modeuls
import * as R from 'ramda'


export const checkBeforeAddTag = (queryTag, tags) => {
  if (R.trim(queryTag)) {
    if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
      return ({
        message: null,
        permission: true,
      })
    }
    return ({
      message: 'repetitive tag!',
      permission: false,
    })
  }
  return ({
    message: 'select or write tag first!',
    permission: false,
  })
}

export const nothing = null
