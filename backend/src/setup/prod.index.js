// components
import app from './server'
import './mongodb'
import '../logic/main/route'


app.listen(3081, () => console.log('Server Running!'))
