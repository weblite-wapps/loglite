// modules
import http from 'http'
// components
import app from './server'
import './mongodb'
import '../logic/main/route'


http
  .createServer(app)
  .listen(3080)
