// module
import mongoose from 'mongoose'

const { Schema } = mongoose

// create a schema
const LogSchema = new Schema({
  title: String,
  tags: [String],
  date: String,
  times: [{
    start: Date,
    end: Schema.Types.Mixed,
  }],
  isPinned: Boolean,
  created_at: Date,
  userId: String,
  wis: String,
})

export default mongoose.model('Log', LogSchema)
