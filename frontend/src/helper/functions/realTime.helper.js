import { dispatchHandleRealTime } from '../../components/Main/App.action'
import { userIdView } from '../../components/Main/App.reducer'
const { W } = window

W &&
  W.share.subscribe(({ type, data, userId }) => {
    // console.log('type, data  in subs', type, data)
    dispatchHandleRealTime({ type, data, userId })
  })

export const pulse = (type, data) => {
  //   console.log('type, data  in pulse', type, data)
  W &&
    W.share.dispatch(
      [],
      ['__always', [{ type, data, userId: userIdView() }]],
      {},
    )
}
