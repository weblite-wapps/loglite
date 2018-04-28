// modules
import path from 'path'
import https from 'https'
import fs from 'fs'
// components
import app from './server'
import './mongodb'
import '../logic/main/route'


const privateKey = fs.readFileSync(path.resolve('./src/certs/express.key'), 'utf8')
const certificate = fs.readFileSync(path.resolve('./src/certs/express.crt'), 'utf8')


https
  .createServer({ key: privateKey, cert: certificate }, app)
  .listen(3080)
