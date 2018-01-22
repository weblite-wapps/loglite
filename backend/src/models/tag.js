// module
import mongoose from 'mongoose'

const { Schema } = mongoose

// create a schema
const TagSchema = new Schema({
  label: String,
  number: Number,
  userId: String,
  wis: String,
})

export default mongoose.model('Tag', TagSchema)
