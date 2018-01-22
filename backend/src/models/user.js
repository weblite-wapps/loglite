// module
import mongoose from 'mongoose'

const { Schema } = mongoose

// create a schema
const UserSchema = new Schema({
  id: String,
  name: String,
  wis: String,
})

export default mongoose.model('User', UserSchema)
