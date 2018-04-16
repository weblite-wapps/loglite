// models
import Tag from '../../../models/tag'


export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(5)
  .exec()

export const countTags = async query => Tag
  .find(query)
  .count()
  .exec()

export const saveTag = async tag => new Tag(tag)
  .save()

export const updateTag = async (query, updateObject) => Tag
  .update(query, updateObject)
  .exec()
