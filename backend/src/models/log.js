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
  userId: String,
  wis: String,
})

export default mongoose.model('Log', LogSchema)
