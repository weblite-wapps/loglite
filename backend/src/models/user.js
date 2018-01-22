// module
import mongoose from 'mongoose'

const { Schema } = mongoose

// create a schema
const UserSchema = new Schema({
  userId: String,
  name: Number,
  wis: Number,
})

export default mongoose.model('User', UserSchema)
