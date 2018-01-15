// modules
import http from 'http'
import app from './server'
import './mongodb'
import '../logic/route'


http
  .createServer(app)
  .listen(3080)
