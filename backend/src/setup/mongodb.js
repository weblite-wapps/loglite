import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost:27017/LogLite')
mongoose.Promise = Promise
const db = mongoose.connection
db.on('error', console.log)
