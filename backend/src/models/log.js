// module
import mongoose from 'mongoose'

const { Schema } = mongoose

// create a schema
const LogSchema = new Schema({
  title: String,
  tags: [String],
  date: String,
  times: [Object],
  wis: Number,
})

export default mongoose.model('Log', LogSchema)
