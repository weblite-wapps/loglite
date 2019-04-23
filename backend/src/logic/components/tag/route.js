// modules
import * as R from 'ramda'
// components
import app from '../../../setup/server'
// db helpers
import { fetchTags, countTags, saveTag, updateTag } from './db'
// const
const logger = console.log

app.get('/fetchTags', ({ query: { wis, userId } }, res) =>
  fetchTags({ wis, userId })
    .then(logs => res.json(logs))
    .catch(logger),
)

app.get('/searchTags', ({ query: { wis, userId, label } }, res) =>
  fetchTags({ wis, userId, label: { $regex: `.*${label}.*` } })
    .then(tags => res.json(tags))
    .catch(logger),
)

app.post('/saveTags', ({ body: { wis, userId, tags } }, res) => {
  const addOrUpdateTag = tag =>
    countTags({ wis, userId, label: tag }).then(
      number =>
        number === 0
          ? saveTag({ label: tag, number: 1, userId, wis })
          : updateTag({ label: tag }, { $inc: { number: 1 } }),
    )
  R.forEach(addOrUpdateTag, tags)

  fetchTags({ wis, userId })
    .then(fetchedTags => res.json(fetchedTags))
    .catch(logger)
})
