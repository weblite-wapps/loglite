// module
import mongoose from 'mongoose'

const { Schema } = mongoose

// create a schema
const PinSchema = new Schema({
  logId: String,
  title: String,
  tags: [String],
  lastDate: String,
  created_at: Date,
  userId: String,
  wis: String,
})

export default mongoose.model('Pin', PinSchema)
