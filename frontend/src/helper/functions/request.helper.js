// modules
import request from 'superagent'
// components
import host from '../../setup/config'

export const getRequest = path =>
  request.get(host + path).set('Access-Control-Allow-Origin', '*')

export const postRequest = path =>
  request.post(host + path).set('Access-Control-Allow-Origin', '*')
