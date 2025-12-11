import axios from 'axios'
import { debug } from '@/lib/logger'

// this code is used to debug axios requests
axios.interceptors.request.use((request) => {
  debug('Starting Request', JSON.stringify(request, null, 2))
  return request
})
axios.interceptors.response.use((response) => {
  // debug('Response:', JSON.stringify(response, null, 2))
  return response
})

export default class ApiRequest {
  constructor (config) {
    this.config = config
  }

  static get (url, config) {
    debug(`get API Request called: ${url}`, 'api-request')
    return axios.get(url, config)
  }

  static post (url, data, config) {
    debug(`post API Request called: ${url}`, 'api-request')
    return axios.post(url, data, config)
  }

  static delete (url, config) {
    debug(`delete API Request called: ${url}`, 'api-request')
    return axios.delete(url, config)
  }

  static put (url, data, config) {
    debug(`put API Request called: ${url}`, 'api-request')
    return axios.put(url, data, config)
  }

  static request (config) {
    debug(`request API called: ${config.url}`, 'api-request')
    return axios.request(config)
  }

  static head (url, config) {
    debug(`head request API called: ${url}`, 'api-request')
    return axios.head(url, config)
  }

  static options (url, config) {
    debug(`options request API called: ${url}`, 'api-request')
    return axios.options(url, config)
  }

  static patch (url, data, config) {
    debug(`patch request API called: ${url}`, 'api-request')
    return axios.patch(url, data, config)
  }
}
